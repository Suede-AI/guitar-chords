import type { Metadata } from "next";
import { ScaleTrainer } from "./ScaleTrainer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { breadcrumbJsonLd, trailFor } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "Guitar Scales Chart: All Keys & Modes",
  description:
    "Interactive guitar scale chart for all 12 keys. Major, minor, pentatonics, blues, and all 7 modes. Full neck visualization. Free, no sign-up.",
  keywords: [
    "guitar scales chart",
    "guitar modes",
    "pentatonic scale guitar",
    "blues scale guitar",
    "major scale guitar",
    "minor scale guitar",
    "guitar fretboard scale",
    "Ionian Dorian Phrygian guitar",
    "guitar scale trainer",
    "free guitar scales",
  ],
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
    </>
  );
}
