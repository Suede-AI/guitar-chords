import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const repoRoot = new URL("../", import.meta.url);

const PUBLIC_COPY = ["app/page.tsx", "app/layout.tsx", "public/llms.txt", "README.md"];

async function publicCopy() {
  const files = await Promise.all(
    PUBLIC_COPY.map(async (file) => {
      try {
        return await readFile(new URL(file, repoRoot), "utf8");
      } catch {
        return "";
      }
    }),
  );
  return files.join("\n");
}

// The Signal Chain had a free tier. strumly#140 RETIRED it — the complete edition
// at $19.99 is the only offer, and every former free path 308s to /book. This host
// kept advertising "3 editions · free" and "Read free at guitar.solutions" for days
// after, because the retirement was applied on the selling host only. That is a
// false price claim about a paid product, on a domain nobody was auditing.
test("does not advertise a free edition of the book", async () => {
  const combined = await publicCopy();

  assert.doesNotMatch(combined, /editions?\s*·\s*free/i);
  assert.doesNotMatch(combined, /read\s+free\s+at/i);
  assert.doesNotMatch(combined, /\bfree\s+(?:edition|copy|download)\b/i);
  assert.doesNotMatch(combined, /\b3 editions\b/i);
});

// Do NOT hardcode the price here either. strumly.suedeai.ai/book is the single
// owner of book-offer intent (it carries the Book/Offer JSON-LD); this host links
// and describes. A price copied onto a second host is a stale claim waiting to
// happen — the same defect as the open-source count that went four different ways
// across the estate.
test("does not restate the book price on this host", async () => {
  const combined = await publicCopy();

  assert.doesNotMatch(
    combined,
    /\$\s*\d+(?:\.\d{2})?/,
    "prices belong on the selling host, not here",
  );
});
