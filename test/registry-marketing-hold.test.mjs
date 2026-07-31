import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const repoRoot = new URL("../", import.meta.url);

test("public guitar reference copy does not market the held IP Registry", async () => {
  const publicMarketing = await Promise.all(
    ["app/page.tsx", "app/layout.tsx", "public/llms.txt", "README.md"].map((file) =>
      readFile(new URL(file, repoRoot), "utf8"),
    ),
  );
  const combined = publicMarketing.join("\n");

  assert.doesNotMatch(combined, /ip\.suedeai\.ai/i);
  assert.doesNotMatch(combined, /\bproof of creation\b/i);
  assert.doesNotMatch(combined, /\bprogrammable (?:IP|rights)\b/i);
  assert.doesNotMatch(combined, /\broyalty routing\b/i);
  assert.doesNotMatch(combined, /\bregistered work\b/i);
  assert.doesNotMatch(combined, /\bcreator ownership infrastructure\b/i);
});
