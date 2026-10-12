import type { Metadata } from "next";
import { Metronome } from "./Metronome";
import { Breadcrumb } from "@/components/Breadcrumb";
import { breadcrumbJsonLd, trailFor } from "@/lib/breadcrumbs";
import { keywordsFor } from "@/lib/keywords";

export const metadata: Metadata = {
  title: "Free Online Metronome: Tap Tempo, BPM, Time Signatures",
  description:
    "Free online metronome by Suede AI: set 30–280 BPM, tap a tempo and choose beats per bar. Includes a practical guitar rhythm exercise. No sign-up.",
  keywords: keywordsFor("/metronome"),
  alternates: { canonical: "https://guitarchords.info/metronome" },
  openGraph: {
    type: "website",
    title: "Free Online Metronome: Tap Tempo, BPM, Time Signatures",
    description:
      "Free online metronome by Suede AI: set 30–280 BPM, tap a tempo and choose beats per bar. Includes a practical guitar rhythm exercise. No sign-up.",
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
    title: "Free Online Metronome: Tap Tempo, BPM, Time Signatures",
    description:
      "Free online metronome by Suede AI: set 30–280 BPM, tap a tempo and choose beats per bar. Includes a practical guitar rhythm exercise. No sign-up.",
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
      <section className="mx-auto max-w-3xl px-6 py-12" aria-labelledby="rhythm-guide">
        <h2 id="rhythm-guide" className="text-2xl">Practice guitar rhythm with the online metronome</h2>
        <div className="mt-5 space-y-5 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          <p>Set the tempo with the slider or plus and minus controls, then press Start. The range is 30–280 beats per minute. Choose 2, 3, 4 or 6 beats per bar; the higher click marks the first beat. Use Tap several times with a song to estimate its pulse, then adjust the result by ear.</p>
          <h3 className="text-xl">A short chord-change exercise</h3>
          <p>Choose two chords you already know and begin at a comfortable tempo, such as 60 BPM. Count four beats aloud and play one downstroke per beat. Change chords at the start of each bar. Keep the click running while you notice whether your hand arrives before, on or after the first beat.</p>
          <p>When several changes feel controlled, raise the tempo a little. If the rhythm becomes uneven, return to a slower setting and isolate the transition. Record the chord pair and tempo so your next session starts from a clear reference. The exercise is about consistent movement and sound, not reaching the largest BPM number.</p>
          <h3 className="text-xl">Hear the spaces between clicks</h3>
          <p>For eighth notes, count “one and two and three and four and” while keeping one click per numbered beat. Play the offbeats evenly between clicks. If you lose the pulse, return to quarter notes and rebuild the pattern. Check that your device volume is audible before increasing it, and press Stop when finished.</p>
          <p>Find shapes in the <a href="/chords" className="underline">chord library</a>, check pitches with the <a href="/tuner" className="underline">Suede AI guitar tuner</a>, or explore the <a href="/scales" className="underline">scale trainer</a>.</p>
        </div>
      </section>
    </>
  );
}
