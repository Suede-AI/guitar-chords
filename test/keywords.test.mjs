import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const repoRoot = new URL("../", import.meta.url);

// Guard for <meta name="keywords">. Read on SOURCE because this suite has no
// build step: each page.tsx must read its own route's list from lib/keywords.ts,
// and the root layout must carry the home list as the default. A child route's
// keywords replace the parent's in the App Router, so a page that drops the
// call ships no keywords at all.

async function pages(dir = "app") {
  const out = [];
  for (const entry of await readdir(new URL(`${dir}/`, repoRoot), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      if (entry.name !== "api") out.push(...(await pages(rel)));
    } else if (entry.name === "page.tsx") out.push(rel);
  }
  return out;
}

function routeOf(file) {
  const rel = file.replace(/^app\/?/, "").replace(/\/?page\.tsx$/, "");
  return `/${rel}`;
}

async function keywordMap() {
  const src = await readFile(new URL("lib/keywords.ts", repoRoot), "utf8");
  const body = src.slice(src.indexOf("ROUTE_KEYWORDS = {"), src.indexOf("} as const"));
  const map = {};
  for (const [, route, list] of body.matchAll(/"([^"]+)": \[\n([\s\S]*?)\n {2}\],/g)) {
    map[route] = [...list.matchAll(/"([^"]+)",/g)].map((m) => m[1]);
  }
  const brand = [...src.match(/BRAND_KEYWORDS[^=]*= \[([^\]]*)\]/)[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return { map, brand };
}

test("each page reads its own route's keywords from the central map", async () => {
  const { map } = await keywordMap();
  const files = await pages();
  assert.ok(files.length > 0);
  for (const file of files) {
    const src = await readFile(new URL(file, repoRoot), "utf8");
    const route = routeOf(file);
    assert.ok(map[route], `${route} has no entry in lib/keywords.ts`);
    assert.ok(src.includes(`keywords: keywordsFor("${route}")`), `${file} does not ship keywordsFor("${route}")`);
  }
});

test("root layout carries the home keywords as the default", async () => {
  const src = await readFile(new URL("app/layout.tsx", repoRoot), "utf8");
  assert.ok(src.includes('keywords: keywordsFor("/")'));
});

test("keyword lists are well formed and use the current brand", async () => {
  const { map, brand } = await keywordMap();
  assert.deepEqual(brand, ["guitarchords.info", "Suede AI"]);
  for (const [route, list] of Object.entries(map)) {
    assert.ok(list.length >= 5, `${route}: too few keywords`);
    const lowered = list.map((t) => t.toLowerCase());
    assert.equal(new Set(lowered).size, list.length, `${route}: duplicate keywords`);
    for (const term of list) {
      assert.ok(!term.includes(","), `${route}: "${term}" contains a comma`);
      assert.ok(!/suede labs/i.test(term), `${route}: brand term should be "Suede AI"`);
    }
  }
});
