"use client";

import { useMemo, useState } from "react";
import {
  NOTE_NAMES,
  SCALES,
  SCALE_ORDER,
  buildScale,
  noteNameToPitchClass,
  type Note,
} from "@/lib/music/scales";
import { Fretboard } from "@/components/Fretboard";

export function ScaleTrainer() {
  const [root, setRoot] = useState<Note>("A");
  const [scaleId, setScaleId] = useState<keyof typeof SCALES>("pentatonicMinor");
  const [showNoteNames, setShowNoteNames] = useState(true);

  const rootPc = noteNameToPitchClass(root);
  const scale = SCALES[scaleId];
  const highlighted = useMemo(
    () => buildScale(rootPc, scaleId),
    [rootPc, scaleId],
  );

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
        <span className="eyebrow eyebrow--cyan">⊕ 02 · Scale Trainer</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          A root.{" "}
          <span style={{ color: "var(--color-registry-cyan)" }}>A mode.</span>{" "}
          The whole neck.
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "var(--text-base)",
            margin: 0,
            maxWidth: "62ch",
          }}
        >
          Pick a key and a scale. The fretboard highlights the root in cyan and
          outlines every scale tone across the neck.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: "var(--space-6)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <span className="eyebrow">Root</span>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              gap: "0.25rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {NOTE_NAMES.map((n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => setRoot(n)}
                  aria-pressed={root === n}
                  className="pill"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "0.45rem 0",
                  }}
                >
                  {n}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          <span className="eyebrow">Scale</span>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {SCALE_ORDER.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setScaleId(id)}
                  aria-pressed={scaleId === id}
                  className="pill"
                >
                  {SCALES[id].name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "var(--space-2)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-xl)",
              margin: 0,
            }}
          >
            {root}{" "}
            <span style={{ color: "var(--color-registry-cyan)" }}>
              {scale.name}
            </span>
          </h2>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.10em",
              color: "var(--color-text-muted)",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={showNoteNames}
              onChange={(e) => setShowNoteNames(e.target.checked)}
              style={{ accentColor: "var(--color-registry-cyan)" }}
            />
            Show note names
          </label>
        </div>
        <p
          style={{
            color: "var(--color-text-dim)",
            fontSize: "var(--text-sm)",
            margin: 0,
            maxWidth: "70ch",
          }}
        >
          {scale.description}
        </p>
        <div style={{ overflowX: "auto" }}>
          <Fretboard
            highlightedPcs={highlighted}
            rootPc={rootPc}
            showNoteNames={showNoteNames}
          />
        </div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--color-text-dim)",
            letterSpacing: "0.08em",
          }}
        >
          Root in solid cyan · scale tones outlined.
        </p>
      </div>
    </section>
  );
}
