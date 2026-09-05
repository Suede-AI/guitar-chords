import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const repoRoot = new URL("../", import.meta.url);

// --color-text-dim was oklch(52% 0.01 260), which resolves to #66696f: 3.72:1
// on the page background and 3.57:1 on a raised card, under the 4.5:1 WCAG AA
// floor for normal-size text. It paints eyebrows, captions, footer copy and
// input placeholders, so a Lighthouse mobile pass scored the color-contrast
// audit 0. This guard fails if any foreground token drops back under AA.
const AA_NORMAL_TEXT = 4.5;

function oklchToSrgb(lightness, chroma, hueDegrees) {
  const hue = (hueDegrees * Math.PI) / 180;
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);
  const lCone = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const mCone = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const sCone = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

  const linear = [
    4.0767416621 * lCone - 3.3077115913 * mCone + 0.2309699292 * sCone,
    -1.2684380046 * lCone + 2.6097574011 * mCone - 0.3413193965 * sCone,
    -0.0041960863 * lCone - 0.7034186147 * mCone + 1.707614701 * sCone,
  ];

  return linear.map((channel) => {
    const encoded =
      channel <= 0.0031308
        ? 12.92 * channel
        : 1.055 * channel ** (1 / 2.4) - 0.055;
    return Math.min(1, Math.max(0, encoded));
  });
}

function relativeLuminance([r, g, b]) {
  const [lr, lg, lb] = [r, g, b].map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrastRatio(foreground, background) {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [lighter, darker] = a > b ? [a, b] : [b, a];
  return (lighter + 0.05) / (darker + 0.05);
}

async function readTokens() {
  const css = await readFile(new URL("app/globals.css", repoRoot), "utf8");
  const tokens = {};
  const pattern = /--(color-[\w-]+):\s*oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)\s*;/g;
  for (const [, name, lightness, chroma, hue] of css.matchAll(pattern)) {
    tokens[name] = oklchToSrgb(Number(lightness) / 100, Number(chroma), Number(hue));
  }
  return tokens;
}

test("muted and dim text clear WCAG AA on every ink surface", async () => {
  const tokens = await readTokens();

  const backgrounds = ["color-ink", "color-ink-raised", "color-ink-hover"];
  const foregrounds = ["color-text", "color-text-muted", "color-text-dim"];

  for (const name of [...backgrounds, ...foregrounds]) {
    assert.ok(tokens[name], `expected an oklch value for --${name}`);
  }

  for (const foreground of foregrounds) {
    for (const background of backgrounds) {
      const ratio = contrastRatio(tokens[foreground], tokens[background]);
      assert.ok(
        ratio >= AA_NORMAL_TEXT,
        `--${foreground} on --${background} is ${ratio.toFixed(2)}:1, under ${AA_NORMAL_TEXT}:1`,
      );
    }
  }
});
