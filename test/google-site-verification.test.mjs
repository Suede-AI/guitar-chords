import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const verificationModule = new URL(
  "../lib/google-site-verification.ts",
  import.meta.url,
);

const EXPECTED_GOOGLE_TOKENS = [
  "clfDRrM2Zm6t8oKxvMRL-dDL-TSAFjnIEtdDp0N1Mi0",
  "5T1fbA82KWV1Cb6lZQOWbbiktvZkpkgW7KzMxMHe9LA",
];

test("keeps every active Google Search Console verification token", async () => {
  const source = await readFile(verificationModule, "utf8").catch(() => "");
  const javascript = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
  const { GOOGLE_SITE_VERIFICATION_TOKENS } = await import(moduleUrl);

  assert.deepEqual(GOOGLE_SITE_VERIFICATION_TOKENS, EXPECTED_GOOGLE_TOKENS);
});
