import type { Metadata } from "next";
import Link from "next/link";
import { FINGERINGS } from "@/lib/chords/fingerings";
import { SCALES } from "@/lib/music/scales";

export const metadata: Metadata = {
  title: "Guitar Chords — Free Chord Library, Scales & Tuner",
  description:
    "Free guitar chord chart with fingering diagrams, scale trainer, chromatic tuner, and metronome. No sign-up, no tracking.",
  alternates: { canonical: "https://guitarchords.info" },
};

const TOOLS = [
  {
    href: "/chords",
    code: "01",
    title: "Chord Library",
    sub: `${Object.keys(FINGERINGS).length} fingerings · standard tuning`,
    body: "Open shapes, dominant and major sevenths, sus variants, power chords, and the common barre voicings. Filterable. Searchable.",
    accent: "red" as const,
  },
  {
    href: "/scales",
    code: "02",
    title: "Scale Trainer",
    sub: `${Object.keys(SCALES).length} scales · full fretboard`,
    body: "Pick a root, pick a mode. The entire neck lights up — root in cyan, scale tones outlined. Modes from Ionian to Locrian, plus blues and pentatonics.",
    accent: "cyan" as const,
  },
  {
    href: "/tuner",
    code: "03",
    title: "Chromatic Tuner",
    sub: "Web Audio · YIN detector",
    body: "In-browser. Audio stays on your device. Sub-cent precision via parabolic interpolation on the YIN cumulative-mean-normalized difference.",
    accent: "cyan" as const,
  },
  {
    href: "/metronome",
    code: "04",
    title: "Metronome",
    sub: "Sample-accurate · tap tempo",
    body: "Lookahead scheduler running on the audio thread. Drag the BPM, tap the tempo, or pick a time signature. Downbeat rings higher.",
    accent: "red" as const,
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — editorial broadsheet, NOT a centered card */}
      <section
        className="mx-auto max-w-6xl px-6"
        style={{ paddingTop: "var(--space-section)" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "var(--space-4)",
          }}
        >
          <span className="eyebrow eyebrow--red">
            <span aria-hidden>◆</span>&nbsp;&nbsp;Issue 01 · A public reference
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-hero)",
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            Chords. Scales.{" "}
            <span style={{ color: "var(--color-registry-cyan)" }}>Tuner.</span>{" "}
            Metronome.
          </h1>
          <p
            style={{
              maxWidth: "60ch",
              color: "var(--color-text-muted)",
              fontSize: "var(--text-lg)",
              lineHeight: 1.55,
              marginTop: "var(--space-2)",
            }}
          >
            A public reference for guitar players. Open data, open theory, open
            audio. No accounts. No paywall. No analytics. A small site that
            does four things and doesn&rsquo;t ask anything in return.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6" style={{ marginTop: "var(--space-12)" }}>
        <hr className="hr-rule" />
      </div>

      {/* TOOL DOSSIER — staggered two-column editorial grid */}
      <section
        className="mx-auto max-w-6xl px-6"
        style={{ paddingTop: "var(--space-12)" }}
        aria-label="Tools"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "var(--color-rule-muted)",
            border: "1px solid var(--color-rule-muted)",
          }}
        >
          {TOOLS.map((t, idx) => (
            <ToolTile key={t.href} tool={t} index={idx} />
          ))}
        </div>
      </section>

      {/* MANIFESTO ROW */}
      <section
        className="mx-auto max-w-6xl px-6"
        style={{ paddingTop: "var(--space-section)" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
            gap: "var(--space-8)",
          }}
        >
          <div>
            <span className="eyebrow eyebrow--cyan">⊕ Principles</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-2xl)",
                marginTop: "var(--space-3)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              Plain HTML.<br />Plain rights.
            </h2>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "var(--space-4)",
              color: "var(--color-text-muted)",
              fontSize: "var(--text-base)",
            }}
          >
            <ManifestoItem n="i" body="The tools run on your machine. The tuner and metronome use Web Audio; nothing leaves the page." />
            <ManifestoItem n="ii" body="The chord and scale data are TypeScript files in this repository. Read them, fork them, port them." />
            <ManifestoItem n="iii" body="No sign-up, no email capture, no funnel. A reference works only if you can use it without trading anything." />
          </ul>
        </div>
      </section>

      {/* PROVENANCE — light, contextual Suede credit (honest, not a funnel) */}
      <section
        className="mx-auto max-w-6xl px-6"
        style={{ paddingTop: "var(--space-12)" }}
        aria-label="Provenance"
      >
        <hr className="hr-rule" />
        <p
          style={{
            maxWidth: "72ch",
            marginTop: "var(--space-6)",
            color: "var(--color-text-dim)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.65,
          }}
        >
          <span className="eyebrow eyebrow--red" style={{ marginRight: "0.6rem" }}>
            ◆ Provenance
          </span>
          The chord shapes, scale theory, and pitch-detection engine here are
          ported from{" "}
          <a className="link" href="https://suedeai.ai" target="_blank" rel="noopener">
            Suede
          </a>
          , the creator-ownership layer for AI-era music: proof of creation,
          programmable rights, and royalty routing for registered work. Built and
          maintained by{" "}
          <a
            className="link"
            href="https://suedeai.ai/jason-colapietro-images"
            target="_blank"
            rel="noopener"
          >
            Jason Colapietro
          </a>
          .
        </p>
        <p
          style={{
            marginTop: "var(--space-4)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.06em",
            color: "var(--color-text-dim)",
          }}
        >
          <span className="eyebrow eyebrow--cyan" style={{ marginRight: "0.6rem" }}>
            ⊕ Reading
          </span>
          <a className="link" href="https://guitarhub.org/fender-stratocaster-lawsuit" target="_blank" rel="noopener">
            The Fender Stratocaster lawsuit, explained &rarr;
          </a>
          {" · more on "}
          <a className="link" href="https://guitarhub.org" target="_blank" rel="noopener">
            GuitarHub
          </a>
        </p>
      </section>
    </>
  );
}

