import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const repoRoot = new URL("../", import.meta.url);

// Estate copy voice bans the em dash and bans absolute words in shipped copy.
// The audit found 11 em dashes and 3 absolutes live across the five pages: page
// titles and og/twitter metadata, the sitewide footer line, the scale-trainer and
// metronome and chord-library leads, the author byline, and the manifesto item.
//
// Scanned on SOURCE rather than on rendered HTML because there is no build step in
// this test run, and every one of those strings is a literal in these files. The
// tradeoff is that comments are scanned too, so comments are held to the same
// punctuation rule (they cost nothing to keep clean) while the absolute-word rule
// strips them first: a comment saying "renders on every route" describes the code,
// it is not copy a reader sees.

const SOURCE_DIRS = ["app", "components", "lib"];
const SOURCE_EXT = /\.(tsx?|css)$/;
const SERVED_PUBLIC = ["public/llms.txt", "public/tuner-audio-processor.js"];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(new URL(`${dir}/`, repoRoot), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) out.push(...(await walk(rel)));
    else if (SOURCE_EXT.test(entry.name)) out.push(rel);
  }
  return out;
}

async function read(files) {
  return Promise.all(
    files.map(async (file) => [file, await readFile(new URL(file, repoRoot), "utf8")]),
  );
}

async function pageCopy() {
  const files = [];
  for (const dir of SOURCE_DIRS) files.push(...(await walk(dir)));
  return read(files);
}

async function shippedFiles() {
  return [...(await pageCopy()), ...(await read(SERVED_PUBLIC))];
}

// The tuner's read-out shows an em dash as the "no pitch yet" glyph. That is a data
// placeholder in the same class as "N/A", not prose, and it renders only after the
// listener starts, so it never reaches the served HTML. Allowed by exact shape so a
// real em dash in tuner copy still fails.
const PLACEHOLDER_GLYPHS = [`?? "—"`, `: "—"`];

test("shipped copy uses no em dash", async () => {
  for (const [file, contents] of await shippedFiles()) {
    let scanned = contents;
    for (const glyph of PLACEHOLDER_GLYPHS) scanned = scanned.split(glyph).join("");
    const hits = scanned.split("\n").filter((line) => line.includes("—"));
    assert.deepEqual(hits, [], `${file} still uses an em dash`);
  }
});

// Strip comments before the absolute-word sweep: JSX blocks, block comments, then
// whole-line `//`. Anchored to the start of the line so a URL's `//` survives.
function stripComments(source) {
  return source
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");
}

// "all" is deliberately NOT banned. "all 12 keys" and "all 7 modes" are bounded by
// their own count, and "All" is the chord-filter control label.
const ABSOLUTES = /\b(every|nothing|never)\b/i;

// Scoped to the page copy, not to public/llms.txt. That file still reads "Fingering
// diagrams for every chord across all keys and voicings" on line 11. De-quantifying
// it would change what the catalogue claims to cover, which is a content call rather
// than the punctuation-and-wording sweep this guard exists for. Named here so the
// remaining hit stays visible instead of hiding behind an exclusion list.
test("page copy uses no unbounded absolute", async () => {
  for (const [file, contents] of await pageCopy()) {
    for (const line of stripComments(contents).split("\n")) {
      assert.doesNotMatch(line, ABSOLUTES, `${file} uses an absolute: ${line.trim()}`);
    }
  }
});
