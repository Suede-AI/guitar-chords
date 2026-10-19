import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { importTs } from "./support/load-ts.mjs";

const repoRoot = new URL("../", import.meta.url);
const read = (file) => readFile(new URL(file, repoRoot), "utf8");

// Fixes from the 2026-10-18 estate SEO audit of guitarchords.info.

const chords = await importTs("lib/chords/pages.ts");
const { FINGERINGS } = await importTs("lib/chords/fingerings.ts");

test("chord changes are read off the frets: C to Am keeps two fretted notes", () => {
  const am = chords.smoothestChanges("C", 10).find((c) => c.name === "Am");
  assert.ok(am, "Am is among the changes from C");
  assert.deepEqual(
    am.held.map((h) => `${h.string}@${h.fret}`),
    ["4th (D)@2", "2nd (B)@1"],
  );
  assert.equal(am.added, 1);
});

test("every chord page has at least one change, each keeping a real shared fret", () => {
  for (const name of chords.CHORD_NAMES) {
    const changes = chords.smoothestChanges(name);
    assert.ok(changes.length > 0, `${name} has no listed change`);
    for (const c of changes) {
      assert.notEqual(c.name, name);
      for (const h of c.held) {
        const i = chords.STRING_NAMES.indexOf(h.string);
        assert.equal(FINGERINGS[name].frets[i], h.fret, `${name} frets ${h.string} at ${h.fret}`);
        assert.equal(FINGERINGS[c.name].frets[i], h.fret, `${c.name} frets ${h.string} at ${h.fret}`);
      }
    }
  }
});

test("shape facts count strings and frets", () => {
  assert.deepEqual(chords.shapeFacts(FINGERINGS.C), {
    sounded: 5, open: 2, muted: 1, fretted: 3, span: { low: 1, high: 3 },
  });
  assert.equal(chords.shapeFacts(FINGERINGS.Em7).fretted, 1);
});

test("the chord template renders the changes section", async () => {
  const source = await read("app/chords/[chord]/page.tsx");
  assert.match(source, /smoothestChanges\(name\)/);
  assert.match(source, /Changing chords from \{data\.name\}/);
});

test("the 404 page clears the layout's index robots and home canonical", async () => {
  const source = await read("app/not-found.tsx");
  assert.match(source, /robots: null/);
  assert.match(source, /canonical: null/);
  assert.doesNotMatch(source, /url:/, "openGraph must not claim a URL for a missing page");
});

test("The Signal Chain is described with the listing's 66 chapters and 111 workshops", async () => {
  const home = await read("app/page.tsx");
  assert.doesNotMatch(home, /46 chapters|Forty-six/i);
  assert.match(home, /66 chapters/);
  assert.match(home, /111/);
});

test("llms.txt describes the sister guitar sites the way they describe themselves", async () => {
  const llms = await read("public/llms.txt");
  assert.doesNotMatch(llms, /editorial and rights|amp history/);
  assert.match(llms, /GuitarHub, guitar lessons and practice tools: https:\/\/guitarhub\.org/);
  assert.match(llms, /The Signal Chain.*https:\/\/guitar\.solutions/);
});
