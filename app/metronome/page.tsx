import type { Metadata } from "next";
import { Metronome } from "./Metronome";

export const metadata: Metadata = {
  title: "Free Online Metronome — Tap Tempo, BPM, Time Signatures",
  description:
    "Free online metronome with tap tempo, adjustable BPM, and time signature support. Sample-accurate Web Audio scheduling. No download, no sign-up.",
  keywords: [
    "online metronome",
    "free metronome",
    "tap tempo metronome",
    "BPM metronome",
    "guitar metronome",
    "metronome no download",
    "time signature metronome",
    "browser metronome",
    "web audio metronome",
    "practice metronome",
  ],
  alternates: { canonical: "https://guitarchords.info/metronome" },
  openGraph: {
    title: "Free Online Metronome — Tap Tempo, BPM, Time Signatures",
    description:
      "Free online metronome with tap tempo, adjustable BPM, and time signature support. Sample-accurate Web Audio scheduling. No download, no sign-up.",
    url: "https://guitarchords.info/metronome",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "guitarchords.info — free online metronome with tap tempo and BPM control",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Metronome — Tap Tempo, BPM, Time Signatures",
    description:
      "Free online metronome with tap tempo, adjustable BPM, and time signature support. Sample-accurate Web Audio scheduling. No download, no sign-up.",
    images: ["/og-image.png"],
  },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://guitarchords.info" },
    { "@type": "ListItem", position: 2, name: "Metronome", item: "https://guitarchords.info/metronome" },
  ],
};

export default function MetronomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <Metronome />
    </>
  );
}
