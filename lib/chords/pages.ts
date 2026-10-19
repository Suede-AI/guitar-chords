// Data for the per-chord reference pages under /chords/[chord].
//
// Built only from FINGERINGS: one page per entry, tones read off the frets in
// standard tuning, and related chords picked from the same library with plain
// theory (same root, relative major or minor, chords of the home key). No
// shape, tone or link here exists outside that data.

import { FINGERINGS, CATEGORY_LABELS, type Fingering } from "./fingerings";
import { pitchClassAt } from "../music/fretboard";
import { SCALES } from "../music/scales";
import { pitchClassOfName, spellDegree } from "../music/spelling";

export type ChordQuality =
  | "major"
  | "minor"
  | "dominant-seventh"
  | "major-seventh"
  | "minor-seventh"
  | "sus2"
  | "sus4"
  | "power";

interface QualityDef {
  suffix: string;
  longName: string;
  intervals: readonly number[];
  degrees: readonly number[];
}

export const QUALITIES: Record<ChordQuality, QualityDef> = {
  major: { suffix: "", longName: "major", intervals: [0, 4, 7], degrees: [1, 3, 5] },
  minor: { suffix: "m", longName: "minor", intervals: [0, 3, 7], degrees: [1, 3, 5] },
  "dominant-seventh": { suffix: "7", longName: "dominant seventh", intervals: [0, 4, 7, 10], degrees: [1, 3, 5, 7] },
  "major-seventh": { suffix: "maj7", longName: "major seventh", intervals: [0, 4, 7, 11], degrees: [1, 3, 5, 7] },
  "minor-seventh": { suffix: "m7", longName: "minor seventh", intervals: [0, 3, 7, 10], degrees: [1, 3, 5, 7] },
  sus2: { suffix: "sus2", longName: "suspended second", intervals: [0, 2, 7], degrees: [1, 2, 5] },
  sus4: { suffix: "sus4", longName: "suspended fourth", intervals: [0, 5, 7], degrees: [1, 4, 5] },
  power: { suffix: "5", longName: "power chord", intervals: [0, 7], degrees: [1, 5] },
};

const SUFFIX_TO_QUALITY: Record<string, ChordQuality> = Object.fromEntries(
  (Object.keys(QUALITIES) as ChordQuality[]).map((q) => [QUALITIES[q].suffix, q]),
);

const INTERVAL_NAMES: Record<number, string> = {
  0: "Root",
  2: "Major 2nd",
  3: "Minor 3rd",
  4: "Major 3rd",
  5: "Perfect 4th",
  7: "Perfect 5th",
  10: "Minor 7th",
  11: "Major 7th",
};

const INTERVAL_SHORT: Record<number, string> = {
  0: "1",
  2: "2",
  3: "b3",
  4: "3",
  5: "4",
  7: "5",
  10: "b7",
  11: "7",
};

/** Guitar strings from 6th (low E) to 1st (high E). */
export const STRING_NAMES = [
  "6th (low E)",
  "5th (A)",
  "4th (D)",
  "3rd (G)",
  "2nd (B)",
  "1st (high E)",
] as const;

export interface ParsedChord {
  root: string;
  rootPc: number;
  quality: ChordQuality;
}

