// Pitch classes: C=0, C#=1, D=2, D#=3, E=4, F=5, F#=6, G=7, G#=8, A=9, A#=10, B=11
// Ported from Strumly's music theory primitives.

export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;
export type Note = (typeof NOTE_NAMES)[number];

export const FLAT_NOTE_NAMES = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
] as const;

export type AccidentalPreference = "sharp" | "flat";

export function normalizePitchClass(pc: number): number {
  return ((pc % 12) + 12) % 12;
}

export function pitchClassToNoteName(
  pc: number,
  accidentalPreference: AccidentalPreference = "sharp",
): string {
  const names = accidentalPreference === "flat" ? FLAT_NOTE_NAMES : NOTE_NAMES;
  return names[normalizePitchClass(pc)];
}

/** A scale is its set of semitone offsets from the root, 0 = root. */
export interface ScaleDef {
  name: string;
  intervals: number[];
  description: string;
}

export const SCALES: Record<string, ScaleDef> = {
  major:           { name: "Major",            intervals: [0, 2, 4, 5, 7, 9, 11], description: "Bright, happy, the default for most pop and folk." },
  minor:           { name: "Natural minor",    intervals: [0, 2, 3, 5, 7, 8, 10], description: "Darker, melancholy. Sad ballads, minor-key rock." },
  pentatonicMajor: { name: "Major pentatonic", intervals: [0, 2, 4, 7, 9],        description: "Country, classic rock, melodic solos." },
  pentatonicMinor: { name: "Minor pentatonic", intervals: [0, 3, 5, 7, 10],       description: "Rock and blues default: most lead guitar lives here." },
  blues:           { name: "Blues",             intervals: [0, 3, 5, 6, 7, 10],   description: "Minor pentatonic + the b5 “blue note.”" },
  dorian:          { name: "Dorian",            intervals: [0, 2, 3, 5, 7, 9, 10], description: "Jazz, funk, jam-band staple. Minor with a raised 6th." },
  phrygian:        { name: "Phrygian",          intervals: [0, 1, 3, 5, 7, 8, 10], description: "Dark minor mode with a flat 2. Spanish and metal color." },
  lydian:          { name: "Lydian",            intervals: [0, 2, 4, 6, 7, 9, 11], description: "Major mode with a raised 4th. Floating, cinematic." },
  mixolydian:      { name: "Mixolydian",        intervals: [0, 2, 4, 5, 7, 9, 10], description: "Major with a flat 7. Classic rock and Celtic." },
  locrian:         { name: "Locrian",           intervals: [0, 1, 3, 5, 6, 8, 10], description: "Diminished mode with flat 2 and flat 5. Theory study." },
  harmonicMinor:   { name: "Harmonic minor",    intervals: [0, 2, 3, 5, 7, 8, 11], description: "Minor with a raised 7th. Strong dominant pull." },
  melodicMinor:    { name: "Melodic minor",     intervals: [0, 2, 3, 5, 7, 9, 11], description: "Minor with raised 6th and 7th. Jazz minor vocabulary." },
};

export const SCALE_ORDER: ReadonlyArray<keyof typeof SCALES> = [
  "major",
  "minor",
  "pentatonicMajor",
  "pentatonicMinor",
  "blues",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "locrian",
  "harmonicMinor",
  "melodicMinor",
];

/** Returns the pitch classes (0–11) that belong to a scale with the given root. */
export function buildScale(
  rootPc: number,
  scaleId: keyof typeof SCALES,
): Set<number> {
  const def = SCALES[scaleId];
  const pcs = def.intervals.map((iv) => (rootPc + iv) % 12);
  return new Set(pcs);
}

export function noteNameToPitchClass(name: Note): number {
  return NOTE_NAMES.indexOf(name);
}
