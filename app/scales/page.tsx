import type { Metadata } from "next";
import Link from "next/link";
import { ScaleTrainer } from "./ScaleTrainer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { breadcrumbJsonLd, trailFor } from "@/lib/breadcrumbs";
import { keywordsFor } from "@/lib/keywords";
import { SCALES, SCALE_ORDER } from "@/lib/music/scales";
import { scaleFormula, scalePath } from "@/lib/music/scale-pages";

export const metadata: Metadata = {
  title: "Guitar Scales Chart: All Keys & Modes",
  description:
    "Interactive guitar scale chart for all 12 keys. Major, minor, pentatonics, blues, and all 7 modes. Full neck visualization. Free, no sign-up.",
  keywords: keywordsFor("/scales"),
  alternates: { canonical: "https://guitarchords.info/scales" },
  openGraph: {
    type: "website",
    title: "Guitar Scales Chart: All Keys & Modes",
    description:
      "Interactive guitar scale chart for all 12 keys. Major, minor, pentatonics, blues, and all 7 modes. Full neck visualization. Free, no sign-up.",
    url: "https://guitarchords.info/scales",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "guitarchords.info: interactive guitar scale trainer for all 12 keys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guitar Scales Chart: All Keys & Modes",
    description:
      "Interactive guitar scale chart for all 12 keys. Major, minor, pentatonics, blues, and all 7 modes. Full neck visualization. Free, no sign-up.",
    images: ["/opengraph-image"],
  },
};

const BREADCRUMB_TRAIL = trailFor("Guitar Scales", "/scales");
const BREADCRUMB_JSON_LD = breadcrumbJsonLd(BREADCRUMB_TRAIL);

export default function ScalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <Breadcrumb trail={BREADCRUMB_TRAIL} widthClassName="max-w-6xl" />
      <ScaleTrainer />
      <section
        className="mx-auto max-w-6xl px-6"
        aria-labelledby="scale-pages-heading"
        style={{ paddingTop: "var(--space-12)", display: "grid", gap: "var(--space-4)" }}
      >
        <h2
          id="scale-pages-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Scale reference pages
        </h2>
        <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: "var(--text-sm)", maxWidth: "70ch" }}>
          Formula, notes in all 12 keys, fretboard positions and related scales for each scale in the trainer.
        </p>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "var(--space-2) var(--space-4)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)",
          }}
        >
          {SCALE_ORDER.map((id) => (
            <li key={id}>
              <Link href={scalePath(id)} className="link">
                {SCALES[id].name} scale
              </Link>
              {`: ${scaleFormula(id).join(" ")}`}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
