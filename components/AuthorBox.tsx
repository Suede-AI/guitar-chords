// Short author box for the notes articles. Links the canonical founder page
// and the personal site; the Person entity itself lives on suedeai.ai.
export function AuthorBox() {
  return (
    <aside
      aria-label="About the author"
      className="terminal-card"
      style={{ padding: "var(--space-6)", display: "grid", gap: "var(--space-2)" }}
    >
      <span className="eyebrow eyebrow--cyan">⊕ About the author</span>
      <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-lg)" }}>
        <a className="link" href="https://suedeai.ai/founder" target="_blank" rel="noopener noreferrer">
          Jason Colapietro
        </a>
      </p>
      <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
        Founder and CEO, Suede AI, West Palm Beach, Florida. Engineer, guitarist and
        author of five books on Amazon. More at{" "}
        <a className="link" href="https://jasoncolapietro.com/" target="_blank" rel="noopener noreferrer">
          jasoncolapietro.com
        </a>{" "}
        and the{" "}
        <a className="link" href="https://seo.suedeai.ai/evidence" target="_blank" rel="noopener noreferrer">
          Suede AI evidence page
        </a>
        .
      </p>
    </aside>
  );
}
