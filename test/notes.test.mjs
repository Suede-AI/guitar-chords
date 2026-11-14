import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { importTs } from "./support/load-ts.mjs";

const repoRoot = new URL("../", import.meta.url);

// The /notes articles: length, metadata, schema and claim guards.
const notes = await importTs("lib/notes.ts");
const sitemap = (await importTs("app/sitemap.ts")).default;

function bodyText(note) {
  return notes.plainText(
    note.blocks.map((b) => (b.kind === "ul" ? b.items.join(" ") : b.text)).join(" "),
  );
}

test("three unique articles with titles and descriptions in range", () => {
  assert.equal(notes.NOTES.length, 3);
  assert.equal(new Set(notes.NOTE_SLUGS).size, 3);
  assert.equal(new Set(notes.NOTES.map((n) => n.title)).size, 3);
  for (const note of notes.NOTES) {
    assert.match(note.slug, /^[a-z0-9-]+$/);
    assert.ok(note.title.length >= 50 && note.title.length <= 60, `${note.slug} title ${note.title.length}`);
    assert.ok(
      note.description.length >= 120 && note.description.length <= 160,
      `${note.slug} description ${note.description.length}`,
    );
    const words = notes.noteWordCount(note);
    assert.ok(words >= 800 && words <= 1300, `${note.slug} has ${words} words`);
    assert.equal(note.datePublished, "2026-11-14");
  }
});

test("articles name the author and end with a next step to the main pages", () => {
  for (const note of notes.NOTES) {
    const text = bodyText(note);
    assert.ok((text.match(/Jason Colapietro/g) ?? []).length >= 5, note.slug);
    const last = note.blocks.at(-1).text;
    assert.match(last, /https:\/\/suedeai\.agency\/assessment/, note.slug);
    assert.match(last, /https:\/\/suedeai\.ai\/founder/, note.slug);
  }
});

test("articles stay inside the verified claim list", () => {
  const banned = [
    /velvet sundown/i,
    /forbes/i,
    /\$\s*\d/,
    /multimillion/i,
    /\b(anthropic|google|claude) partner\b/i,
    /\bFAU\b/,
  ];
  for (const note of notes.NOTES) {
    const raw = JSON.stringify(note);
    for (const pattern of banned) assert.doesNotMatch(raw, pattern, note.slug);
    if (/The Manifest/.test(raw)) {
      assert.match(raw, /October 31, 2026/, `${note.slug}: The Manifest claim needs its date`);
      assert.match(raw, /Florida AI Deployment/, `${note.slug}: The Manifest claim needs its category`);
    }
  }
});

test("article pages are static and their schema reuses the canonical @ids", async () => {
  const source = await readFile(new URL("app/notes/[slug]/page.tsx", repoRoot), "utf8");
  assert.match(source, /export const dynamicParams = false;/);
  assert.match(source, /"@type": "BlogPosting"/);
  assert.match(source, /author: \{ "@id": JASON_PERSON_ID \}/);
  assert.match(source, /publisher: \{ "@id": SUEDE_ORG_ID \}/);
  assert.match(source, /const jsonLd = breadcrumbJsonLd\(trail\);/);
  assert.match(source, /<Breadcrumb trail=\{trail\}/);
  assert.doesNotMatch(source, /"@type": "(Person|Organization)"/);
});

test("the sitemap and llms.txt list the notes", async () => {
  const urls = new Set(sitemap().map(({ url }) => url));
  assert.ok(urls.has("https://guitarchords.info/notes"));
  const llms = await readFile(new URL("public/llms.txt", repoRoot), "utf8");
  for (const slug of notes.NOTE_SLUGS) {
    assert.ok(urls.has(`https://guitarchords.info/notes/${slug}`), slug);
    assert.ok(llms.includes(`https://guitarchords.info/notes/${slug}`), slug);
  }
});