export function parseChordName(name: string): ParsedChord {
  const match = /^([A-G][#b]?)(maj7|m7|m|7|sus2|sus4|5)?$/.exec(name);
  if (!match) throw new Error(`Unrecognised chord name: ${name}`);
  const root = match[1];
  const quality = SUFFIX_TO_QUALITY[match[2] ?? ""];
  if (!quality) throw new Error(`Unrecognised chord suffix: ${name}`);
  return { root, rootPc: pitchClassOfName(root), quality };
}

function rootSlug(root: string): string {
  const letter = root[0].toLowerCase();
  const acc = root.slice(1);
  if (acc === "#") return `${letter}-sharp`;
  if (acc === "b") return `${letter}-flat`;
  return letter;
}

/** URL slug for a chord name: C is "c-major", Am is "a-minor", G7 is "g7", F#m is "f-sharp-minor". */
export function chordSlug(name: string): string {
  const { root, quality } = parseChordName(name);
  const base = rootSlug(root);
  if (quality === "major") return `${base}-major`;
  if (quality === "minor") return `${base}-minor`;
  const sep = root.length > 1 ? "-" : "";
  return `${base}${sep}${QUALITIES[quality].suffix}`;
}

export function chordPath(name: string): string {
  return `/chords/${chordSlug(name)}`;
}

/** "C major", "A minor", or the symbol itself for 7ths, sus and power chords. */
export function chordDisplayName(name: string): string {
  const { root, quality } = parseChordName(name);
  if (quality === "major") return `${root} major`;
  if (quality === "minor") return `${root} minor`;
  return name;
}

export function chordLongName(name: string): string {
  const { root, quality } = parseChordName(name);
  return `${root} ${QUALITIES[quality].longName}`;
}

export interface ChordTone {
  note: string;
  pc: number;
  semitones: number;
  short: string;
  intervalName: string;
  /** Whether this shape actually sounds the tone. */
  inShape: boolean;
}

export interface StringNote {
  string: string;
  fret: string;
  note: string | null;
}

export interface ChordPageData {
  name: string;
  slug: string;
  path: string;
  displayName: string;
  longName: string;
  root: string;
  quality: ChordQuality;
  fingering: Fingering;
  categoryLabel: string;
  /** Frets low E to high E, e.g. "x32010". */
  shape: string;
  tones: ChordTone[];
  strings: StringNote[];
  lowestNote: string;
  formula: string;
}

function fretLabel(f: Fingering["frets"][number]): string {
  if (f === "x") return "x";
  if (f === null || f === 0) return "0";
  return String(f);
}

/** Pitch classes that sound when the shape is strummed. */
export function soundingPitchClasses(fingering: Fingering): Set<number> {
  const pcs = new Set<number>();
  fingering.frets.forEach((f, i) => {
    if (f === "x") return;
    pcs.add(pitchClassAt(i, f ?? 0));
  });
  return pcs;
}

/** Pitch classes of the chord formula for a chord name. */
export function formulaPitchClasses(name: string): Set<number> {
  const { rootPc, quality } = parseChordName(name);
  return new Set(QUALITIES[quality].intervals.map((iv) => (rootPc + iv) % 12));
}

export function chordPageData(name: string): ChordPageData {
  const fingering = FINGERINGS[name];
  if (!fingering) throw new Error(`No fingering for ${name}`);
  const { root, rootPc, quality } = parseChordName(name);
  const def = QUALITIES[quality];
  const sounding = soundingPitchClasses(fingering);

  const tones: ChordTone[] = def.intervals.map((iv, idx) => ({
    note: spellDegree(root, def.degrees[idx], iv),
    pc: (rootPc + iv) % 12,
    semitones: iv,
    short: INTERVAL_SHORT[iv],
    intervalName: INTERVAL_NAMES[iv],
    inShape: sounding.has((rootPc + iv) % 12),
  }));
  const nameForPc = new Map(tones.map((t) => [t.pc, t.note]));

  const strings: StringNote[] = fingering.frets.map((f, i) => ({
    string: STRING_NAMES[i],
    fret: fretLabel(f),
    note: f === "x" ? null : nameForPc.get(pitchClassAt(i, f ?? 0)) ?? null,
  }));
  const lowest = strings.find((s) => s.note !== null);

  return {
    name,
    slug: chordSlug(name),
    path: chordPath(name),
    displayName: chordDisplayName(name),
    longName: chordLongName(name),
    root,
    quality,
    fingering,
    categoryLabel: CATEGORY_LABELS[fingering.category],
    shape: fingering.frets.map(fretLabel).join(""),
    tones,
    strings,
    lowestNote: lowest?.note ?? root,
    formula: tones.map((t) => t.short).join(" "),
  };
}

/** Library order: the same category order the chord chart uses. */
export const CHORD_NAMES: readonly string[] = Object.keys(FINGERINGS);

export const CHORD_SLUGS: readonly string[] = CHORD_NAMES.map(chordSlug);

export function chordNameForSlug(slug: string): string | undefined {
  return CHORD_NAMES.find((name) => chordSlug(name) === slug);
}

// Related chords --------------------------------------------------------------

export interface RelatedChord {
  name: string;
  path: string;
  label: string;
}

export interface HomeKey {
  name: string;
  scaleId: "major" | "minor";
  pcs: Set<number>;
  rootPc: number;
}

const KEY_QUALITIES: ReadonlySet<ChordQuality> = new Set([
  "major",
  "minor",
  "dominant-seventh",
  "major-seventh",
  "minor-seventh",
]);

/**
 * The key a chord most plainly belongs to: its own major key for major and
 * maj7 chords, its own natural minor key for minor and m7 chords, and the key a
 * fifth below for a dominant seventh (G7 is the V7 of C major). Sus and power
 * chords have no third, so they get no home key.
 */
export function homeKey(name: string): HomeKey | null {
  const { root, rootPc, quality } = parseChordName(name);
  let keyRoot = root;
  let scaleId: "major" | "minor";
  if (quality === "major" || quality === "major-seventh") scaleId = "major";
  else if (quality === "minor" || quality === "minor-seventh") scaleId = "minor";
  else if (quality === "dominant-seventh") {
    scaleId = "major";
    keyRoot = spellDegree(root, 4, 5);
  } else return null;
  const keyRootPc = quality === "dominant-seventh" ? (rootPc + 5) % 12 : rootPc;
  const pcs = new Set(SCALES[scaleId].intervals.map((iv) => (keyRootPc + iv) % 12));
  const label = scaleId === "major" ? "major" : "minor";
  return { name: `${keyRoot} ${label}`, scaleId, pcs, rootPc: keyRootPc };
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"] as const;
const ROMAN_SUFFIX: Partial<Record<ChordQuality, string>> = {
  "dominant-seventh": "7",
  "major-seventh": "maj7",
  "minor-seventh": "7",
};

function romanNumeral(name: string, key: HomeKey): string | null {
  const { rootPc, quality } = parseChordName(name);
  const degree = SCALES[key.scaleId].intervals.indexOf((rootPc - key.rootPc + 12) % 12);
  if (degree < 0) return null;
  const numeral = ROMAN[degree];
  const isMinor = quality === "minor" || quality === "minor-seventh";
  return `${isMinor ? numeral.toLowerCase() : numeral}${ROMAN_SUFFIX[quality] ?? ""}`;
}

function isSubset(a: Set<number>, b: Set<number>): boolean {
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

export interface RelatedChords {
  sameRoot: RelatedChord[];
  relative: RelatedChord | null;
  key: HomeKey | null;
  inKey: RelatedChord[];
}

export function relatedChords(name: string): RelatedChords {
  const { rootPc, quality } = parseChordName(name);
  const others = CHORD_NAMES.filter((n) => n !== name);

  const sameRoot = others
    .filter((n) => parseChordName(n).rootPc === rootPc)
    .map((n) => ({ name: n, path: chordPath(n), label: chordLongName(n) }));

  let relative: RelatedChord | null = null;
  if (quality === "major" || quality === "minor") {
    const targetQuality: ChordQuality = quality === "major" ? "minor" : "major";
    const targetPc = (rootPc + (quality === "major" ? 9 : 3)) % 12;
    const match = others.find((n) => {
      const p = parseChordName(n);
      return p.quality === targetQuality && p.rootPc === targetPc;
    });
    if (match) {
      relative = {
        name: match,
        path: chordPath(match),
        label: `Relative ${targetQuality} of ${chordDisplayName(name)}`,
      };
    }
  }

  const key = homeKey(name);
  const listed = new Set([...sameRoot.map((r) => r.name), ...(relative ? [relative.name] : [])]);
  const inKey: RelatedChord[] = [];
  if (key) {
    for (const n of others) {
      if (listed.has(n)) continue;
      if (!KEY_QUALITIES.has(parseChordName(n).quality)) continue;
      if (!isSubset(formulaPitchClasses(n), key.pcs)) continue;
      const numeral = romanNumeral(n, key);
      if (!numeral) continue;
      inKey.push({ name: n, path: chordPath(n), label: `${numeral} in ${key.name}` });
    }
    inKey.sort(
      (a, b) =>
        SCALES[key.scaleId].intervals.indexOf((parseChordName(a.name).rootPc - key.rootPc + 12) % 12) -
        SCALES[key.scaleId].intervals.indexOf((parseChordName(b.name).rootPc - key.rootPc + 12) % 12),
    );
  }

  return { sameRoot, relative, key, inKey };
}

// Shape facts and chord changes ------------------------------------------------
//
// Both are read off the frets alone, so every page gets guidance specific to
// its own shape without a sentence anyone had to write per chord. A "fretted
// note that stays in place" is the same fret on the same string in both
// shapes: the pivot players use for C to Am (4th string fret 2 and 2nd string
// fret 1 stay down) or G to Em.

export interface ShapeFacts {
  sounded: number;
  open: number;
  muted: number;
  fretted: number;
  /** Lowest and highest fretted positions, or null for an all-open shape. */
  span: { low: number; high: number } | null;
}

export function shapeFacts(fingering: Fingering): ShapeFacts {
  const frets = fingering.frets;
  const fretted = frets.filter((f): f is number => typeof f === "number" && f > 0);
  return {
    sounded: frets.filter((f) => f !== "x").length,
    open: frets.filter((f) => f === 0 || f === null).length,
    muted: frets.filter((f) => f === "x").length,
    fretted: fretted.length,
    span: fretted.length ? { low: Math.min(...fretted), high: Math.max(...fretted) } : null,
  };
}

export interface HeldNote {
  string: string;
  fret: number;
}

export interface ChordChange {
  name: string;
  path: string;
  /** Fretted notes both shapes share (same string, same fret). */
  held: HeldNote[];
  /** Fretted notes the destination shape adds. */
  added: number;
  /** Chord tones (pitch classes) the two shapes have in common. */
  commonTones: number;
}

/**
 * The library chords that are quickest to reach from `name`: the most fretted
 * notes left in place first, then the fewest new notes to fret, then the most
 * shared chord tones, then library order. Only changes that keep at least one
 * fretted note in place qualify.
 */
export function smoothestChanges(name: string, limit = 4): ChordChange[] {
  const from = FINGERINGS[name];
  if (!from) throw new Error(`No fingering for ${name}`);
  const fromPcs = soundingPitchClasses(from);
  const changes: (ChordChange & { order: number })[] = [];
  CHORD_NAMES.forEach((other, order) => {
    if (other === name) return;
    const to = FINGERINGS[other];
    const held: HeldNote[] = [];
    let toFretted = 0;
    to.frets.forEach((f, i) => {
      if (typeof f !== "number" || f <= 0) return;
      toFretted += 1;
      if (from.frets[i] === f) held.push({ string: STRING_NAMES[i], fret: f });
    });
    if (held.length === 0) return;
    let commonTones = 0;
    for (const pc of soundingPitchClasses(to)) if (fromPcs.has(pc)) commonTones += 1;
    changes.push({ name: other, path: chordPath(other), held, added: toFretted - held.length, commonTones, order });
  });
  changes.sort(
    (a, b) =>
      b.held.length - a.held.length ||
      a.added - b.added ||
      b.commonTones - a.commonTones ||
      a.order - b.order,
  );
  return changes.slice(0, limit).map(({ order: _order, ...c }) => c);
}
