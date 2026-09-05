import type { Metadata } from "next";
import { Metronome } from "./Metronome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { breadcrumbJsonLd, trailFor } from "@/lib/breadcrumbs";

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
    type: "website",
    title: "Free Online Metronome — Tap Tempo, BPM, Time Signatures",
    description:
      "Free online metronome with tap tempo, adjustable BPM, and time signature support. Sample-accurate Web Audio scheduling. No download, no sign-up.",
    url: "https://guitarchords.info/metronome",
    images: [
      {
        url: "/opengraph-image",
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
    images: ["/opengraph-image"],
  },
};

const SOFTWARE_APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Online Guitar Metronome",
  url: "https://guitarchords.info/metronome",
  applicationCategory: "MusicApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free online metronome for guitar practice. Tap tempo, adjustable BPM.",
};

const BREADCRUMB_TRAIL = trailFor("Metronome", "/metronome");
const BREADCRUMB_JSON_LD = breadcrumbJsonLd(BREADCRUMB_TRAIL);

export default function MetronomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_APP_JSON_LD) }}
      />
      <Breadcrumb trail={BREADCRUMB_TRAIL} widthClassName="max-w-3xl" />
      <Metronome />
    </>
  );
}
