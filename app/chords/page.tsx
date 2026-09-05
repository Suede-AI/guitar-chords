import type { Metadata } from "next";
import { ChordLibrary } from "./ChordLibrary";
import { Breadcrumb } from "@/components/Breadcrumb";
import { breadcrumbJsonLd, trailFor } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Guitar Chord Chart & Library: Free Fingering Diagrams",
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
    type: "website",
    title: "Guitar Chord Chart & Library: Free Fingering Diagrams",
    description:
      "Free guitar chord chart with SVG fingering diagrams for open chords, barre chords, 7ths, maj7, min7, sus, and power chords. Standard tuning. No sign-up.",
    url: "https://guitarchords.info/chords",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "guitarchords.info: free guitar chord chart with fingering diagrams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guitar Chord Chart & Library: Free Fingering Diagrams",
    description:
      "Free guitar chord chart with SVG fingering diagrams for open chords, barre chords, 7ths, maj7, min7, sus, and power chords. Standard tuning. No sign-up.",
    images: ["/opengraph-image"],
  },
};

const BREADCRUMB_TRAIL = trailFor("Guitar Chord Chart", "/chords");
const BREADCRUMB_JSON_LD = breadcrumbJsonLd(BREADCRUMB_TRAIL);

export default function ChordsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <Breadcrumb trail={BREADCRUMB_TRAIL} widthClassName="max-w-6xl" />
      <ChordLibrary />
    </>
  );
}
