import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChordDiagram } from "@/components/ChordDiagram";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PracticeLinks } from "@/components/PracticeLinks";
import { breadcrumbJsonLd, crumbUrl, nestedTrailFor } from "@/lib/breadcrumbs";
import {
  CHORD_SLUGS,
  chordNameForSlug,
  chordPageData,
  relatedChords,
  type RelatedChord,
} from "@/lib/chords/pages";
import { scalePath } from "@/lib/music/scale-pages";
import { keywordsFor } from "@/lib/keywords";
import { pageTitle, titleCase, webPageJsonLd } from "@/lib/seo";

type Params = { chord: string };

// One static page per entry in the chord library; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return CHORD_SLUGS.map((chord) => ({ chord }));
}

function pageCopy(name: string) {
  const data = chordPageData(name);
  const notes = data.tones.map((t) => t.note).join(" ");
  // Chord name first, then the intent. The longest name in the library (F#
  // minor) still fits the branded form inside the 65-character budget.
  const title = pageTitle(`${titleCase(data.displayName)} Guitar Chord: Chart, Notes & Formula`);
  const aside = data.displayName === data.name ? data.longName : data.name;
  const description = `${data.displayName} (${aside}) guitar chord in standard tuning: ${data.shape} fingering diagram, chord tones ${notes}, formula ${data.formula}, and related chords.`;
  return { data, title, description };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { chord } = await params;
  const name = chordNameForSlug(chord);
  if (!name) return {};
  const { data, title, description } = pageCopy(name);
  const url = crumbUrl(data.path);
  return {
    title: { absolute: title },
    description,
    keywords: keywordsFor("/chords/[chord]"),
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
          alt: `${data.displayName} guitar chord fingering diagram on guitarchords.info`,
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

function ChordLinkList({ items }: { items: RelatedChord[] }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "var(--space-2) var(--space-4)",
        fontSize: "var(--text-sm)",
        color: "var(--color-text-muted)",
      }}
    >
      {items.map((item) => (
        <li key={item.name}>
          <Link href={item.path} className="link">
            {item.name}
          </Link>
          {`: ${item.label}`}
        </li>
      ))}
    </ul>
  );
}

export default async function ChordPage({ params }: { params: Promise<Params> }) {
  const { chord } = await params;
  const name = chordNameForSlug(chord);
  if (!name) notFound();

  const { data, title, description } = pageCopy(name);
  const related = relatedChords(name);
  const trail = nestedTrailFor(
    { name: "Guitar Chord Chart", path: "/chords" },
    data.displayName,
    data.path,
  );
  const jsonLd = breadcrumbJsonLd(trail);
  const pageJsonLd = webPageJsonLd({ path: data.path, name: title, description });
  const omitted = data.tones.filter((t) => !t.inShape);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
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
          <span className="eyebrow eyebrow--red">
            <span aria-hidden>◆</span>&nbsp;&nbsp;Chord · {data.categoryLabel}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {data.displayName} guitar chord
          </h1>
          <p
            style={{
              color: "var(--color-text-muted)",
              fontSize: "var(--text-base)",
              margin: 0,
              maxWidth: "62ch",
            }}
          >
            {data.longName} ({data.name}) in standard tuning (EADGBE). Play the
            shape {data.shape} from the low E string to the high E string. The
            chord tones are {data.tones.map((t) => t.note).join(", ")}, and the
            lowest sounding note is {data.lowestNote}.
          </p>
        </header>

        <section
          aria-labelledby="fingering-heading"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-6)",
            alignItems: "start",
          }}
        >
          <div style={{ maxWidth: "220px" }}>
            <ChordDiagram chord={data.name} />
          </div>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <h2 id="fingering-heading" style={H2_STYLE}>
              Fingering chart
            </h2>
            <table style={TABLE_STYLE}>
              <thead>
                <tr>
                  <th scope="col" style={HEAD_STYLE}>String</th>
                  <th scope="col" style={HEAD_STYLE}>Fret</th>
                  <th scope="col" style={HEAD_STYLE}>Note</th>
                </tr>
              </thead>
              <tbody>
                {data.strings.map((s) => (
                  <tr key={s.string}>
                    <td style={CELL_STYLE}>{s.string}</td>
                    <td style={CELL_STYLE}>
                      {s.fret === "x" ? "Muted" : s.fret === "0" ? "Open" : s.fret}
                    </td>
                    <td style={{ ...CELL_STYLE, color: "var(--color-text)" }}>
                      {s.note ?? "Not played"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="notes-heading" style={{ display: "grid", gap: "var(--space-3)" }}>
          <h2 id="notes-heading" style={H2_STYLE}>
            Notes and intervals
          </h2>
          <p style={{ margin: 0, color: "var(--color-text-muted)", maxWidth: "62ch" }}>
            Formula {data.formula}.
            {omitted.length > 0
              ? ` This shape leaves out the ${omitted
                  .map((t) => `${t.intervalName.toLowerCase()} (${t.note})`)
                  .join(" and ")}.`
              : " This shape sounds each chord tone."}
          </p>
          <table style={TABLE_STYLE}>
            <thead>
              <tr>
                <th scope="col" style={HEAD_STYLE}>Note</th>
                <th scope="col" style={HEAD_STYLE}>Degree</th>
                <th scope="col" style={HEAD_STYLE}>Interval from {data.root}</th>
                <th scope="col" style={HEAD_STYLE}>In this shape</th>
              </tr>
            </thead>
            <tbody>
              {data.tones.map((t) => (
                <tr key={t.short}>
                  <td style={{ ...CELL_STYLE, color: "var(--color-text)" }}>{t.note}</td>
                  <td style={CELL_STYLE}>{t.short}</td>
                  <td style={CELL_STYLE}>
                    {t.intervalName} ({t.semitones} semitones)
                  </td>
                  <td style={CELL_STYLE}>{t.inShape ? "Yes" : "Left out"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section aria-labelledby="related-heading" style={{ display: "grid", gap: "var(--space-4)" }}>
          <h2 id="related-heading" style={H2_STYLE}>
            Related chords
          </h2>
          {related.relative ? (
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              <h3 className="eyebrow" style={{ margin: 0 }}>
                Relative {data.quality === "major" ? "minor" : "major"}
              </h3>
              <ChordLinkList items={[related.relative]} />
            </div>
          ) : null}
          {related.sameRoot.length > 0 ? (
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              <h3 className="eyebrow" style={{ margin: 0 }}>
                Same root: {data.root}
              </h3>
              <ChordLinkList items={related.sameRoot} />
            </div>
          ) : null}
          {related.key && related.inKey.length > 0 ? (
            <div style={{ display: "grid", gap: "var(--space-2)" }}>
              <h3 className="eyebrow" style={{ margin: 0 }}>
                In the key of {related.key.name}
              </h3>
              <ChordLinkList items={related.inKey} />
              <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
                See the{" "}
                <Link href={scalePath(related.key.scaleId)} className="link">
                  {related.key.scaleId === "major" ? "major scale" : "natural minor scale"} in all 12 keys
                </Link>{" "}
                for the notes of {related.key.name}.
              </p>
            </div>
          ) : null}
        </section>

        <PracticeLinks />
      </article>
    </>
  );
}
