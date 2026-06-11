import type { Metadata } from "next";
import Link from "next/link";

const FULL_ESSAY =
  "https://jasoncolapietro.substack.com/p/fender-is-trying-to-kill-john-mayers";
const FOUNDER_URL = "https://suedeai.ai/founder";
const SUEDE_URL = "https://suedeai.ai";

const TITLE = "The Fender Stratocaster Lawsuit, Explained";
const DESCRIPTION =
  "Fender won a German copyright ruling on the Stratocaster body shape and started sending cease-and-desist letters to S-style builders, including PRS over John Mayer's Silver Sky. What it means for players and builders.";
const CANONICAL = "https://guitarchords.info/fender-stratocaster-lawsuit";
const PUBLISHED = "2026-06-11";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "guitarchords.info",
    publishedTime: PUBLISHED,
    authors: ["Jason Colapietro"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
  author: {
    "@type": "Person",
    name: "Jason Colapietro",
    url: FOUNDER_URL,
    jobTitle: "AI expert and founder of Suede Labs AI",
    sameAs: [FOUNDER_URL, "https://x.com/johnnysuede"],
  },
  publisher: {
    "@type": "Organization",
    name: "Suede Labs",
    url: SUEDE_URL,
  },
  about: [
    "Fender Stratocaster",
    "guitar copyright",
    "PRS Silver Sky",
    "John Mayer",
    "S-style guitars",
  ],
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://guitarchords.info" },
    { "@type": "ListItem", position: 2, name: "The Fender Stratocaster Lawsuit", item: CANONICAL },
  ],
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-mono-eyebrow)",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--color-rights-red)",
};

const h2Style: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-xl)",
  fontWeight: 500,
  lineHeight: 1.1,
  letterSpacing: "-0.01em",
  color: "var(--color-text)",
  marginTop: "var(--space-12)",
  marginBottom: "var(--space-4)",
};

const pStyle: React.CSSProperties = {
  maxWidth: "68ch",
  color: "var(--color-text-muted)",
  fontSize: "var(--text-base)",
  lineHeight: 1.7,
  marginTop: "var(--space-4)",
};

