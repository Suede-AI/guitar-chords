import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://guitarchords.info"),
  title: {
    default: "Guitar Chords — Free Chord Library, Scales & Tuner | guitarchords.info",
    template: "%s | guitarchords.info",
  },
  description:
    "Free guitar chord chart with fingering diagrams, scale trainer, chromatic tuner, and metronome. No sign-up, no tracking. A Suede Labs reference site.",
  keywords: [
    "guitar chords",
    "guitar chord chart",
    "guitar fingering diagrams",
    "guitar scales",
    "guitar scale trainer",
    "online guitar tuner",
    "chromatic tuner",
    "online metronome",
    "free guitar tools",
    "barre chords",
    "open chords",
    "guitar modes",
    "pentatonic scale guitar",
    "tap tempo metronome",
    "Suede Labs",
  ],
  applicationName: "guitarchords.info",
  authors: [{ name: "Jason Colapietro", url: "https://suedeai.ai/founder" }],
  creator: "Jason Colapietro",
  publisher: "Suede Labs AI",
  alternates: { canonical: "https://guitarchords.info" },
  verification: { google: "clfDRrM2Zm6t8oKxvMRL-dDL-TSAFjnIEtdDp0N1Mi0" },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Guitar Chords — Free Chord Library, Scales & Tuner",
    description:
      "Free chord chart, scale trainer, chromatic tuner, and metronome. No sign-up.",
    siteName: "guitarchords.info",
    url: "https://guitarchords.info",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "guitarchords.info — free chord library, scale trainer, tuner, and metronome",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guitar Chords — Free Chord Library, Scales & Tuner",
    description:
      "Free chord chart, scale trainer, chromatic tuner, and metronome. No sign-up.",
    creator: "@johnnysuede",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const SUEDE_URL = "https://suedeai.ai";
const SUEDE_FOUNDER_URL = "https://suedeai.ai/founder";
const SOCIAL_URL =
  "https://social.suedeai.ai/?utm_source=guitarchords.info&utm_medium=site_nav&utm_campaign=guitar_tools_to_social&utm_content=global_nav";
const SIGNAL_CHAIN_URL = "https://guitar.solutions";

// Canonical @ids mirror suedeai.ai/#organization and suedeai.ai/founder#person
// so crawlers merge guitarchords.info entities into the shared Suede graph.
const SUEDE_ORG_ID = "https://suedeai.ai/#organization";
const JASON_PERSON_ID = "https://suedeai.ai/founder#person";

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://guitarchords.info/#website",
      name: "guitarchords.info",
      url: "https://guitarchords.info",
      inLanguage: "en",
      description: "Free guitar chord chart, scale trainer, chromatic tuner, and metronome.",
      creator: { "@id": JASON_PERSON_ID },
      publisher: { "@id": SUEDE_ORG_ID },
    },
    {
      "@type": "Organization",
      "@id": SUEDE_ORG_ID,
      name: "Suede Labs AI",
      url: SUEDE_URL,
    },
    {
      "@type": "Person",
      "@id": JASON_PERSON_ID,
      name: "Jason Colapietro",
      alternateName: "Johnny Suede",
      url: SUEDE_FOUNDER_URL,
    },
    // The graph identified who publishes the site but never what it does. There
    // was no application node, no feature list, and no price — even though
    // "free", "no sign-up" and "no paywall" are the whole pitch and appear in the
    // meta description. This site competes for high-intent generic queries
    // ("free guitar chord chart"), which is exactly the shape a
    // SoftwareApplication with a zero-price Offer describes.
    {
      "@type": "SoftwareApplication",
      "@id": "https://guitarchords.info/#app",
      name: "Guitar Chords",
      url: "https://guitarchords.info",
      applicationCategory: "MusicApplication",
      operatingSystem: "Web Browser",
      browserRequirements:
        "Requires JavaScript; the tuner also needs microphone access",
      isPartOf: { "@id": "https://guitarchords.info/#website" },
      publisher: { "@id": SUEDE_ORG_ID },
      featureList: [
        "Chord library with fingering diagrams",
        "Scale trainer across the full fretboard",
        "Chromatic tuner (Web Audio, YIN detector)",
        "Metronome with tap tempo",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description:
          "Free to use. No account, no paywall, and no analytics.",
      },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#050b16",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE_JSON_LD),
          }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--color-rule-muted)",
        background:
          "linear-gradient(to bottom, var(--color-ink), transparent)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="guitarchords.info"
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: "0.6rem",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-rights-red)",
            }}
          >
            guitarchords
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-text-dim)",
            }}
          >
            .info
          </span>
        </Link>
        <nav
          aria-label="Primary"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            gap: "0.65rem 1rem",
            minWidth: 0,
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          <Link href="/chords" className="link" style={{ textDecoration: "none" }}>
            Chords
          </Link>
          <Link href="/scales" className="link" style={{ textDecoration: "none" }}>
            Scales
          </Link>
          <Link href="/tuner" className="link" style={{ textDecoration: "none" }}>
            Tuner
          </Link>
          <Link href="/metronome" className="link" style={{ textDecoration: "none" }}>
            Metronome
          </Link>
          <a href={SOCIAL_URL} className="link" style={{ textDecoration: "none" }}>
            Suede Social
          </a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer
      style={{
        marginTop: "var(--space-section)",
        borderTop: "1px solid var(--color-rule-muted)",
      }}
    >
      <div
        className="mx-auto max-w-6xl px-6 py-10"
        style={{ display: "grid", gap: "var(--space-6)" }}
      >
        {/* Row 1 — promise + site links */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            color: "var(--color-text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            letterSpacing: "0.10em",
          }}
        >
          <span>
            guitarchords.info — a public reference site. No accounts, no
            tracking, no paywall.
          </span>
          <nav
            aria-label="Site links"
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <Link href="/chords" className="link" style={{ textDecoration: "none" }}>
              Guitar Chord Chart
            </Link>
            <Link href="/scales" className="link" style={{ textDecoration: "none" }}>
              Scale Trainer
            </Link>
            <Link href="/tuner" className="link" style={{ textDecoration: "none" }}>
              Guitar Tuner
            </Link>
            <Link href="/metronome" className="link" style={{ textDecoration: "none" }}>
              Metronome
            </Link>
            <a href={SOCIAL_URL} className="link" style={{ textDecoration: "none" }}>
              Join Suede Social
            </a>
          </nav>
        </div>

        <hr className="hr-rule" />

        {/* Row 2 — source + credit. Light Suede mention with real links. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem 1.25rem",
            justifyContent: "space-between",
            alignItems: "baseline",
            color: "var(--color-text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
          }}
        >
          <span>
            Chord, scale, and pitch engine ported from{" "}
            <a
              className="link"
              href={SUEDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              Suede
            </a>
            , publisher of this public guitar reference.
          </span>
          <span>
            A{" "}
            <a
              className="link"
              href={SUEDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              Suede Labs
            </a>
            {" project by "}
            <a
              className="link"
              href={SUEDE_FOUNDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              Jason Colapietro
            </a>
            {" · "}
            <a
              className="link"
              href={SIGNAL_CHAIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              The Signal Chain
            </a>
            {" at guitar.solutions."}
          </span>
        </div>
      </div>
    </footer>
  );
}
