import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const repoRoot = new URL("../", import.meta.url);

const PUBLIC_COPY = ["app/page.tsx", "app/layout.tsx", "public/llms.txt", "README.md"];

async function publicFiles() {
  return Promise.all(
    PUBLIC_COPY.map(async (file) => {
      try {
        return [file, await readFile(new URL(file, repoRoot), "utf8")];
      } catch {
        return [file, ""];
      }
    }),
  );
}

// The Signal Chain had a free tier. strumly#140 RETIRED it — the complete edition is
// the only offer, and every former free path 308s to /book.
//
// The first version of this guard listed the four exact strings grep had found, and
// it PASSED while two more occurrences stayed live: a SITEWIDE footer reading
// "The Signal Chain free at guitar.solutions." and a byline reading
// "(free at guitar.solutions)". A `grep -oE` sweep had missed both because Next.js
// splits the rendered text across tags. So this asserts on the CLAIM instead: the
// word "free" may not appear near a book reference, in any wording.
//
// Scanned PER FILE, never on a concatenation — joining the files makes the tail of
// one adjacent to the head of the next and invents proximity that does not exist.
// guitarchords.info is a genuinely free chord tool, so "free" is legitimate here;
// only "free" attached to the BOOK is the defect.
const BOOK_REF = /guitar\.solutions|signal\s*chain|SIGNAL_CHAIN_URL|\bbook\b|\bedition\b/i;
const WINDOW = 160;

test("does not advertise the book as free, in any wording", async () => {
  for (const [file, contents] of await publicFiles()) {
    for (const match of contents.matchAll(/free/gi)) {
      const window = contents.slice(
        Math.max(0, match.index - WINDOW),
        match.index + WINDOW,
      );
      assert.ok(
        !BOOK_REF.test(window),
        `${file}: "free" appears within ${WINDOW} chars of a book reference:\n…${window.trim()}…`,
      );
    }
  }
});

// The exact literals that regressed, kept as named regressions.
test("does not repeat the known free-tier regressions", async () => {
  const combined = (await publicFiles()).map(([, c]) => c).join("\n");

  assert.doesNotMatch(combined, /editions?\s*·\s*free/i);
  assert.doesNotMatch(combined, /read\s+free\s+at/i);
  assert.doesNotMatch(combined, /free\s+at\s+guitar\.solutions/i);
  assert.doesNotMatch(combined, /\bfree\s+(?:edition|copy|download)\b/i);
  assert.doesNotMatch(combined, /\b3 editions\b/i);
});

// Do NOT hardcode the price here either. strumly.suedeai.ai/book is the single owner
// of book-offer intent (it carries the Book/Offer JSON-LD); this host links and
// describes. A price copied onto a second host is a stale claim waiting to happen —
// the same defect as the open-source count, which this estate published five
// different ways because a moving number was hardcoded in several repos.
test("does not restate the book price on this host", async () => {
  const combined = (await publicFiles()).map(([, c]) => c).join("\n");

  assert.doesNotMatch(
    combined,
    /\$\s*\d+(?:\.\d{2})?/,
    "prices belong on the selling host, not here",
  );
});
