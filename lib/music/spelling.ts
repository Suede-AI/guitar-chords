// Letter-based note spelling. Pitch classes alone cannot tell G minor's
// Bb from A#, so chord and scale reference pages spell each tone from the
// root letter and the tone's degree instead of from a fixed sharp list.

import { FLAT_NOTE_NAMES, NOTE_NAMES, normalizePitchClass } from "./scales";

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"] as const;
const LETTER_PCS = [0, 2, 4, 5, 7, 9, 11] as const;

/** Semitones above the root for degrees 1 to 7 of the major scale. */
export const MAJOR_DEGREE_SEMITONES = [0, 2, 4, 5, 7, 9, 11] as const;

function accidental(offset: number): string {
  if (offset === 0) return "";
  return offset > 0 ? "#".repeat(offset) : "b".repeat(-offset);
}

/** Pitch class of a spelled note such as "C", "F#" or "Bb". */
export function pitchClassOfName(name: string): number {
  const letterIndex = LETTERS.indexOf(name[0] as (typeof LETTERS)[number]);
  if (letterIndex < 0) throw new Error(`Unknown note name: ${name}`);
  let pc: number = LETTER_PCS[letterIndex];
  for (const ch of name.slice(1)) {
    if (ch === "#") pc += 1;
    else if (ch === "b") pc -= 1;
    else throw new Error(`Unknown accidental in note name: ${name}`);
  }
  return normalizePitchClass(pc);
}

/**
 * Spell the note `semitones` above `rootName` as scale degree `degree`
 * (1 = root, 3 = third, 7 = seventh), e.g. spellDegree("G", 3, 3) is "Bb".
 */
export function spellDegree(rootName: string, degree: number, semitones: number): string {
  const rootLetter = LETTERS.indexOf(rootName[0] as (typeof LETTERS)[number]);
  if (rootLetter < 0) throw new Error(`Unknown note name: ${rootName}`);
  const letterIndex = (rootLetter + degree - 1) % 7;
  const target = normalizePitchClass(pitchClassOfName(rootName) + semitones);
  let offset = normalizePitchClass(target - LETTER_PCS[letterIndex]);
  if (offset > 6) offset -= 12;
  return `${LETTERS[letterIndex]}${accidental(offset)}`;
}

/** Degree label relative to the major scale, e.g. (3, 3) is "b3", (4, 6) is "#4". */
export function degreeLabel(degree: number, semitones: number): string {
  let offset = semitones - MAJOR_DEGREE_SEMITONES[degree - 1];
  if (offset > 6) offset -= 12;
  if (offset < -6) offset += 12;
  return `${accidental(offset)}${degree}`;
}

/** Sharp and flat names for a pitch class (identical for naturals). */
export function rootNameCandidates(pc: number): string[] {
  const sharp = NOTE_NAMES[normalizePitchClass(pc)];
  const flat = FLAT_NOTE_NAMES[normalizePitchClass(pc)];
  return sharp === flat ? [sharp] : [sharp, flat];
}

/** Count of accidentals in a list of spelled notes, double accidentals weighted heavily. */
export function accidentalCost(notes: readonly string[]): number {
  return notes.reduce((sum, note) => {
    const marks = note.length - 1;
    return sum + (marks > 1 ? 10 * marks : marks);
  }, 0);
}
