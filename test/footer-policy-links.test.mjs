import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const repoRoot = new URL("../", import.meta.url);

// The audit found no privacy, terms or contact route on this host, no footer
// link to one, and no address in the markup, while the tuner asks a visitor for
// microphone access. The site publishes no policy of its own, so the shared
// footer points at the Suede Labs AI pages that cover it. Because the footer
// lives in the root layout, one guard covers every route.
test("the shared footer links policy and contact on every route", async () => {
  const layout = await readFile(new URL("app/layout.tsx", repoRoot), "utf8");

  assert.match(layout, /const PRIVACY_URL = "https:\/\/suedeai\.ai\/privacy";/);
  assert.match(layout, /const TERMS_URL = "https:\/\/suedeai\.ai\/terms";/);
  assert.match(layout, /const CONTACT_URL = "https:\/\/suedeai\.ai\/contact";/);
  assert.match(layout, /const CONTACT_EMAIL = "info@suedeai\.ai";/);

  // Declaring the constants is not the same as rendering them.
  for (const [label, constant] of [
    ["Privacy", "PRIVACY_URL"],
    ["Terms", "TERMS_URL"],
    ["Contact", "CONTACT_URL"],
  ]) {
    assert.match(
      layout,
      new RegExp(`href=\\{${constant}\\}[\\s\\S]{0,220}>\\s*${label}\\s*<`),
      `footer must render a ${label} link`,
    );
  }
  assert.match(layout, /href=\{`mailto:\$\{CONTACT_EMAIL\}`\}/);
  assert.match(layout, /aria-label="Policies and contact"/);

  // The footer is rendered by the root layout, which is what puts these links
  // on all five routes.
  assert.match(layout, /<SiteFooter \/>/);
});

test("the bare policy paths resolve instead of returning 404", async () => {
  const config = JSON.parse(
    await readFile(new URL("vercel.json", repoRoot), "utf8"),
  );
  const destinations = Object.fromEntries(
    config.redirects
      .filter((redirect) => !redirect.has)
      .map((redirect) => [redirect.source, redirect.destination]),
  );

  assert.deepEqual(destinations, {
    "/privacy": "https://suedeai.ai/privacy",
    "/privacy-policy": "https://suedeai.ai/privacy",
    "/terms": "https://suedeai.ai/terms",
    "/contact": "https://suedeai.ai/contact",
  });
});
