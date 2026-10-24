import assert from "node:assert/strict";
import { test } from "node:test";
import { importTs } from "./support/load-ts.mjs";

async function loadSitemap() {
  return (await importTs("app/sitemap.ts")).default;
}

test("sitemap dates include route and shared-layout changes", async () => {
  const sitemap = await loadSitemap();
  const datesByUrl = Object.fromEntries(
    sitemap().map(({ url, lastModified }) => [
      url,
      lastModified.toISOString().slice(0, 10),
    ]),
  );

  const coreRoutes = Object.fromEntries(
    Object.entries(datesByUrl).filter(
      ([url]) => !/\/(chords|scales)\/[^/]+$/.test(url),
    ),
  );
  assert.deepEqual(coreRoutes, {
    "https://guitarchords.info/": "2026-10-24",
    "https://guitarchords.info/chords": "2026-10-24",
    "https://guitarchords.info/scales": "2026-10-24",
    "https://guitarchords.info/tuner": "2026-10-24",
    "https://guitarchords.info/metronome": "2026-10-24",
    "https://guitarchords.info/ai-instructions": "2026-10-12",
  });

  const referencePages = Object.entries(datesByUrl).filter(([url]) =>
    /\/(chords|scales)\/[^/]+$/.test(url),
  );
  assert.ok(referencePages.length > 0, "chord and scale pages are in the sitemap");
  for (const [url, date] of referencePages) {
    assert.equal(date, "2026-10-24", url);
  }
});
