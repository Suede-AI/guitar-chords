"use client";

import { useMemo, useState } from "react";
import {
  FINGERINGS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type ChordCategory,
} from "@/lib/chords/fingerings";
import { ChordDiagram } from "@/components/ChordDiagram";

export function ChordLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ChordCategory | "all">("all");

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.entries(FINGERINGS)
      .filter(([name, f]) => {
        if (category !== "all" && f.category !== category) return false;
        if (q && !name.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => {
        const ai = CATEGORY_ORDER.indexOf(a[1].category);
        const bi = CATEGORY_ORDER.indexOf(b[1].category);
        if (ai !== bi) return ai - bi;
        return a[0].localeCompare(b[0]);
      });
  }, [query, category]);

  return (
    <section
      className="mx-auto max-w-6xl px-6"
      style={{
        paddingTop: "var(--space-section)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-8)",
      }}
    >
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: "var(--space-3)",
        }}
      >
        <span className="eyebrow eyebrow--red">
          <span aria-hidden>◆</span>&nbsp;&nbsp;01 · Chord Library
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Guitar Chord Chart
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "var(--text-base)",
            margin: 0,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.08em",
          }}
        >
          {Object.keys(FINGERINGS).length} fingerings · Standard tuning (EADGBE)
        </p>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "var(--text-base)",
            margin: 0,
            maxWidth: "60ch",
          }}
        >
          The shapes a player actually reaches for. Filter by category, search
          by name. Diagrams render in SVG — readable at any zoom.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search · e.g. C, Em, Dsus4, Bm7"
          aria-label="Search chords"
          className="field"
        />
        <ul
          role="tablist"
          aria-label="Chord category"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <FilterPill
            label="All"
            count={Object.keys(FINGERINGS).length}
            active={category === "all"}
            onClick={() => setCategory("all")}
          />
          {CATEGORY_ORDER.map((c) => {
            const count = Object.values(FINGERINGS).filter(
              (f) => f.category === c,
            ).length;
            return (
              <FilterPill
                key={c}
                label={CATEGORY_LABELS[c]}
                count={count}
                active={category === c}
                onClick={() => setCategory(c)}
              />
            );
          })}
        </ul>
      </div>

      {entries.length === 0 ? (
        <p style={{ color: "var(--color-text-dim)" }}>
          No chords match. Try a different filter.
        </p>
      ) : (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "var(--space-3)",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {entries.map(([name]) => (
            <li key={name} style={{ display: "flex" }}>
              <ChordDiagram chord={name} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        role="tab"
        aria-selected={active}
        className="pill"
      >
        <span>{label}</span>
        <span style={{ color: "var(--color-text-dim)" }}>{count}</span>
      </button>
    </li>
  );
}
