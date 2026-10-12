import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { importTs } from "./support/load-ts.mjs";

const repoRoot = new URL("../", import.meta.url);

// The 2026-10-12 estate audit found 53 of 56 titles over 70 characters: the
// chord and scale templates appended a long intent phrase and the layout
// template then appended " | guitarchords.info" on top. Titles now lead with
// the chord or scale name, carry the brand only when it fits, and render as
// absolute titles so the template cannot lengthen them again.

const seo = await importTs("lib/seo.ts");
const chords = await importTs("lib/chords/pages.ts");
const { SCALES, SCALE_ORDER } = await importTs("lib/music/scales.ts");

test("pageTitle keeps the brand only when the title fits", () => {
  assert.equal(seo.pageTitle("Short"), "Short | guitarchords.info");
  const long = "x".repeat(60);
  assert.equal(seo.pageTitle(long), long);
  assert.equal(seo.titleCase("F# minor"), "F# Minor");
  assert.equal(seo.titleCase("major pentatonic"), "Major Pentatonic");
});

test("chord and scale titles are unique, name-first and within 65 characters", () => {
  const titles = [
    ...chords.CHORD_NAMES.map((name) => {
      const display = chords.chordPageData(name).displayName;
      return [display, seo.pageTitle(`${seo.titleCase(display)} Guitar Chord: Chart, Notes & Formula`)];
    }),
    ...SCALE_ORDER.map((id) => [
      SCALES[id].name,
      seo.pageTitle(`${seo.titleCase(SCALES[id].name)} Scale on Guitar: Notes, Formula & Positions`),
    ]),
  ];
  for (const [name, title] of titles) {
    assert.ok(title.length <= seo.TITLE_MAX, `${title} is ${title.length} characters`);
    assert.ok(title.toLowerCase().startsWith(name.toLowerCase()), `${title} does not lead with ${name}`);
  }
  assert.equal(new Set(titles.map(([, t]) => t)).size, titles.length, "titles must be unique");
});

test("the page templates use the shared title helper as an absolute title", async () => {
  for (const file of ["app/chords/[chord]/page.tsx", "app/scales/[scale]/page.tsx"]) {
    const source = await readFile(new URL(file, repoRoot), "utf8");
    assert.match(source, /pageTitle\(/, file);
    assert.match(source, /title: \{ absolute: title \}/, file);
  }
  for (const file of ["app/page.tsx", "app/chords/page.tsx", "app/scales/page.tsx", "app/tuner/page.tsx", "app/metronome/page.tsx"]) {
    const source = await readFile(new URL(file, repoRoot), "utf8");
    assert.match(source, /title: \{ absolute: TITLE \}/, file);
    assert.match(source, /webPageJsonLd\(/, file);
  }
});

test("llms.txt points at llms-full.txt, which is built from the page data", async () => {
  const llms = await readFile(new URL("public/llms.txt", repoRoot), "utf8");
  assert.match(llms, /^# /);
  assert.match(llms, /https:\/\/guitarchords\.info\/llms-full\.txt/);
  const route = await readFile(new URL("app/llms-full.txt/route.ts", repoRoot), "utf8");
  assert.match(route, /from "@\/lib\/chords\/pages"/);
  assert.match(route, /from "@\/lib\/music\/scale-pages"/);
  assert.match(route, /from "@\/lib\/tool-guides"/);
});

test("the IndexNow key file holds only the key", async () => {
  const key = "4c265a375effa42521f5b88bb3c28501";
  const body = await readFile(new URL(`public/${key}.txt`, repoRoot), "utf8");
  assert.equal(body.trim(), key);
});
