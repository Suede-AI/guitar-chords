import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const repoRoot = new URL("../", import.meta.url);

// Every tool page shipped a BreadcrumbList JSON-LD with two ListItems while no
// page rendered a breadcrumb anywhere, so the structured data described a
// navigation a reader could not see. The two halves now read one trail. This
// guard fails if either half is dropped, or if they stop sharing that trail.
const ROUTES = [
  { route: "chords", label: "Guitar Chord Chart" },
  { route: "scales", label: "Guitar Scales" },
  { route: "tuner", label: "Guitar Tuner" },
  { route: "metronome", label: "Metronome" },
];

async function loadBreadcrumbs() {
  const source = await readFile(new URL("lib/breadcrumbs.ts", repoRoot), "utf8");
  const javascript = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
  return import(moduleUrl);
}

test("breadcrumb JSON-LD is generated from the trail the page displays", async () => {
  const { trailFor, breadcrumbJsonLd, crumbUrl } = await loadBreadcrumbs();

  for (const { route, label } of ROUTES) {
    const trail = trailFor(label, `/${route}`);
    const jsonLd = breadcrumbJsonLd(trail);

    assert.equal(jsonLd["@type"], "BreadcrumbList", route);
    // One ListItem per visible crumb, in the order the reader sees them.
    assert.deepEqual(
      jsonLd.itemListElement.map((entry) => entry.name),
      trail.map((crumb) => crumb.name),
      `${route}: declared names must match the visible trail`,
    );
    assert.deepEqual(
      jsonLd.itemListElement.map((entry) => entry.item),
      trail.map((crumb) => crumbUrl(crumb.path)),
      `${route}: declared URLs must match the visible trail`,
    );
    assert.deepEqual(
      jsonLd.itemListElement.map((entry) => entry.position),
      trail.map((_, index) => index + 1),
      `${route}: positions must be 1-based and contiguous`,
    );
    assert.deepEqual(trail.map((crumb) => crumb.name), ["Home", label], route);
  }
});

test("each tool page renders the trail it declares", async () => {
  for (const { route, label } of ROUTES) {
    const source = await readFile(
      new URL(`app/${route}/page.tsx`, repoRoot),
      "utf8",
    );

    // The trail is built once and both halves consume that same constant.
    assert.match(
      source,
      new RegExp(
        `const BREADCRUMB_TRAIL = trailFor\\("${label}", "/${route}"\\);`,
      ),
      `${route}: trail must be built from the shared helper`,
    );
    assert.match(
      source,
      /const BREADCRUMB_JSON_LD = breadcrumbJsonLd\(BREADCRUMB_TRAIL\);/,
      `${route}: JSON-LD must be generated from BREADCRUMB_TRAIL`,
    );
    assert.match(
      source,
      /<Breadcrumb trail=\{BREADCRUMB_TRAIL\}/,
      `${route}: the visible nav must render BREADCRUMB_TRAIL`,
    );

    // A hand-written BreadcrumbList literal is how the two halves drifted
    // apart the first time.
    assert.doesNotMatch(
      source,
      /"@type":\s*"BreadcrumbList"/,
      `${route}: build the BreadcrumbList through breadcrumbJsonLd`,
    );
  }
});

test("the breadcrumb component exposes a labelled nav landmark", async () => {
  const source = await readFile(
    new URL("components/Breadcrumb.tsx", repoRoot),
    "utf8",
  );

  assert.match(source, /aria-label="Breadcrumb"/);
  assert.match(source, /aria-current="page"/);
  assert.match(source, /trail\.map\(/);
});
