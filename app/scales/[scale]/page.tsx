import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Fretboard } from "@/components/Fretboard";
import { PracticeLinks } from "@/components/PracticeLinks";
import { breadcrumbJsonLd, crumbUrl, nestedTrailFor } from "@/lib/breadcrumbs";
import { CHORD_NAMES, chordPath, formulaPitchClasses } from "@/lib/chords/pages";
import { SCALES, buildScale } from "@/lib/music/scales";
import {
  EXAMPLE_ROOT,
  SCALE_SLUGS,
  containsAll,
  inlineScaleName,
  relatedScales,
  scaleFormula,
  scaleIdForSlug,
  scaleInAllKeys,
  scalePath,
  scaleSteps,
  spellScale,
  type ScaleId,
} from "@/lib/music/scale-pages";
import { pitchClassOfName } from "@/lib/music/spelling";
import { keywordsFor } from "@/lib/keywords";

type Params = { scale: string };

// One static page per scale in the trainer; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return SCALE_SLUGS.map((scale) => ({ scale }));
}

function pageCopy(id: ScaleId) {
  const def = SCALES[id];
  const formula = scaleFormula(id).join(" ");
  const title = `${def.name} scale on guitar: notes, formula and fretboard positions`;
  const description = `${def.name} scale formula ${formula} (${scaleSteps(id).join(" ")}), its notes in all 12 keys, fretboard positions and related scales. ${def.description}`;
  return { def, formula, title, description };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { scale } = await params;
  const id = scaleIdForSlug(scale);
  if (!id) return {};
  const { def, title, description } = pageCopy(id);
  const url = crumbUrl(scalePath(id));
  return {
    title,
    description,
    keywords: keywordsFor("/scales/[scale]"),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${def.name} scale on the guitar fretboard at guitarchords.info`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

const TABLE_STYLE = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "var(--text-sm)",
  color: "var(--color-text-muted)",
} as const;
const CELL_STYLE = {
  textAlign: "left",
  padding: "0.45rem 0.75rem 0.45rem 0",
  borderBottom: "1px solid var(--color-rule-muted)",
} as const;
const HEAD_STYLE = {
  ...CELL_STYLE,
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-mono-eyebrow)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--color-text-dim)",
  fontWeight: 400,
} as const;
const H2_STYLE = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-xl)",
  margin: 0,
  letterSpacing: "-0.01em",
} as const;
const BODY_STYLE = {
  margin: 0,
  color: "var(--color-text-muted)",
  fontSize: "var(--text-sm)",
  maxWidth: "70ch",
} as const;

function fretText(fret: number): string {
  return fret === 0 ? "Open (and 12)" : String(fret);
}

export default async function ScalePage({ params }: { params: Promise<Params> }) {
  const { scale } = await params;
  const id = scaleIdForSlug(scale);
  if (!id) notFound();

  const { def, formula } = pageCopy(id);
  const steps = scaleSteps(id);
  const formulaLabels = scaleFormula(id);
  const keys = scaleInAllKeys(id);
  const related = relatedScales(id);
  const inline = inlineScaleName(id);

  const exampleRootPc = pitchClassOfName(EXAMPLE_ROOT);
  const examplePcs = buildScale(exampleRootPc, id);
  const exampleNotes = spellScale(EXAMPLE_ROOT, id);
  const exampleLabels = Object.fromEntries(
    exampleNotes.map((note) => [pitchClassOfName(note), note]),
  );
  const fittingChords = CHORD_NAMES.filter((name) =>
    containsAll(examplePcs, formulaPitchClasses(name)),
  );

  const trail = nestedTrailFor(
    { name: "Guitar Scales", path: "/scales" },
    `${def.name} scale`,
    scalePath(id),
  );
  const jsonLd = breadcrumbJsonLd(trail);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb trail={trail} widthClassName="max-w-6xl" />
      <article
        className="mx-auto max-w-6xl px-6"
        style={{
          paddingTop: "var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-8)",
        }}
      >
        <header style={{ display: "grid", gap: "var(--space-3)" }}>
          <span className="eyebrow eyebrow--cyan">
            ⊕ Scale · {def.intervals.length} notes
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {def.name} scale on guitar
          </h1>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "var(--text-base)",
              margin: 0,
              maxWidth: "62ch",
            }}
          >
            {def.description} Formula {formula}. In A, the {inline} scale is{" "}
            {exampleNotes.join(", ")}.
          </p>
        </header>

        <section aria-labelledby="formula-heading" style={{ display: "grid", gap: "var(--space-3)" }}>
          <h2 id="formula-heading" style={H2_STYLE}>
            Formula and step pattern
          </h2>
          <p style={BODY_STYLE}>
            Steps between neighbouring notes, closing on the octave: {steps.join(" ")}{" "}
            (W = whole step, H = half step, W+H = three semitones).
          </p>
          <table style={TABLE_STYLE}>
            <thead>
              <tr>
                <th scope="col" style={HEAD_STYLE}>Degree</th>
                <th scope="col" style={HEAD_STYLE}>Semitones from root</th>
                <th scope="col" style={HEAD_STYLE}>In A</th>
              </tr>
            </thead>
            <tbody>
              {def.intervals.map((iv, i) => (
                <tr key={iv}>
                  <td style={{ ...CELL_STYLE, color: "var(--color-text)" }}>{formulaLabels[i]}</td>
                  <td style={CELL_STYLE}>{iv}</td>
                  <td style={CELL_STYLE}>{exampleNotes[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section aria-labelledby="keys-heading" style={{ display: "grid", gap: "var(--space-3)" }}>
          <h2 id="keys-heading" style={H2_STYLE}>
            {def.name} scale notes in all 12 keys
          </h2>
          <p style={BODY_STYLE}>
            The root fret columns show where each key starts on the 6th (low E)
            and 5th (A) strings in standard tuning.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={TABLE_STYLE}>
              <thead>
                <tr>
                  <th scope="col" style={HEAD_STYLE}>Key</th>
                  <th scope="col" style={HEAD_STYLE}>Notes</th>
                  <th scope="col" style={HEAD_STYLE}>Root on 6th string</th>
                  <th scope="col" style={HEAD_STYLE}>Root on 5th string</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((row) => (
                  <tr key={row.root}>
                    <th scope="row" style={{ ...CELL_STYLE, color: "var(--color-text)", fontWeight: 400 }}>
                      {row.root} {inline}
                    </th>
                    <td style={{ ...CELL_STYLE, fontFamily: "var(--font-mono)" }}>{row.notes.join(" ")}</td>
                    <td style={CELL_STYLE}>{fretText(row.lowEFret)}</td>
                    <td style={CELL_STYLE}>{fretText(row.aFret)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="positions-heading" style={{ display: "grid", gap: "var(--space-3)" }}>
          <h2 id="positions-heading" style={H2_STYLE}>
            Fretboard positions: A {inline}
          </h2>
          <p style={BODY_STYLE}>
            Root in solid cyan, scale tones outlined, from the open strings to
            fret 15. Slide the pattern along the neck to change key, using the
            root frets in the table above.
          </p>
          <div style={{ overflowX: "auto" }}>
            <Fretboard
              highlightedPcs={examplePcs}
              rootPc={exampleRootPc}
              noteLabels={exampleLabels}
            />
          </div>
          <p style={BODY_STYLE}>
            Pick another root in the{" "}
            <Link href="/scales" className="link">
              scale trainer
            </Link>{" "}
            to light up the {inline} scale in any key.
          </p>
        </section>

        {fittingChords.length > 0 ? (
          <section aria-labelledby="chords-heading" style={{ display: "grid", gap: "var(--space-3)" }}>
            <h2 id="chords-heading" style={H2_STYLE}>
              Chords that fit A {inline}
            </h2>
            <p style={BODY_STYLE}>
              Chords from the{" "}
              <Link href="/chords" className="link">
                chord library
              </Link>{" "}
              built only from notes of A {inline} ({exampleNotes.join(" ")}).
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {fittingChords.map((name) => (
                <li key={name}>
                  <Link href={chordPath(name)} className="pill" style={{ textDecoration: "none" }}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section aria-labelledby="related-heading" style={{ display: "grid", gap: "var(--space-3)" }}>
            <h2 id="related-heading" style={H2_STYLE}>
              Related scales
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: "var(--space-3)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              {related.map((rel) => (
                <li key={rel.id}>
                  <Link href={rel.path} className="link">
                    {rel.name} scale
                  </Link>
                  {`: ${rel.reasons.join(" ")}`}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <PracticeLinks />
      </article>
    </>
  );
}
