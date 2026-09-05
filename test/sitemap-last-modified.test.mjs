import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const sitemapModule = new URL("../app/sitemap.ts", import.meta.url);

async function loadSitemap() {
  const source = await readFile(sitemapModule, "utf8");
  const javascript = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;

  return (await import(moduleUrl)).default;
}

test("sitemap dates include route and shared-layout changes", async () => {
  const sitemap = await loadSitemap();
  const datesByUrl = Object.fromEntries(
    sitemap().map(({ url, lastModified }) => [
      url,
      lastModified.toISOString().slice(0, 10),
    ]),
  );

  assert.deepEqual(datesByUrl, {
    "https://guitarchords.info": "2026-09-05",
    "https://guitarchords.info/chords": "2026-09-05",
    "https://guitarchords.info/scales": "2026-09-05",
    "https://guitarchords.info/tuner": "2026-09-05",
    "https://guitarchords.info/metronome": "2026-09-05",
  });
});
