import type { Metadata } from "next";
import { ChordLibrary } from "./ChordLibrary";

export const metadata: Metadata = {
  title: "Guitar Chord Chart & Library — Free Fingering Diagrams",
  description:
    "Free guitar chord chart with SVG fingering diagrams for open chords, barre chords, 7ths, maj7, min7, sus, and power chords. Standard tuning. No sign-up.",
  alternates: { canonical: "https://guitarchords.info/chords" },
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
