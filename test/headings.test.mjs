import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const repoRoot = new URL("../", import.meta.url);

// Each indexable page renders exactly one h1, and that h1 names the page's topic
// in the words people search with. Before 2026-10-30 the scales, tuner and
// metronome heroes were slogans ("A root. A mode. The whole neck.", "Find your
// pitch.", "Locked in.") and the chord template read "<chord> guitar chord".

const H1_SOURCES = {
  "app/page.tsx": /Guitar Chords, Scales,/,
  "app/chords/ChordLibrary.tsx": /Guitar Chord Chart/,
  "app/chords/[chord]/page.tsx": /How to play the \{data\.displayName\} chord on guitar/,
  "app/scales/ScaleTrainer.tsx": /Guitar scales chart:/,
  "app/scales/[scale]/page.tsx": /\{def\.name\} scale on guitar/,
  "app/tuner/Tuner.tsx": /Free online\{" "\}[\s\S]*guitar tuner/,
  "app/metronome/Metronome.tsx": /Free online metronome\{" "\}[\s\S]*with tap tempo/,
};

function h1Blocks(source) {
  return [...source.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)].map((m) => m[0]);
}

test("each page template renders one h1 that names its topic", async () => {
  for (const [file, pattern] of Object.entries(H1_SOURCES)) {
    const source = await readFile(new URL(file, repoRoot), "utf8");
    const blocks = h1Blocks(source);
    assert.equal(blocks.length, 1, `${file} renders ${blocks.length} h1 elements`);
    assert.match(blocks[0], pattern, `${file} h1 does not name its topic`);
  }
});

test("retired slogan headings stay retired", async () => {
  for (const file of Object.keys(H1_SOURCES)) {
    const [h1] = h1Blocks(await readFile(new URL(file, repoRoot), "utf8"));
    assert.doesNotMatch(h1, /A root\.|Find your pitch|Locked in/, file);
  }
});
