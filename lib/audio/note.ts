// Hz → musical note math. Ported from Strumly.

export interface NoteReading {
  /** Note name without octave, e.g. "A", "C#". */
  name: string;
  /** Note name with octave, e.g. "A4". */
  fullName: string;
  /** Octave number, A4 = 4. */
  octave: number;
  /** Cents off from the nearest semitone, signed (+sharp / -flat). */
  cents: number;
  /** The detected frequency. */
  hz: number;
  /** The reference frequency of the nearest semitone. */
  refHz: number;
}

const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// MIDI 69 = A4 = 440 Hz.
const A4_MIDI = 69;
const A4_HZ = 440;

export function hzToNote(hz: number): NoteReading {
  const midiFloat = A4_MIDI + 12 * Math.log2(hz / A4_HZ);
  const midi = Math.round(midiFloat);
  const cents = Math.round((midiFloat - midi) * 100);
  const refHz = A4_HZ * Math.pow(2, (midi - A4_MIDI) / 12);
  const name = NAMES[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  return { name, fullName: `${name}${octave}`, octave, cents, hz, refHz };
}

/** Standard tuning, lowest to highest. */
export const STANDARD_TUNING: ReadonlyArray<{ name: string; hz: number; midi: number }> = [
  { name: "E2", hz: 82.41, midi: 40 },
  { name: "A2", hz: 110.0, midi: 45 },
  { name: "D3", hz: 146.83, midi: 50 },
  { name: "G3", hz: 196.0, midi: 55 },
  { name: "B3", hz: 246.94, midi: 59 },
  { name: "E4", hz: 329.63, midi: 64 },
] as const;
