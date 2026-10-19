import type { Metadata } from "next";
import Link from "next/link";

/**
 * The 404 page, for unmatched URLs and for `notFound()` in the chord and scale
 * routes.
 *
 * Its metadata is its own. Without this file a missing page inherited the root
 * layout's home-page title, description, canonical (https://guitarchords.info)
 * and `index, follow` robots and googlebot tags, next to the `noindex` Next adds
 * to every 404: two contradictory robots tags and a canonical claiming the
 * broken URL is the home page.
 *
 * - `robots: null` clears the layout's robots and googlebot tags, leaving the
 *   single `noindex` Next adds to 404 responses.
 * - `alternates.canonical: null`: a missing page has no canonical address.
 * - `openGraph` without `url`, so a shared broken link does not unfurl as the
 *   home page.
 */
const TITLE = "Page not found | guitarchords.info";
const DESCRIPTION = "This page does not exist on guitarchords.info.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: null,
  alternates: { canonical: null },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "guitarchords.info",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const NEXT_STEPS = [
  { href: "/chords", label: "Guitar chord chart" },
  { href: "/scales", label: "Scale trainer" },
  { href: "/tuner", label: "Chromatic tuner" },
  { href: "/metronome", label: "Metronome" },
] as const;

export default function NotFound() {
  return (
    <article
      className="mx-auto max-w-3xl px-6"
      style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)", display: "grid", gap: "var(--space-4)" }}
    >
      <span className="eyebrow eyebrow--red">404</span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", margin: 0 }}>
        Page not found
      </h1>
      <p style={{ margin: 0, color: "var(--color-text-muted)", maxWidth: "62ch" }}>
        The address may be mistyped, or the page has moved. Pick up from one of
        the tools instead.
      </p>
      <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "grid", gap: "var(--space-2)" }}>
        {NEXT_STEPS.map((step) => (
          <li key={step.href}>
            <Link href={step.href} className="link">
              {step.label}
            </Link>
          </li>
        ))}
      </ul>
      <p style={{ margin: 0 }}>
        <Link href="/" className="link">
          Go to the home page
        </Link>
      </p>
    </article>
  );
}
