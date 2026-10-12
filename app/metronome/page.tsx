import type { Metadata } from "next";
import { Metronome } from "./Metronome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { breadcrumbJsonLd, trailFor } from "@/lib/breadcrumbs";
import { keywordsFor } from "@/lib/keywords";
import { pageTitle, webPageJsonLd } from "@/lib/seo";
import { METRONOME_GUIDE } from "@/lib/tool-guides";

const TITLE = pageTitle("Free Online Metronome: Tap Tempo, BPM, Time Signatures");
const DESCRIPTION =
  "Free online metronome by Suede AI: set 30–280 BPM, tap a tempo and choose beats per bar. Includes a practical guitar rhythm exercise. No sign-up.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: keywordsFor("/metronome"),
  alternates: { canonical: "https://guitarchords.info/metronome" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "https://guitarchords.info/metronome",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "guitarchords.info: free online metronome with tap tempo and BPM control",
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
const PAGE_JSON_LD = webPageJsonLd({
  path: "/metronome",
  name: TITLE,
  description: DESCRIPTION,
  type: "WebPage",
});

export default function MetronomePage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_APP_JSON_LD) }}
      />
      <Breadcrumb trail={BREADCRUMB_TRAIL} widthClassName="max-w-3xl" />
      <Metronome />
      <section className="mx-auto max-w-3xl px-6 py-12" aria-labelledby={METRONOME_GUIDE.id}>
        <h2 id={METRONOME_GUIDE.id} className="text-2xl">{METRONOME_GUIDE.heading}</h2>
        <div className="mt-5 space-y-5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          {METRONOME_GUIDE.blocks.map((block) =>
            block.kind === "h3" ? (
              <h3 key={block.text} className="text-xl">{block.text}</h3>
            ) : (
              <p key={block.text}>{block.text}</p>
            ),
          )}
          <p>Find shapes in the <a href="/chords" className="underline">chord library</a>, check pitches with the <a href="/tuner" className="underline">Suede AI guitar tuner</a>, or explore the <a href="/scales" className="underline">scale trainer</a>.</p>
        </div>
      </section>
    </>
  );
}
