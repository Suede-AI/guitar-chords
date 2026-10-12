import type { Metadata } from "next";
import { Tuner } from "./Tuner";
import { Breadcrumb } from "@/components/Breadcrumb";
import { breadcrumbJsonLd, trailFor } from "@/lib/breadcrumbs";
import { keywordsFor } from "@/lib/keywords";
import { pageTitle, webPageJsonLd } from "@/lib/seo";
import { TUNER_GUIDE } from "@/lib/tool-guides";

const TITLE = pageTitle("Free Online Guitar Tuner: Chromatic, No Download");
const DESCRIPTION =
  "Free online guitar tuner by Suede AI. Tune one string at a time, read sharp or flat cents, and follow the standard tuning guide. No download or sign-up.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: keywordsFor("/tuner"),
  alternates: { canonical: "https://guitarchords.info/tuner" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "https://guitarchords.info/tuner",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "guitarchords.info: free chromatic guitar tuner, no download required",
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
  name: "Free Online Guitar Tuner",
  url: "https://guitarchords.info/tuner",
  applicationCategory: "MusicApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Free online chromatic guitar tuner. No download required.",
};

const BREADCRUMB_TRAIL = trailFor("Guitar Tuner", "/tuner");
const BREADCRUMB_JSON_LD = breadcrumbJsonLd(BREADCRUMB_TRAIL);
const PAGE_JSON_LD = webPageJsonLd({
  path: "/tuner",
  name: TITLE,
  description: DESCRIPTION,
  type: "WebPage",
});

export default function TunerPage() {
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
      <Breadcrumb trail={BREADCRUMB_TRAIL} widthClassName="max-w-4xl" />
      <Tuner />
      <section className="mx-auto max-w-4xl px-6 py-12" aria-labelledby={TUNER_GUIDE.id}>
        <h2 id={TUNER_GUIDE.id} className="text-2xl">{TUNER_GUIDE.heading}</h2>
        <div className="mt-5 space-y-5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          {TUNER_GUIDE.blocks.map((block) =>
            block.kind === "h3" ? (
              <h3 key={block.text} className="text-xl">{block.text}</h3>
            ) : (
              <p key={block.text}>{block.text}</p>
            ),
          )}
          <p>Continue with the <a href="/chords" className="underline">guitar chord library</a> or the <a href="/metronome" className="underline">Suede AI online metronome</a> for your next practice exercise.</p>
        </div>
      </section>
    </>
  );
}
