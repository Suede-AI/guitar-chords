import Link from "next/link";

// Sitewide "Built by Suede AI" block, rendered inside the root layout footer.
// Contextual links to the main Suede AI pages and a few sibling guitar and
// AI-readiness sites, kept short on purpose.
const MAIN_LINKS = [
  { href: "https://suedeai.agency/", label: "Suede AI web, SEO and GEO practice in West Palm Beach" },
  { href: "https://suedeai.ai/", label: "Suede AI agentic platforms" },
  { href: "https://suedeai.ai/founder", label: "Jason Colapietro, founder" },
  { href: "https://jasoncolapietro.com/", label: "jasoncolapietro.com" },
  { href: "https://jupitersocialfl.com/", label: "Jupiter Social, Jupiter FL magazine" },
] as const;

const SIBLINGS = [
  { href: "https://guitarhub.org/", label: "GuitarHub" },
  { href: "https://guitar.services/", label: "guitar.services" },
  { href: "https://dna.suedeai.ai/", label: "Signal-chain archive" },
  { href: "https://signal.suedeai.ai/", label: "Suede Signal" },
  { href: "https://optimize.suedeai.ai/", label: "Suede Scan" },
] as const;

const ROW_STYLE = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.4rem 1rem",
  margin: 0,
  padding: 0,
  listStyle: "none",
} as const;

export function SuedeNetworkFooter() {
  return (
    <section
      aria-label="Built by Suede AI"
      style={{
        display: "grid",
        gap: "var(--space-3)",
        color: "var(--color-text-dim)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.78rem",
        letterSpacing: "0.08em",
      }}
    >
      <p style={{ margin: 0 }}>
        <span className="eyebrow eyebrow--red" style={{ marginRight: "0.6rem" }}>
          ◆ Built by Suede AI in West Palm Beach, Florida
        </span>
        Web development, technical SEO and AI search visibility for businesses in
        West Palm Beach, Jupiter and Palm Beach County. Read the{" "}
        <Link href="/notes" className="link" style={{ textDecoration: "none" }}>
          notes
        </Link>{" "}
        on how this site is built.
      </p>
      <ul style={ROW_STYLE} aria-label="Suede AI">
        {MAIN_LINKS.map((link) => (
          <li key={link.href}>
            <a className="link" href={link.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <ul style={ROW_STYLE} aria-label="More from Suede AI">
        <li>More from Suede AI:</li>
        {SIBLINGS.map((link) => (
          <li key={link.href}>
            <a className="link" href={link.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