export default function FenderLawsuitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />

      <article
        className="mx-auto max-w-3xl px-6"
        style={{ paddingTop: "var(--space-section)" }}
      >
        <span style={eyebrowStyle}>
          <span aria-hidden>◆</span>&nbsp;&nbsp;Field Note · Guitar Industry
        </span>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            color: "var(--color-text)",
            margin: "var(--space-4) 0 0",
            maxWidth: "18ch",
          }}
        >
          The Fender Stratocaster Lawsuit, Explained
        </h1>

        <p
          style={{
            maxWidth: "62ch",
            color: "var(--color-text-muted)",
            fontSize: "var(--text-lg)",
            lineHeight: 1.5,
            marginTop: "var(--space-4)",
          }}
        >
          Fender won a copyright ruling on the shape Leo drew in 1954, then
          started mailing cease-and-desist letters to the builders who kept it
          alive. One of them landed on John Mayer&rsquo;s guitar.
        </p>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.08em",
            color: "var(--color-text-dim)",
            marginTop: "var(--space-6)",
          }}
        >
          By{" "}
          <a className="link" href={FOUNDER_URL} target="_blank" rel="noopener" style={{ textDecoration: "none" }}>
            Jason Colapietro
          </a>{" "}
          · June 11, 2026
        </p>

        <div style={{ marginTop: "var(--space-8)" }}>
          <hr className="hr-rule" />
        </div>

        <h2 style={h2Style}>What Fender actually won</h2>
        <p style={pStyle}>
          In March 2026, a court in D&uuml;sseldorf ruled that the Stratocaster
          body is not just a trademark but a &ldquo;copyrighted work of applied
          art&rdquo; under German and EU law. The case ran against a Chinese
          manufacturer that never showed up to defend itself, so Fender won by
          default. A judgment against an empty chair, but a real one: it makes
          selling or importing S-style copies across the EU a copyright matter,
          not just a branding dispute.
        </p>
        <p style={pStyle}>
          Fender&rsquo;s law firm treated the ruling as a starting gun and began
          sending letters.
        </p>

        <h2 style={h2Style}>The letters</h2>
        <p style={pStyle}>
          One reached LSL Instruments, a family shop in California that builds
          fewer than 500 guitars a year. The letter asked LSL to stop making
          S-style guitars, hand over sales data, destroy unsold stock, recall
          instruments already sold, and cover Fender&rsquo;s legal fees. LSL
          opened a GoFundMe to pay lawyers and wrote that the shop &ldquo;poses
          no threat to them in any way whatsoever.&rdquo;
        </p>
        <p style={pStyle}>
          Then the campaign reached PRS, and the target was the Silver Sky:
          John Mayer&rsquo;s signature model, confirmed by the Wall Street
          Journal in May 2026. PRS says it disagrees with Fender&rsquo;s
          assessment and intends to defend the guitar.
        </p>

        <h2 style={h2Style}>Why the Silver Sky exists at all</h2>
        <p style={pStyle}>
          Here is the part that turns a legal story into a guitar story. Mayer
          spent the 2000s as the most famous Stratocaster player alive. He
          asked Fender for years to evolve the instrument with him, the feel of
          his early-sixties Strats with the flaws engineered out. He could not
          get it built. &ldquo;I tried to do something like this with
          Fender,&rdquo; he said, &ldquo;but I couldn&rsquo;t create enough
          enthusiasm within the company for my vision.&rdquo;
        </p>
        <p style={pStyle}>
          He left in 2014. Paul Reed Smith picked up the phone, and two years
          later the Silver Sky shipped. The forums called it an overpriced Strat
          clone until players actually held one. The affordable SE version
          topped Reverb&rsquo;s year-end best-seller lists in 2022 and 2023, and
          Guitar World reports the Silver Sky has outsold the Stratocaster in
          recent years. Fender&rsquo;s answer to that scoreboard arrived this
          spring, on legal letterhead.
        </p>

        <h2 style={h2Style}>What it means for players and builders</h2>
        <p style={pStyle}>
          If you own a partscaster or a boutique S-style, nothing on your wall
          changes. The pressure falls on small builders who sell into the EU,
          where importing a close copy now carries copyright risk, not just
          trademark risk. For some shops that is the difference between a
          product line and a closed door.
        </p>
        <p style={pStyle}>
          Worth remembering: in 2009 Fender tried to register the Strat, Tele,
          and P-Bass body shapes as US trademarks and lost, in part because
          builders had copied those shapes in the open for half a century. The
          2026 campaign is an attempt to re-run that fight through a friendlier
          law in a friendlier court.
        </p>

        <h2 style={h2Style}>The bigger question</h2>
        <p style={pStyle}>
          Strip away the guitars and this is a fight about who owns a design,
          who gets to build on it, and what happens when a company reaches for
          lawyers instead of a workbench. That same question is landing on every
          creator right now as AI turns music, art, and identity into things
          that copy themselves. I wrote the full version of that argument, from
          Leo Fender&rsquo;s bench to the economics of AI, in a longer essay.
        </p>

        <p style={{ ...pStyle, marginTop: "var(--space-6)" }}>
          <a className="link" href={FULL_ESSAY} target="_blank" rel="noopener">
            Read the full essay: Fender Is Trying to Kill John Mayer&rsquo;s
            Guitar. AI Companies Are Next. &rarr;
          </a>
        </p>

        <div style={{ marginTop: "var(--space-12)" }}>
          <hr className="hr-rule" />
        </div>

        <p
          style={{
            color: "var(--color-text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.06em",
            lineHeight: 1.7,
            marginTop: "var(--space-6)",
          }}
        >
          Written by{" "}
          <a className="link" href={FOUNDER_URL} target="_blank" rel="noopener" style={{ textDecoration: "none" }}>
            Jason Colapietro
          </a>
          , AI expert and founder of{" "}
          <a className="link" href={SUEDE_URL} target="_blank" rel="noopener" style={{ textDecoration: "none" }}>
            Suede Labs
          </a>
          , who builds tools that help artists secure and own their IP.
          guitarchords.info is a free Suede Labs reference site.
        </p>

        <p style={{ marginTop: "var(--space-8)" }}>
          <Link className="link" href="/" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            &larr; Back to the tools
          </Link>
        </p>
      </article>
    </>
  );
}
