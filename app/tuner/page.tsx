import type { Metadata } from "next";
import { Tuner } from "./Tuner";
import { Breadcrumb } from "@/components/Breadcrumb";
import { breadcrumbJsonLd, trailFor } from "@/lib/breadcrumbs";
import { keywordsFor } from "@/lib/keywords";

export const metadata: Metadata = {
  title: "Free Online Guitar Tuner: Chromatic, No Download",
  description:
    "Free online guitar tuner by Suede AI. Tune one string at a time, read sharp or flat cents, and follow the standard tuning guide. No download or sign-up.",
  keywords: keywordsFor("/tuner"),
  alternates: { canonical: "https://guitarchords.info/tuner" },
  openGraph: {
    type: "website",
    title: "Free Online Guitar Tuner: Chromatic, No Download",
    description:
      "Free online guitar tuner by Suede AI. Tune one string at a time, read sharp or flat cents, and follow the standard tuning guide. No download or sign-up.",
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
    title: "Free Online Guitar Tuner: Chromatic, No Download",
    description:
      "Free online guitar tuner by Suede AI. Tune one string at a time, read sharp or flat cents, and follow the standard tuning guide. No download or sign-up.",
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
      <Breadcrumb trail={BREADCRUMB_TRAIL} widthClassName="max-w-4xl" />
      <Tuner />
      <section className="mx-auto max-w-4xl px-6 py-12" aria-labelledby="tuning-guide">
        <h2 id="tuning-guide" className="text-2xl">How to tune a guitar in your browser</h2>
        <div className="mt-5 space-y-5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          <p>Start tuning and allow microphone access. Bring the guitar close enough for the microphone to hear a clear note, mute the other strings, and pluck one open string. Let the pitch settle before adjusting the tuning peg.</p>
          <p>Standard guitar tuning, from the thickest string to the thinnest, is E2, A2, D3, G3, B3, E4. First check that the displayed note is the string’s intended note. Then use the cents reading: a negative value is flat and a positive value is sharp. Make small adjustments and pluck again.</p>
          <h3 className="text-xl">When the reading jumps</h3>
          <p>Reduce background sound and play only one string. A hard attack can make the first instant of a note sharper than its sustained pitch. If the tuner catches an overtone, mute the string and try a gentler pluck. Confirm which peg belongs to the string before turning it; do not keep tightening an unfamiliar string just to chase a changing reading.</p>
          <h3 className="text-xl">Finish with a playing check</h3>
          <p>Recheck all six strings, then play a familiar chord. This chromatic tuner names the pitch it hears, so you can use another tuning when you know the target notes. The microphone analysis runs in the browser. If access is blocked, check the site’s microphone permission and start again.</p>
          <p>Continue with the <a href="/chords" className="underline">guitar chord library</a> or the <a href="/metronome" className="underline">Suede AI online metronome</a> for your next practice exercise.</p>
        </div>
      </section>
    </>
  );
}
