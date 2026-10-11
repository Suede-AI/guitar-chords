import Link from "next/link";

// Shared footer block for the chord and scale reference pages: the four tools
// on this site, plus the two guitar sites the home page already points to.
const STRUMLY_URL = "https://strumly.suedeai.ai";
const GUITARHUB_URL = "https://guitarhub.org";

const TOOLS = [
  { href: "/chords", label: "Guitar chord chart", note: "the full chord library" },
  { href: "/scales", label: "Scale trainer", note: "any root, any scale, the whole neck" },
  { href: "/tuner", label: "Chromatic tuner", note: "tune up in the browser" },
  { href: "/metronome", label: "Metronome", note: "practice the change in time" },
] as const;

export function PracticeLinks() {
  return (
    <nav
      aria-label="Keep practicing"
      style={{
        display: "grid",
        gap: "var(--space-4)",
        borderTop: "1px solid var(--color-rule-muted)",
        paddingTop: "var(--space-6)",
      }}
    >
      <span className="eyebrow eyebrow--cyan">⊕ Keep practicing</span>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "var(--space-3)",
          fontSize: "var(--text-sm)",
          color: "var(--color-text-muted)",
        }}
      >
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <Link href={tool.href} className="link">
              {tool.label}
            </Link>
            {`: ${tool.note}`}
          </li>
        ))}
        <li>
          <a className="link" href={STRUMLY_URL} target="_blank" rel="noopener noreferrer">
            Strumly
          </a>
          {": AI guitar coach with real-time chord feedback and practice drills"}
        </li>
        <li>
          <a className="link" href={GUITARHUB_URL} target="_blank" rel="noopener noreferrer">
            GuitarHub
          </a>
          {": guitar lessons and practice tools"}
        </li>
      </ul>
    </nav>
  );
}
