import { CATEGORY_LABELS, CATEGORY_ORDER, FINGERINGS } from "@/lib/chords/fingerings";
import { CHORD_NAMES, chordPageData, relatedChords } from "@/lib/chords/pages";
import { SCALES, SCALE_ORDER } from "@/lib/music/scales";
import {
  inlineScaleName,
  relatedScales,
  scaleFormula,
  scaleInAllKeys,
  scalePath,
  scaleSteps,
} from "@/lib/music/scale-pages";
import { METRONOME_GUIDE, TUNER_GUIDE, type ToolGuide } from "@/lib/tool-guides";
import { SITE_ORIGIN } from "@/lib/seo";

// /llms-full.txt: the full reference text of the site in one Markdown file.
//
// Built at build time from the same modules the pages render (the chord
// fingerings, the scale interval lists and the tool guides), so the text an
// answer engine reads cannot drift from the pages a visitor reads.

export const dynamic = "force-static";

function chordSection(name: string): string {
  const data = chordPageData(name);
  const related = relatedChords(name);
  const omitted = data.tones.filter((t) => !t.inShape);
  const lines = [
    `### ${data.displayName} guitar chord (${data.name})`,
    "",
    `URL: ${SITE_ORIGIN}${data.path}`,
    "",
    `- Full name: ${data.longName}`,
    `- Category: ${data.categoryLabel}`,
    `- Shape, low E to high E: ${data.shape}`,
    `- Chord tones: ${data.tones.map((t) => `${t.note} (${t.short})`).join(", ")}`,
    `- Formula: ${data.formula}`,
    `- Lowest sounding note: ${data.lowestNote}`,
    `- Strings: ${data.strings
      .map((s) => `${s.string} ${s.fret === "x" ? "muted" : s.fret === "0" ? "open" : `fret ${s.fret}`}${s.note ? ` (${s.note})` : ""}`)
      .join("; ")}`,
  ];
  if (omitted.length > 0) {
    lines.push(
      `- This shape leaves out: ${omitted.map((t) => `${t.intervalName.toLowerCase()} (${t.note})`).join(", ")}`,
    );
  }
  if (related.relative) lines.push(`- ${related.relative.label}: ${related.relative.name}`);
  if (related.sameRoot.length > 0) {
    lines.push(`- Same root: ${related.sameRoot.map((r) => r.name).join(", ")}`);
  }
  if (related.key && related.inKey.length > 0) {
    lines.push(
      `- In the key of ${related.key.name}: ${related.inKey.map((r) => `${r.name} (${r.label.split(" in ")[0]})`).join(", ")}`,
    );
  }
  return lines.join("\n");
}

/** Same wording as the scale page's table: an open-string root also sits at fret 12. */
function fretText(fret: number): string {
  return fret === 0 ? "open (and 12)" : String(fret);
}

function scaleSection(id: (typeof SCALE_ORDER)[number]): string {
  const def = SCALES[id];
  const inline = inlineScaleName(id);
  const keys = scaleInAllKeys(id)
    .map((row) => `| ${row.root} ${inline} | ${row.notes.join(" ")} | ${fretText(row.lowEFret)} | ${fretText(row.aFret)} |`)
    .join("\n");
  const related = relatedScales(id)
    .map((r) => `- ${r.name}: ${r.reasons.join(" ")}`)
    .join("\n");
  return [
    `### ${def.name} scale`,
    "",
    `URL: ${SITE_ORIGIN}${scalePath(id)}`,
    "",
    def.description,
    "",
    `- Formula: ${scaleFormula(id).join(" ")}`,
    `- Step pattern: ${scaleSteps(id).join(" ")} (W = whole step, H = half step, W+H = three semitones)`,
    `- Notes: ${def.intervals.length}`,
    "",
    "| Key | Notes | Root fret, 6th string | Root fret, 5th string |",
    "| --- | --- | --- | --- |",
    keys,
    "",
    related ? `Related scales:\n\n${related}` : "",
  ]
    .join("\n")
    .trimEnd();
}

