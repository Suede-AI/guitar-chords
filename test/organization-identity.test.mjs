import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

test("the organization identity set stays on the verified allowlist", async () => {
  const source = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const syntax = ts.createSourceFile(
    "app/layout.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const stringConstants = new Map();
  const collectStringConstants = (node) => {
    if (ts.isVariableDeclaration(node)
        && ts.isIdentifier(node.name)
        && node.initializer
        && ts.isStringLiteral(node.initializer)) {
      stringConstants.set(node.name.text, node.initializer.text);
    }
    ts.forEachChild(node, collectStringConstants);
  };
  collectStringConstants(syntax);

  const propertyNamed = (node, name) => node.properties.find(
    (property) => ts.isPropertyAssignment(property)
      && ((ts.isStringLiteral(property.name) && property.name.text === name)
        || (ts.isIdentifier(property.name) && property.name.text === name)),
  );
  const resolveString = (node) => {
    if (ts.isStringLiteral(node)) return node.text;
    if (ts.isIdentifier(node)) return stringConstants.get(node.text);
    return undefined;
  };

  const canonicalOrganizations = [];
  const visit = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const type = propertyNamed(node, "@type");
      if (type && ts.isPropertyAssignment(type)
          && ts.isStringLiteral(type.initializer)
          && type.initializer.text === "Organization") {
        const id = propertyNamed(node, "@id");
        if (id && ts.isPropertyAssignment(id)
            && resolveString(id.initializer) === "https://suedeai.ai/#organization") {
          canonicalOrganizations.push(node);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(syntax);
  assert.equal(
    canonicalOrganizations.length,
    1,
    "exactly one canonical Suede Organization is required",
  );
  const sameAs = propertyNamed(canonicalOrganizations[0], "sameAs");
  assert.ok(sameAs && ts.isPropertyAssignment(sameAs), "Organization sameAs is required");
  assert.ok(ts.isArrayLiteralExpression(sameAs.initializer), "Organization sameAs must be an array");

  const urls = sameAs.initializer.elements.map((element) => {
    assert.ok(ts.isStringLiteral(element), "Organization sameAs entries must be URL literals");
    return element.text;
  });
  assert.deepEqual(urls, [
    "https://suedeai.org/",
    "https://github.com/Suede-AI",
    "https://x.com/AISUEDE",
    "https://www.linkedin.com/company/suede-labs",
    "https://www.wikidata.org/wiki/Q141169484",
  ]);
});
