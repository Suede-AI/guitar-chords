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

// Round one shipped three articles on 2026-11-14; round four added two depth
// articles on 2026-11-15, each tied to one Palm Beach County town.
const ROUND_ONE = [
  "chord-reference-technical-seo",
  "palm-beach-county-guitar-practice-plan",
  "fast-accessible-static-sites",
];
const ROUND_FOUR = {
  "delray-beach-open-mic-chords": "Delray Beach",
  "wellington-adult-guitar-scales-path": "Wellington",
};

test("five unique articles with titles and descriptions in range", () => {
  assert.equal(notes.NOTES.length, 5);
  assert.deepEqual(notes.NOTE_SLUGS, [...ROUND_ONE, ...Object.keys(ROUND_FOUR)]);
  assert.equal(new Set(notes.NOTE_SLUGS).size, 5);
  assert.equal(new Set(notes.NOTES.map((n) => n.title)).size, 5);
  assert.equal(new Set(notes.NOTES.map((n) => n.description)).size, 5);
  for (const note of notes.NOTES) {
    assert.match(note.slug, /^[a-z0-9-]+$/);
    assert.ok(note.title.length >= 50 && note.title.length <= 60, `${note.slug} title ${note.title.length}`);
    assert.ok(
      note.description.length >= 120 && note.description.length <= 160,
      `${note.slug} description ${note.description.length}`,
    );
    const words = notes.noteWordCount(note);
    assert.ok(words >= 800 && words <= 1300, `${note.slug} has ${words} words`);
    assert.equal(note.datePublished, ROUND_ONE.includes(note.slug) ? "2026-11-14" : "2026-11-15", note.slug);
  }
});

test("round-four articles meet the depth bar and link out to sibling articles", () => {
  const SATELLITES = [
    "guitar.services",
    "guitarhub.org",
    "dna.suedeai.ai",
    "signal.suedeai.ai",
    "fretpulse.suedeai.ai",
    "agentix.suedeai.ai",
    "docs.suedeai.ai",
    "optimize.suedeai.ai",
  ];
  const otherParagraphs = new Set(
    notes.NOTES.filter((n) => ROUND_ONE.includes(n.slug)).flatMap((n) =>
      n.blocks.filter((b) => b.kind === "p").map((b) => b.text),
    ),
  );
  for (const [slug, town] of Object.entries(ROUND_FOUR)) {
    const note = notes.getNote(slug);
    assert.ok(note, slug);
    const words = notes.noteWordCount(note);
    assert.ok(words >= 900 && words <= 1300, `${slug} has ${words} words`);
    assert.equal(note.dateModified, "2026-11-15", slug);
    const text = bodyText(note);
    assert.ok(text.includes(town), `${slug} names ${town}`);
    assert.ok(note.headline.includes(town), `${slug} headline names ${town}`);
    assert.ok(
      notes.notePlaces(note).some((place) => place.name === town),
      `${slug} schema covers ${town}`,
    );
    assert.ok((text.match(/\bSuede\b(?! AI| Labs)/g) ?? []).length >= 3, `${slug} uses "Suede" alone`);
    assert.ok((text.match(/Suede Labs/g) ?? []).length <= 1, `${slug} names Suede Labs at most once`);

    const raw = note.blocks.map((b) => (b.kind === "ul" ? b.items.join(" ") : b.text)).join(" ");
    const hrefs = [...raw.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => new URL(m[1]));
    const siblingArticles = hrefs.filter(
      (url) => SATELLITES.includes(url.hostname) && url.pathname.replace(/\/$/, "").split("/").length >= 2 && url.pathname !== "/",
    );
    assert.ok(
      new Set(siblingArticles.map((url) => url.hostname + url.pathname)).size >= 2,
      `${slug} deep-links at least two sibling satellite articles`,
    );
    assert.ok(hrefs.some((url) => url.href === "https://suedeai.agency/"), `${slug} links suedeai.agency`);
    assert.ok(hrefs.some((url) => url.href === "https://suedeai.ai/founder"), `${slug} links the founder page`);

    for (const block of note.blocks) {
      if (block.kind === "p") assert.ok(!otherParagraphs.has(block.text), `${slug} repeats a paragraph`);
    }
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
    const text = bodyText(note);
    assert.ok(
      text.includes(
        "Suede AI ranks among Clutch's Top 30 AI Consultants in Florida and Top 50 AI Consultants nationwide (November 2026).",
      ),
      `${note.slug}: needs the Clutch ranking sentence verbatim`,
    );
    assert.match(raw, /https:\/\/clutch\.co\/profile\/suede-ai-seo/, note.slug);
    assert.match(raw, /https:\/\/clutch\.co\/consulting\/ai\/florida/, note.slug);
    assert.match(raw, /https:\/\/clutch\.co\/us\/consulting\/ai/, note.slug);
    assert.equal(note.dateModified, "2026-11-15", note.slug);
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
