import type { Metadata } from "next";
import { ChordLibrary } from "./ChordLibrary";

export const metadata: Metadata = {
  title: "Guitar Chord Chart & Library — Free Fingering Diagrams",
  description:
    "Free guitar chord chart with SVG fingering diagrams for open chords, barre chords, 7ths, maj7, min7, sus, and power chords. Standard tuning. No sign-up.",
  keywords: [
    "guitar chord chart",
    "guitar fingering diagrams",
    "open chords guitar",
    "barre chords",
    "guitar chord library",
    "maj7 guitar chord",
    "sus chord guitar",
    "power chords",
    "free chord chart",
    "guitar chord diagrams",
  ],
  alternates: { canonical: "https://guitarchords.info/chords" },
  openGraph: {
    title: "Guitar Chord Chart & Library — Free Fingering Diagrams",
    description:
      "Free guitar chord chart with SVG fingering diagrams for open chords, barre chords, 7ths, maj7, min7, sus, and power chords. Standard tuning. No sign-up.",
    url: "https://guitarchords.info/chords",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "guitarchords.info — free guitar chord chart with fingering diagrams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guitar Chord Chart & Library — Free Fingering Diagrams",
    description:
      "Free guitar chord chart with SVG fingering diagrams for open chords, barre chords, 7ths, maj7, min7, sus, and power chords. Standard tuning. No sign-up.",
    images: ["/og-image.png"],
  },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://guitarchords.info" },
    { "@type": "ListItem", position: 2, name: "Guitar Chord Chart", item: "https://guitarchords.info/chords" },
  ],
};

export default function ChordsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <ChordLibrary />
    </>
  );
}
