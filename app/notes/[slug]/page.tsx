import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorBox } from "@/components/AuthorBox";
import { Breadcrumb } from "@/components/Breadcrumb";
import { NoteText } from "@/components/NoteText";
import { PracticeLinks } from "@/components/PracticeLinks";
import { breadcrumbJsonLd, nestedTrailFor } from "@/lib/breadcrumbs";
import { keywordsFor } from "@/lib/keywords";
import {
  NOTES,
  NOTES_PATH,
  NOTE_PLACES,
  NOTE_SLUGS,
  getNote,
  notePath,
  noteUrl,
  noteWordCount,
} from "@/lib/notes";
import { JASON_PERSON_ID, SITE_ORIGIN, SUEDE_ORG_ID, WEBSITE_ID } from "@/lib/seo";

type Params = { slug: string };

// One static page per article in lib/notes.ts; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return NOTE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  const url = noteUrl(note.slug);
  return {
    title: { absolute: note.title },
    description: note.description,
    keywords: keywordsFor("/notes/[slug]"),
    alternates: { canonical: url },
    authors: [{ name: "Jason Colapietro", url: "https://suedeai.ai/founder" }],
    openGraph: {
      type: "article",
      title: note.title,
      description: note.description,
      url,
      publishedTime: note.datePublished,
      authors: ["https://suedeai.ai/founder"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: note.headline }],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.description,
      creator: "@johnnysuede",
      images: ["/opengraph-image"],
    },
  };
}

const H2_STYLE = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-xl)",
  margin: "var(--space-4) 0 0",
  letterSpacing: "-0.01em",
} as const;

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const url = noteUrl(note.slug);
  const trail = nestedTrailFor({ name: "Notes", path: NOTES_PATH }, note.headline, notePath(note.slug));
  const jsonLd = breadcrumbJsonLd(trail);
  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: note.headline,
    description: note.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: note.datePublished,
    dateModified: note.datePublished,
    inLanguage: "en",
    wordCount: noteWordCount(note),
    keywords: note.keywords.join(", "),
    image: `${SITE_ORIGIN}/opengraph-image`,
    author: { "@id": JASON_PERSON_ID },
    publisher: { "@id": SUEDE_ORG_ID },
    isPartOf: [{ "@id": `${SITE_ORIGIN}${NOTES_PATH}#blog` }, { "@id": WEBSITE_ID }],
    about: [{ "@id": SUEDE_ORG_ID }, ...NOTE_PLACES],
    spatialCoverage: NOTE_PLACES,
  };
  const others = NOTES.filter((n) => n.slug !== note.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }} />
      <Breadcrumb trail={trail} widthClassName="max-w-3xl" />
      <article
        className="mx-auto max-w-3xl px-6"
        style={{ paddingTop: "var(--space-6)", display: "grid", gap: "var(--space-6)" }}
      >
        <header style={{ display: "grid", gap: "var(--space-3)" }}>
          <span className="eyebrow eyebrow--red">
            <span aria-hidden>◆</span>&nbsp;&nbsp;Notes · West Palm Beach, Florida
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {note.headline}
          </h1>
          <p className="eyebrow" style={{ margin: 0 }}>
            By{" "}
            <a className="link" href="https://suedeai.ai/founder" target="_blank" rel="noopener noreferrer">
              Jason Colapietro
            </a>{" "}
            · <time dateTime={note.datePublished}>{note.datePublished}</time>
          </p>
        </header>
        <div style={{ display: "grid", gap: "var(--space-4)", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
          {note.blocks.map((block, index) => {
            if (block.kind === "h2") {
              return (
                <h2 key={index} style={{ ...H2_STYLE, color: "var(--color-text)" }}>
                  {block.text}
                </h2>
              );
            }
            if (block.kind === "ul") {
              return (
                <ul key={index} style={{ margin: 0, paddingLeft: "1.25rem", display: "grid", gap: "var(--space-2)", listStyle: "square" }}>
                  {block.items.map((item) => (
                    <li key={item}>
                      <NoteText text={item} />
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} style={{ margin: 0 }}>
                <NoteText text={block.text} />
              </p>
            );
          })}
        </div>
        <AuthorBox />
        <nav aria-label="More notes" style={{ display: "grid", gap: "var(--space-3)" }}>
          <span className="eyebrow eyebrow--cyan">⊕ More notes</span>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)", fontSize: "var(--text-sm)" }}>
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={notePath(other.slug)} className="link">
                  {other.headline}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <PracticeLinks />
      </article>
    </>
  );
}
