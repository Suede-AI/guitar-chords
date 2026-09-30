// Per-route <meta name="keywords"> lists for guitarchords.info.
//
// In the Next App Router a child route's `keywords` replaces its parent's, so
// each list here is complete on its own. Terms describe what the page actually
// does. Brand terms are appended by keywordsFor() with a case-insensitive
// dedupe. The guard in test/keywords.test.mjs fails when a page skips this map.

export const BRAND_KEYWORDS: readonly string[] = ["guitarchords.info", "Suede AI"];

export const ROUTE_KEYWORDS = {
  "/": [
    "guitar chords",
    "guitar chord finder",
    "guitar chord chart",
    "guitar chords for beginners",
    "guitar fingering diagrams",
    "guitar scales",
    "online guitar tuner",
    "free metronome",
    "free guitar tools",
    "guitar reference",
  ],
  "/chords": [
    "guitar chords",
    "guitar chord finder",
    "guitar chord chart",
    "guitar chords for beginners",
    "open chords guitar",
    "barre chords",
    "power chords",
    "maj7 guitar chord",
    "sus chord guitar",
    "guitar chord library",
    "guitar chord diagrams",
    "guitar fingering diagrams",
  ],
  "/scales": [
    "guitar scales chart",
    "guitar modes",
    "pentatonic scale guitar",
    "blues scale guitar",
    "major scale guitar",
    "minor scale guitar",
    "guitar fretboard scale",
    "Ionian Dorian Phrygian guitar",
    "guitar scale trainer",
    "free guitar scales",
  ],
  "/tuner": [
    "online guitar tuner",
    "free guitar tuner",
    "chromatic guitar tuner",
    "browser guitar tuner",
    "guitar tuner no download",
    "tune guitar online",
    "guitar pitch detector",
    "YIN pitch detection",
    "web audio guitar tuner",
  ],
  "/metronome": [
    "online metronome",
    "free metronome",
    "tap tempo metronome",
    "BPM metronome",
    "guitar metronome",
    "metronome no download",
    "time signature metronome",
    "practice metronome",
    "web audio metronome",
  ],
} as const satisfies Record<string, readonly string[]>;

export type KeywordRoute = keyof typeof ROUTE_KEYWORDS;

export function keywordsFor(route: KeywordRoute): string[] {
  const seen = new Set<string>();
  return [...ROUTE_KEYWORDS[route], ...BRAND_KEYWORDS].filter((term) => {
    const key = term.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
