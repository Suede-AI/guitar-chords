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
  authors: [{ name: "Jason Colapietro", url: "https://github.com/JasonColapietro" }],
  creator: "Jason Colapietro",
  publisher: "Suede Labs AI",
  alternates: { canonical: "https://guitarchords.info" },
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
        url: "/og-image.png",
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
    creator: "@suedeai",
    images: ["/og-image.png"],
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
const SUEDE_FOUNDER_URL = "https://suedeai.ai/jason-colapietro-images";
const SUEDE_X_URL = "https://x.com/AISUEDE";
const FOUNDER_X_URL = "https://x.com/johnnysuede";

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "guitarchords.info",
  url: "https://guitarchords.info",
  inLanguage: "en",
  description:
    "Free guitar chord chart, scale trainer, chromatic tuner, and metronome.",
  creator: {
    "@type": "Person",
    name: "Jason Colapietro",
    url: SUEDE_FOUNDER_URL,
    sameAs: [SUEDE_FOUNDER_URL, FOUNDER_X_URL],
  },
  publisher: {
    "@type": "Organization",
    name: "Suede Labs",
    url: SUEDE_URL,
    sameAs: [SUEDE_URL, SUEDE_X_URL],
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://guitarchords.info/chords?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
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
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
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
            gap: "1.5rem",
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
          </nav>
        </div>

        <hr className="hr-rule" />

        {/* Row 2 — provenance + credit. Light Suede mention with real links. */}
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
              rel="noopener"
              style={{ textDecoration: "none" }}
            >
              Suede
            </a>
            , creator-ownership infrastructure for AI music.
          </span>
          <span>
            A{" "}
            <a
              className="link"
              href={SUEDE_URL}
              target="_blank"
              rel="noopener"
              style={{ textDecoration: "none" }}
            >
              Suede Labs
            </a>
            {" project by "}
            <a
              className="link"
              href={SUEDE_FOUNDER_URL}
              target="_blank"
              rel="noopener"
              style={{ textDecoration: "none" }}
            >
              Jason Colapietro
            </a>
            {" · "}
            <span style={{ color: "var(--color-rights-red)" }}>
              Proof of Creation
            </span>
            {" for the AI era."}
          </span>
        </div>
      </div>
    </footer>
  );
}
