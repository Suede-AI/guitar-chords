import { NOTE_NAMES, type Note } from "./scales";

/** Open-string pitch classes for standard tuning, low-E (string 0) → high-E (5). */
export const STANDARD_TUNING_PCS = [4, 9, 2, 7, 11, 4] as const; // E, A, D, G, B, E

/** Returns the pitch class (0–11) of (stringIndex, fret). */
export function pitchClassAt(stringIndex: number, fret: number): number {
  return ((STANDARD_TUNING_PCS[stringIndex] + fret) % 12 + 12) % 12;
}

/** Returns the note name at (stringIndex, fret). */
export function noteAt(stringIndex: number, fret: number): Note {
  return NOTE_NAMES[pitchClassAt(stringIndex, fret)];
}
