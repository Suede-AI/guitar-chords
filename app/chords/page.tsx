import type { Metadata } from "next";
import { ChordLibrary } from "./ChordLibrary";
import { Breadcrumb } from "@/components/Breadcrumb";
import { breadcrumbJsonLd, trailFor } from "@/lib/breadcrumbs";
import { keywordsFor } from "@/lib/keywords";
import { pageTitle, webPageJsonLd } from "@/lib/seo";

const TITLE = pageTitle("Guitar Chord Chart & Library: Free Fingering Diagrams");
const DESCRIPTION =
  "Free guitar chord chart with SVG fingering diagrams for open chords, barre chords, 7ths, maj7, min7, sus, and power chords. Standard tuning. No sign-up.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: keywordsFor("/chords"),
  alternates: { canonical: "https://guitarchords.info/chords" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
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
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const BREADCRUMB_TRAIL = trailFor("Guitar Chord Chart", "/chords");
const BREADCRUMB_JSON_LD = breadcrumbJsonLd(BREADCRUMB_TRAIL);
const PAGE_JSON_LD = webPageJsonLd({
  path: "/chords",
  name: TITLE,
  description: DESCRIPTION,
  type: "CollectionPage",
});

export default function ChordsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSON_LD) }}
      />
      <Breadcrumb trail={BREADCRUMB_TRAIL} widthClassName="max-w-6xl" />
      <ChordLibrary />
    </>
  );
}
