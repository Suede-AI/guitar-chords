import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://guitarchords.info"),
  title: {
    default: "guitarchords.info — Free chords, scales, tuner, metronome",
    template: "%s · guitarchords.info",
  },
  description:
    "A public reference for guitar players. Chord library, scale trainer, in-browser tuner, and metronome. No sign-up. No tracking. A Suede Labs site.",
  applicationName: "guitarchords.info",
  keywords: [
    "guitar chords",
    "chord library",
    "guitar scales",
    "scale trainer",
    "guitar tuner",
    "metronome",
    "free",
    "no sign-up",
  ],
  authors: [{ name: "Suede Labs" }],
  openGraph: {
    type: "website",
    title: "guitarchords.info",
    description:
      "Chord library, scale trainer, tuner, and metronome. Free. No sign-up.",
    siteName: "guitarchords.info",
  },
  twitter: {
    card: "summary_large_image",
    title: "guitarchords.info",
    description:
      "Chord library, scale trainer, tuner, and metronome. Free. No sign-up.",
  },
  robots: { index: true, follow: true },
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
          tracking.
        </span>
        <span>
          A <span style={{ color: "var(--color-rights-red)" }}>Suede</span>{" "}
          Labs project.
        </span>
      </div>
    </footer>
  );
}
