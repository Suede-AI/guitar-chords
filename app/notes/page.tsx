import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { breadcrumbJsonLd, trailFor } from "@/lib/breadcrumbs";
import { keywordsFor } from "@/lib/keywords";
import { NOTES, NOTES_PATH, notePath, noteUrl } from "@/lib/notes";
import { JASON_PERSON_ID, SITE_ORIGIN, SUEDE_ORG_ID, webPageJsonLd } from "@/lib/seo";

const TITLE = "Guitar Notes from Suede AI, West Palm Beach, Florida";
const DESCRIPTION =
  "Notes from Jason Colapietro and Suede AI on building guitarchords.info, practicing guitar in Palm Beach County, and fast, accessible static sites.";
const NOTES_URL = `${SITE_ORIGIN}${NOTES_PATH}`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: keywordsFor("/notes"),
  alternates: { canonical: NOTES_URL },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: NOTES_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "guitarchords.info notes by Suede AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const BREADCRUMB_TRAIL = trailFor("Notes", NOTES_PATH);
const BREADCRUMB_JSON_LD = breadcrumbJsonLd(BREADCRUMB_TRAIL);
const PAGE_JSON_LD = {
  ...webPageJsonLd({ path: NOTES_PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
  mainEntity: {
    "@type": "ItemList",
    itemListElement: NOTES.map((note, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: noteUrl(note.slug),
      name: note.headline,
    })),
  },
};
const BLOG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${NOTES_URL}#blog`,
  name: "guitarchords.info notes",
  url: NOTES_URL,
  author: { "@id": JASON_PERSON_ID },
  publisher: { "@id": SUEDE_ORG_ID },
};

export default function NotesIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_JSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_JSON_LD) }} />
      <Breadcrumb trail={BREADCRUMB_TRAIL} widthClassName="max-w-4xl" />
      <div
        className="mx-auto max-w-4xl px-6"
        style={{ paddingTop: "var(--space-6)", display: "grid", gap: "var(--space-8)" }}
      >
        <header style={{ display: "grid", gap: "var(--space-3)" }}>
          <span className="eyebrow eyebrow--red">
            <span aria-hidden>◆</span>&nbsp;&nbsp;Notes · Suede AI
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Notes on guitar practice, technical SEO and building this site
          </h1>
          <p style={{ color: "var(--color-text-muted)", margin: 0, maxWidth: "62ch" }}>
            Written by Jason Colapietro, founder of{" "}
            <a className="link" href="https://suedeai.agency/" target="_blank" rel="noopener noreferrer">
              Suede AI in West Palm Beach, Florida
            </a>
            . Practical notes for guitarists, and for Palm Beach County businesses
            that want a site built the same way this one is.
          </p>
        </header>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-4)" }}>
          {NOTES.map((note) => (
            <li key={note.slug}>
              <Link
                href={notePath(note.slug)}
                className="terminal-card"
                style={{ display: "grid", gap: "var(--space-2)", padding: "var(--space-6)", textDecoration: "none", color: "inherit" }}
              >
                <span className="eyebrow">{note.datePublished} · Jason Colapietro</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", margin: 0, letterSpacing: "-0.01em" }}>
                  {note.headline}
                </h2>
                <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>{note.dek}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
