import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { importTs } from "./support/load-ts.mjs";

const repoRoot = new URL("../", import.meta.url);

// The per-chord and per-scale pages are generated from lib/chords/fingerings.ts
// and lib/music/scales.ts. These guards pin the theory the pages print, keep
// one page per data entry (and no more), and keep the hub pages and the
// sitemap linking each of them.

const chords = await importTs("lib/chords/pages.ts");
const scales = await importTs("lib/music/scale-pages.ts");
const { FINGERINGS } = await importTs("lib/chords/fingerings.ts");
const { SCALES } = await importTs("lib/music/scales.ts");
const sitemap = (await importTs("app/sitemap.ts")).default;

function tones(name) {
  return chords.chordPageData(name).tones.map((t) => t.note);
}

test("spot checks: chord tones are spelled from the root", () => {
  assert.deepEqual(tones("C"), ["C", "E", "G"]);
  assert.deepEqual(tones("Am"), ["A", "C", "E"]);
  assert.deepEqual(tones("G7"), ["G", "B", "D", "F"]);
  assert.deepEqual(tones("Gm"), ["G", "Bb", "D"]);
  assert.deepEqual(tones("F#m"), ["F#", "A", "C#"]);
  assert.deepEqual(tones("Emaj7"), ["E", "G#", "B", "D#"]);
  assert.equal(chords.chordPageData("G7").formula, "1 3 5 b7");
  assert.equal(chords.chordPageData("C").shape, "x32010");
});

test("each shape sounds only notes of its chord", () => {
  for (const [name, fingering] of Object.entries(FINGERINGS)) {
    const formula = chords.formulaPitchClasses(name);
    for (const pc of chords.soundingPitchClasses(fingering)) {
      assert.ok(formula.has(pc), `${name} sounds pitch class ${pc} outside its formula`);
    }
    // The root always sounds, so the page never describes a rootless shape.
    assert.ok(chords.chordPageData(name).tones[0].inShape, `${name} has no root`);
  }
});

test("related chords follow the theory", () => {
  const c = chords.relatedChords("C");
  assert.equal(c.relative?.name, "Am");
  assert.equal(c.key?.name, "C major");
  assert.deepEqual(
    c.inKey.filter((r) => ["Dm", "Em", "F", "G"].includes(r.name)).map((r) => r.label),
    ["ii in C major", "iii in C major", "IV in C major", "V in C major"],
  );
  // The relative minor gets its own entry instead of a second link in the key list.
  assert.ok(!c.inKey.some((r) => r.name === "Am"));
  assert.equal(chords.relatedChords("Am").relative?.name, "C");
  assert.equal(chords.relatedChords("G7").key?.name, "C major");
  for (const name of Object.keys(FINGERINGS)) {
    const related = chords.relatedChords(name);
    const linked = [...related.sameRoot, ...related.inKey, ...(related.relative ? [related.relative] : [])];
    for (const r of linked) assert.ok(FINGERINGS[r.name], `${name} links ${r.name}, which has no page`);
  }
});

test("scale formulas and spellings", () => {
  assert.deepEqual(scales.scaleFormula("minor"), ["1", "2", "b3", "4", "5", "b6", "b7"]);
  assert.deepEqual(scales.scaleFormula("lydian"), ["1", "2", "3", "#4", "5", "6", "7"]);
  assert.deepEqual(scales.scaleFormula("blues"), ["1", "b3", "4", "b5", "5", "b7"]);
  assert.deepEqual(scales.scaleSteps("major"), ["W", "W", "H", "W", "W", "W", "H"]);
  assert.deepEqual(scales.spellScale("C", "major"), ["C", "D", "E", "F", "G", "A", "B"]);
  assert.deepEqual(scales.spellScale("A", "minor"), ["A", "B", "C", "D", "E", "F", "G"]);
  const fMajor = scales.scaleInAllKeys("major").find((row) => row.root === "F");
  assert.deepEqual(fMajor.notes, ["F", "G", "A", "Bb", "C", "D", "E"]);
  const dorian = scales.relatedScales("dorian").find((r) => r.id === "major");
  assert.match(dorian.reasons[0], /A Dorian uses the notes of G major/);
});

test("one page per data entry, with unique slugs", () => {
  assert.equal(chords.CHORD_SLUGS.length, Object.keys(FINGERINGS).length);
  assert.equal(new Set(chords.CHORD_SLUGS).size, chords.CHORD_SLUGS.length);
  assert.equal(scales.SCALE_SLUGS.length, Object.keys(SCALES).length);
  assert.equal(new Set(scales.SCALE_SLUGS).size, scales.SCALE_SLUGS.length);
  for (const slug of chords.CHORD_SLUGS) assert.match(slug, /^[a-z0-9-]+$/);
  for (const slug of scales.SCALE_SLUGS) assert.match(slug, /^[a-z0-9-]+$/);
  assert.equal(chords.chordSlug("C"), "c-major");
  assert.equal(chords.chordSlug("Am"), "a-minor");
  assert.equal(chords.chordSlug("G7"), "g7");
  assert.equal(chords.chordSlug("F#m"), "f-sharp-minor");
});

test("the sitemap lists each generated page", () => {
  const urls = new Set(sitemap().map(({ url }) => url));
  for (const slug of chords.CHORD_SLUGS) assert.ok(urls.has(`https://guitarchords.info/chords/${slug}`), slug);
  for (const slug of scales.SCALE_SLUGS) assert.ok(urls.has(`https://guitarchords.info/scales/${slug}`), slug);
});

test("the hub pages link each generated page, and the pages are static", async () => {
  const library = await readFile(new URL("app/chords/ChordLibrary.tsx", repoRoot), "utf8");
  assert.match(library, /href=\{chordPath\(name\)\}/);
  const scalesHub = await readFile(new URL("app/scales/page.tsx", repoRoot), "utf8");
  assert.match(scalesHub, /SCALE_ORDER\.map\([\s\S]*href=\{scalePath\(id\)\}/);

  for (const file of ["app/chords/[chord]/page.tsx", "app/scales/[scale]/page.tsx"]) {
    const source = await readFile(new URL(file, repoRoot), "utf8");
    assert.match(source, /export const dynamicParams = false;/, file);
    assert.match(source, /export function generateStaticParams\(\)/, file);
    assert.match(source, /alternates: \{ canonical: url \}/, file);
    // Same breadcrumb contract as the tool pages: one trail feeds both halves.
    assert.match(source, /const jsonLd = breadcrumbJsonLd\(trail\);/, file);
    assert.match(source, /<Breadcrumb trail=\{trail\}/, file);
  }
});
