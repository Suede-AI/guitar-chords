// Data for the per-scale reference pages under /scales/[scale].
//
// One page per entry in SCALES. Formula, step pattern, the notes in each of
// the 12 keys and the related scales are all computed from the interval lists
// in scales.ts, so a page can only describe what the scale trainer already
// plays.

import { SCALES, SCALE_ORDER, normalizePitchClass } from "./scales";
import {
  accidentalCost,
  degreeLabel,
  rootNameCandidates,
  spellDegree,
} from "./spelling";

export type ScaleId = keyof typeof SCALES;

/** Degree for each semitone when a scale skips letters (pentatonics, blues). */
const GAPPED_DEGREE: Record<number, number> = {
  0: 1, 1: 2, 2: 2, 3: 3, 4: 3, 5: 4, 6: 5, 7: 5, 8: 6, 9: 6, 10: 7, 11: 7,
};

export function scaleDegrees(id: ScaleId): number[] {
  const { intervals } = SCALES[id];
  if (intervals.length === 7) return intervals.map((_, i) => i + 1);
  return intervals.map((iv) => GAPPED_DEGREE[iv]);
}

export function scaleSlug(id: ScaleId): string {
  return SCALES[id].name.toLowerCase().replace(/\s+/g, "-");
}

export function scalePath(id: ScaleId): string {
  return `/scales/${scaleSlug(id)}`;
}

export const SCALE_SLUGS: readonly string[] = SCALE_ORDER.map(scaleSlug);

export function scaleIdForSlug(slug: string): ScaleId | undefined {
  return SCALE_ORDER.find((id) => scaleSlug(id) === slug);
}

/** Formula relative to the major scale, e.g. "1 2 b3 4 5 b6 b7". */
export function scaleFormula(id: ScaleId): string[] {
  const degrees = scaleDegrees(id);
  return SCALES[id].intervals.map((iv, i) => degreeLabel(degrees[i], iv));
}

const STEP_NAMES: Record<number, string> = { 1: "H", 2: "W", 3: "W+H" };

/** Whole and half steps between neighbouring notes, closing on the octave. */
export function scaleSteps(id: ScaleId): string[] {
  const { intervals } = SCALES[id];
  return intervals.map((iv, i) => {
    const next = i + 1 < intervals.length ? intervals[i + 1] : 12;
    return STEP_NAMES[next - iv] ?? `${next - iv} semitones`;
  });
}

export function spellScale(rootName: string, id: ScaleId): string[] {
  const degrees = scaleDegrees(id);
  return SCALES[id].intervals.map((iv, i) => spellDegree(rootName, degrees[i], iv));
}

/** Pick the sharp or flat root name that spells the scale with fewer accidentals. */
export function preferredRootName(pc: number, id: ScaleId): string {
  const candidates = rootNameCandidates(pc);
  let best = candidates[0];
  let bestCost = accidentalCost(spellScale(best, id));
  for (const name of candidates.slice(1)) {
    const cost = accidentalCost(spellScale(name, id));
    if (cost < bestCost) {
      best = name;
      bestCost = cost;
    }
  }
  return best;
}

export interface ScaleKeyRow {
  root: string;
  notes: string[];
  /** Fret of the root on the 6th string (0 = open). */
  lowEFret: number;
  /** Fret of the root on the 5th string (0 = open). */
  aFret: number;
}

/** The scale in all 12 keys, starting from C. */
export function scaleInAllKeys(id: ScaleId): ScaleKeyRow[] {
  return Array.from({ length: 12 }, (_, pc) => {
    const root = preferredRootName(pc, id);
    return {
      root,
      notes: spellScale(root, id),
      lowEFret: normalizePitchClass(pc - 4),
      aFret: normalizePitchClass(pc - 9),
    };
  });
}

// Related scales ---------------------------------------------------------------

export interface ScaleRelation {
  id: ScaleId;
  path: string;
  name: string;
  reasons: string[];
}

/**
 * Scale name for use mid-sentence: "natural minor", "major pentatonic", but
 * "Dorian" and the other mode names keep their capital.
 */
export function inlineScaleName(id: ScaleId): string {
  const { name } = SCALES[id];
  return /^(Major|Minor|Natural|Harmonic|Melodic|Blues)\b/.test(name)
    ? name[0].toLowerCase() + name.slice(1)
    : name;
}

function sameSet(a: readonly number[], b: readonly number[]): boolean {
  return a.length === b.length && !a.some((x, i) => x !== b[i]);
}

/** True when each value is in the set. */
export function containsAll(set: ReadonlySet<number>, values: Iterable<number>): boolean {
  for (const value of values) if (!set.has(value)) return false;
  return true;
}

/** Example root used for the worked relations and the fretboard: A, as in the trainer. */
export const EXAMPLE_ROOT = "A";
const EXAMPLE_ROOT_PC = 9;

export function relatedScales(id: ScaleId): ScaleRelation[] {
  const self = SCALES[id];
  const selfSet = new Set(self.intervals);
  const selfFormula = scaleFormula(id);
  const selfInline = inlineScaleName(id);
  const out: ScaleRelation[] = [];

  for (const otherId of SCALE_ORDER) {
    if (otherId === id) continue;
    const other = SCALES[otherId];
    const otherSet = new Set(other.intervals);
    const otherFormula = scaleFormula(otherId);
    const otherInline = inlineScaleName(otherId);
    const reasons: string[] = [];

    // Same notes from a different starting degree (modes of one parent).
    if (other.intervals.length === self.intervals.length) {
      for (const offset of other.intervals) {
        if (offset === 0) continue;
        const rotated = other.intervals
          .map((iv) => normalizePitchClass(iv - offset))
          .sort((a, b) => a - b);
        if (sameSet(rotated, self.intervals)) {
          const otherRootPc = normalizePitchClass(EXAMPLE_ROOT_PC - offset);
          const otherRoot = preferredRootName(otherRootPc, otherId);
          reasons.push(
            `Same notes, different home note: ${EXAMPLE_ROOT} ${selfInline} uses the notes of ${otherRoot} ${otherInline}.`,
          );
          break;
        }
      }

      // One note apart.
      const onlySelf = self.intervals.filter((iv) => !otherSet.has(iv));
      const onlyOther = other.intervals.filter((iv) => !selfSet.has(iv));
      if (onlySelf.length === 1 && onlyOther.length === 1) {
        const selfLabel = selfFormula[self.intervals.indexOf(onlySelf[0])];
        const otherLabel = otherFormula[other.intervals.indexOf(onlyOther[0])];
        reasons.push(`One note apart: ${other.name} has ${otherLabel} where ${selfInline} has ${selfLabel}.`);
      }
    }

    // Contained in, or contains.
    if (other.intervals.length < self.intervals.length && containsAll(selfSet, other.intervals)) {
      const extra = self.intervals
        .filter((iv) => !otherSet.has(iv))
        .map((iv) => selfFormula[self.intervals.indexOf(iv)]);
      reasons.push(`${other.name} sits inside ${selfInline}, which adds ${extra.join(" and ")}.`);
    }
    if (other.intervals.length > self.intervals.length && containsAll(otherSet, self.intervals)) {
      const extra = other.intervals
        .filter((iv) => !selfSet.has(iv))
        .map((iv) => otherFormula[other.intervals.indexOf(iv)]);
      reasons.push(`${self.name} sits inside ${otherInline}, which adds ${extra.join(" and ")}.`);
    }

    if (reasons.length > 0) {
      out.push({ id: otherId, path: scalePath(otherId), name: other.name, reasons });
    }
  }
  return out;
}
