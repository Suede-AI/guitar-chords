import type { Metadata } from "next";
import { Tuner } from "./Tuner";

export const metadata: Metadata = {
  title: "Free Online Guitar Tuner — Chromatic, No Download",
  description:
    "Free online chromatic guitar tuner. Works in the browser via Web Audio API — no app download, no sign-up. YIN pitch detection, sub-cent accuracy.",
  keywords: [
    "online guitar tuner",
    "free guitar tuner",
    "chromatic guitar tuner",
    "browser guitar tuner",
    "guitar tuner no download",
    "YIN pitch detection",
    "web audio guitar tuner",
    "tune guitar online",
    "guitar pitch detector",
    "chromatic tuner free",
  ],
  alternates: { canonical: "https://guitarchords.info/tuner" },
  openGraph: {
    type: "website",
    title: "Free Online Guitar Tuner — Chromatic, No Download",
    description:
      "Free online chromatic guitar tuner. Works in the browser via Web Audio API — no app download, no sign-up. YIN pitch detection, sub-cent accuracy.",
    url: "https://guitarchords.info/tuner",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "guitarchords.info — free chromatic guitar tuner, no download required",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Guitar Tuner — Chromatic, No Download",
    description:
      "Free online chromatic guitar tuner. Works in the browser via Web Audio API — no app download, no sign-up. YIN pitch detection, sub-cent accuracy.",
    images: ["/opengraph-image"],
  },
};

const SOFTWARE_APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Online Guitar Tuner",
  url: "https://guitarchords.info/tuner",
  applicationCategory: "MusicApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free online chromatic guitar tuner. No download required.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_APP_JSON_LD) }}
      />
      <Tuner />
    </>
  );
}
