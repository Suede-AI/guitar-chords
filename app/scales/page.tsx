import type { Metadata } from "next";
import { ScaleTrainer } from "./ScaleTrainer";

export const metadata: Metadata = {
  title: "Guitar Scales Chart — All Keys & Modes",
  description:
    "Interactive guitar scale chart for all 12 keys. Major, minor, pentatonics, blues, and all 7 modes. Full neck visualization. Free, no sign-up.",
  alternates: { canonical: "https://guitarchords.info/scales" },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://guitarchords.info" },
    { "@type": "ListItem", position: 2, name: "Guitar Scales", item: "https://guitarchords.info/scales" },
  ],
};

export default function ScalesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <ScaleTrainer />
    </>
  );
}