function ToolTile({
  tool,
  index,
}: {
  tool: (typeof TOOLS)[number];
  index: number;
}) {
  const accentColor =
    tool.accent === "red"
      ? "var(--color-rights-red)"
      : "var(--color-registry-cyan)";
  return (
    <Link
      href={tool.href}
      className="terminal-card"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        padding: "var(--space-8) var(--space-6)",
        textDecoration: "none",
        position: "relative",
        // staggered visual rhythm
        paddingTop:
          index % 2 === 0
            ? "var(--space-8)"
            : "calc(var(--space-8) + var(--space-3))",
        minHeight: "260px",
        background: "var(--color-ink-raised)",
        borderRadius: 0,
        border: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            letterSpacing: "0.18em",
            color: "var(--color-text-dim)",
          }}
        >
          {tool.code}
        </span>
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            background: accentColor,
            borderRadius: 0,
            transform: "rotate(45deg)",
          }}
        />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)",
          margin: 0,
          color: "var(--color-text)",
          letterSpacing: "-0.01em",
        }}
      >
        {tool.title}
      </h3>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.74rem",
          letterSpacing: "0.10em",
          color: accentColor,
          textTransform: "uppercase",
        }}
      >
        {tool.sub}
      </span>
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: "var(--text-sm)",
          lineHeight: 1.55,
          margin: 0,
          flex: 1,
        }}
      >
        {tool.body}
      </p>
      <span
        style={{
          marginTop: "var(--space-2)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--color-text)",
        }}
      >
        Open →
      </span>
    </Link>
  );
}

function ManifestoItem({ n, body }: { n: string; body: string }) {
  return (
    <li
      style={{
        display: "grid",
        gridTemplateColumns: "3rem 1fr",
        gap: "var(--space-3)",
        borderTop: "1px solid var(--color-rule-muted)",
        paddingTop: "var(--space-3)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          letterSpacing: "0.18em",
          color: "var(--color-rights-red)",
          paddingTop: "0.15rem",
        }}
      >
        {n.toUpperCase()}
      </span>
      <span>{body}</span>
    </li>
  );
}
