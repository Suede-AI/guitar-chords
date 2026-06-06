import type { Metadata } from "next";
import { Tuner } from "./Tuner";

export const metadata: Metadata = {
  title: "Free Online Guitar Tuner — Chromatic, No Download",
  description:
    "Free online chromatic guitar tuner. Works in the browser via Web Audio API — no app download, no sign-up. YIN pitch detection, sub-cent accuracy.",
  alternates: { canonical: "https://guitarchords.info/tuner" },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://guitarchords.info" },
    { "@type": "ListItem", position: 2, name: "Guitar Tuner", item: "https://guitarchords.info/tuner" },
  ],
};

export default function TunerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <Tuner />
    </>
  );
}
