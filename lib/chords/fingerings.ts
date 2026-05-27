// Strings: low E (6) → high E (1). null/0 = open, "x" = mute, number = fret.
// Ported from Strumly's free-tier chord library. Standard tuning (EADGBE).
export type Fret = number | "x" | null;

export type ChordCategory =
  | "major"
  | "minor"
  | "seventh"
  | "major-seventh"
  | "minor-seventh"
  | "sus"
  | "power"
  | "barre";

export interface Fingering {
  /** Six entries, low-E → high-E. */
  frets: Fret[];
  /** Optional finger numbers for each string (1–4, 0 if open, null if muted). */
  fingers?: (number | 0 | null)[];
  /** Category tag for filtering. */
  category: ChordCategory;
}

export const FINGERINGS: Record<string, Fingering> = {
  // ── Open major ──────────────────────────────────────────────────────────
  C:  { frets: ["x", 3, 2, 0, 1, 0], category: "major" },
  D:  { frets: ["x", "x", 0, 2, 3, 2], category: "major" },
  E:  { frets: [0, 2, 2, 1, 0, 0], category: "major" },
  G:  { frets: [3, 2, 0, 0, 0, 3], category: "major" },
  A:  { frets: ["x", 0, 2, 2, 2, 0], category: "major" },

  // ── Open minor ──────────────────────────────────────────────────────────
  Am: { frets: ["x", 0, 2, 2, 1, 0], category: "minor" },
  Em: { frets: [0, 2, 2, 0, 0, 0], category: "minor" },
  Dm: { frets: ["x", "x", 0, 2, 3, 1], category: "minor" },

  // ── Open dominant 7th ───────────────────────────────────────────────────
  C7: { frets: ["x", 3, 2, 3, 1, 0], category: "seventh" },
  D7: { frets: ["x", "x", 0, 2, 1, 2], category: "seventh" },
  E7: { frets: [0, 2, 0, 1, 0, 0], category: "seventh" },
  G7: { frets: [3, 2, 0, 0, 0, 1], category: "seventh" },
  A7: { frets: ["x", 0, 2, 0, 2, 0], category: "seventh" },
  B7: { frets: ["x", 2, 1, 2, 0, 2], category: "seventh" },

  // ── Major 7th ───────────────────────────────────────────────────────────
  Cmaj7: { frets: ["x", 3, 2, 0, 0, 0], category: "major-seventh" },
  Dmaj7: { frets: ["x", "x", 0, 2, 2, 2], category: "major-seventh" },
  Emaj7: { frets: [0, 2, 1, 1, 0, 0], category: "major-seventh" },
  Fmaj7: { frets: ["x", "x", 3, 2, 1, 0], category: "major-seventh" },
  Gmaj7: { frets: [3, 2, 0, 0, 0, 2], category: "major-seventh" },
  Amaj7: { frets: ["x", 0, 2, 1, 2, 0], category: "major-seventh" },

  // ── Minor 7th ───────────────────────────────────────────────────────────
  Am7: { frets: ["x", 0, 2, 0, 1, 0], category: "minor-seventh" },
  Em7: { frets: [0, 2, 0, 0, 0, 0], category: "minor-seventh" },
  Dm7: { frets: ["x", "x", 0, 2, 1, 1], category: "minor-seventh" },
  Bm7: { frets: ["x", 2, 4, 2, 3, 2], category: "minor-seventh" },

  // ── Suspended ──────────────────────────────────────────────────────────
  Dsus2: { frets: ["x", "x", 0, 2, 3, 0], category: "sus" },
  Dsus4: { frets: ["x", "x", 0, 2, 3, 3], category: "sus" },
  Asus2: { frets: ["x", 0, 2, 2, 0, 0], category: "sus" },
  Asus4: { frets: ["x", 0, 2, 2, 3, 0], category: "sus" },
  Esus4: { frets: [0, 2, 2, 2, 0, 0], category: "sus" },

  // ── Power chords (root-fifth) ───────────────────────────────────────────
  E5: { frets: [0, 2, 2, "x", "x", "x"], category: "power" },
  A5: { frets: ["x", 0, 2, 2, "x", "x"], category: "power" },
  D5: { frets: ["x", "x", 0, 2, 3, "x"], category: "power" },
  G5: { frets: [3, 5, 5, "x", "x", "x"], category: "power" },

  // ── Common barre chords ─────────────────────────────────────────────────
  F:    { frets: [1, 3, 3, 2, 1, 1], category: "barre" },
  Bm:   { frets: ["x", 2, 4, 4, 3, 2], category: "barre" },
  B:    { frets: ["x", 2, 4, 4, 4, 2], category: "barre" },
  "F#m": { frets: [2, 4, 4, 2, 2, 2], category: "barre" },
  "C#m": { frets: ["x", 4, 6, 6, 5, 4], category: "barre" },
  Gm:   { frets: [3, 5, 5, 3, 3, 3], category: "barre" },
};

export const CATEGORY_LABELS: Record<ChordCategory, string> = {
  major: "Major",
  minor: "Minor",
  seventh: "7th",
  "major-seventh": "Maj7",
  "minor-seventh": "Min7",
  sus: "Sus",
  power: "Power",
  barre: "Barre",
};

export const CATEGORY_ORDER: ChordCategory[] = [
  "major",
  "minor",
  "seventh",
  "major-seventh",
  "minor-seventh",
  "sus",
  "power",
  "barre",
];