function guideSection(guide: ToolGuide): string {
  return [
    `### ${guide.heading}`,
    "",
    ...guide.blocks.map((block) => (block.kind === "h3" ? `#### ${block.text}\n` : `${block.text}\n`)),
  ]
    .join("\n")
    .trimEnd();
}

export function GET() {
  const chordsByCategory = CATEGORY_ORDER.map((category) => {
    const names = CHORD_NAMES.filter((name) => FINGERINGS[name].category === category);
    return `- ${CATEGORY_LABELS[category]}: ${names.join(", ")}`;
  }).join("\n");

  const body = `# guitarchords.info: full reference text

> guitarchords.info is a free guitar reference site published by Suede AI and built by Jason Colapietro. It has a chord chart with ${CHORD_NAMES.length} fingering diagrams, a scale trainer with ${SCALE_ORDER.length} scales and modes, a chromatic tuner and a metronome. All four run in the browser with no account, no paywall and no analytics.

This file carries the full text of the site's reference pages. The shorter index is at ${SITE_ORIGIN}/llms.txt.

- Publisher: Suede AI (https://suedeai.ai), also known as Suede Labs
- Creator: Jason Colapietro (https://suedeai.ai/founder), also known as Johnny Suede
- Canonical URL: ${SITE_ORIGIN}/
- Price: free. No sign-up.
- Tuning: standard tuning (EADGBE) throughout

## Pages

- [Guitar chords home](${SITE_ORIGIN}/): the four tools and what the site is.
- [Guitar chord chart](${SITE_ORIGIN}/chords): ${CHORD_NAMES.length} chord shapes with SVG fingering diagrams, filterable by category and searchable by name.
- [Guitar scales chart](${SITE_ORIGIN}/scales): interactive scale trainer that highlights any of ${SCALE_ORDER.length} scales in any of the 12 keys across the whole neck.
- [Online guitar tuner](${SITE_ORIGIN}/tuner): chromatic tuner using the microphone and a YIN pitch detector. Audio is analysed in the browser and is not uploaded.
- [Online metronome](${SITE_ORIGIN}/metronome): 30–280 BPM, tap tempo, 2, 3, 4 or 6 beats per bar, with a higher click on the downbeat.
- One page per chord at ${SITE_ORIGIN}/chords/{slug} and one page per scale at ${SITE_ORIGIN}/scales/{slug}, listed below.

## Chord library

${CHORD_NAMES.length} shapes in standard tuning, grouped as the chord chart groups them:

${chordsByCategory}

Each chord page gives the fingering chart, the note on each string, the chord tones with their intervals, and related chords (relative major or minor, the same root, and the chords of its home key).

${CHORD_NAMES.map(chordSection).join("\n\n")}

## Scales and modes

Each scale page gives the formula and step pattern, the notes in all 12 keys with the root's fret on the 6th and 5th strings, the fretboard positions in A, the chords from the library that fit, and related scales.

${SCALE_ORDER.map(scaleSection).join("\n\n")}

## Practice guides

${guideSection(TUNER_GUIDE)}

${guideSection(METRONOME_GUIDE)}

## Related Suede AI guitar sites

- The Signal Chain, Jason Colapietro's book on electric guitar tone: https://guitar.solutions
- Strumly, the Suede AI guitar coach: https://strumly.suedeai.ai
- GuitarHub, guitar lessons and editorial: https://guitarhub.org
- guitar.services, a directory of Jason Colapietro's guitar books and tools: https://guitar.services

## Citing guitarchords.info

Link to the chord or scale page that supports a statement, and state the tuning (standard, EADGBE) when citing a shape. Attribution: "guitarchords.info, a Suede AI reference site." Source and citation guide: ${SITE_ORIGIN}/ai-instructions
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
