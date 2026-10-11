import { Buffer } from "node:buffer";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const repoRoot = new URL("../../", import.meta.url);

// The suite has no bundler, so a TypeScript module that imports other project
// modules cannot load from a bare data: URL. This transpiles the module and its
// project imports ("@/..." and relative paths) into data: URLs, depth first.
// Bare package imports are left alone; type-only imports are dropped by the
// transpiler.

function resolveFile(specifier, fromUrl) {
  const base = specifier.startsWith("@/")
    ? new URL(specifier.slice(2), repoRoot)
    : new URL(specifier, fromUrl);
  for (const suffix of ["", ".ts", ".tsx", "/index.ts"]) {
    const candidate = new URL(`${base.href}${suffix}`);
    if (suffix === "" && !/\.tsx?$/.test(candidate.pathname)) continue;
    if (existsSync(candidate)) return candidate;
  }
  throw new Error(`cannot resolve ${specifier} from ${fromUrl.pathname}`);
}

const cache = new Map();

async function toDataUrl(fileUrl) {
  if (cache.has(fileUrl.href)) return cache.get(fileUrl.href);
  const source = await readFile(fileUrl, "utf8");
  let javascript = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  const specifiers = new Set(
    [...javascript.matchAll(/(?:from|import)\s*["']([^"']+)["']/g)].map((m) => m[1]),
  );
  for (const specifier of specifiers) {
    if (!specifier.startsWith("@/") && !specifier.startsWith(".")) continue;
    const dep = await toDataUrl(resolveFile(specifier, fileUrl));
    javascript = javascript.split(`"${specifier}"`).join(`"${dep}"`);
  }
  const url = `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
  cache.set(fileUrl.href, url);
  return url;
}

/** Import a project TypeScript module by repo-relative path, e.g. "app/sitemap.ts". */
export async function importTs(path) {
  return import(await toDataUrl(new URL(path, repoRoot)));
}
