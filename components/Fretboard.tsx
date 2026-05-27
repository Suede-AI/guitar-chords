"use client";

import { pitchClassAt } from "@/lib/music/fretboard";
import { NOTE_NAMES } from "@/lib/music/scales";

interface Props {
  /** Pitch classes that should be highlighted as scale tones. */
  highlightedPcs: Set<number>;
  /** The root pitch class. Drawn in registry cyan (vs. outlined for non-roots). */
  rootPc: number;
  /** Number of frets to render (default 15). */
  frets?: number;
  /** Whether to display the note letter inside each dot. */
  showNoteNames?: boolean;
}

const STRING_LABELS = ["E", "A", "D", "G", "B", "e"] as const;
const NUT_X = 36;
const FRET_W = 56;
const STRING_Y0 = 28;
const STRING_GAP = 22;
const INLAY_FRETS = new Set([3, 5, 7, 9, 15]);

const REGISTRY_CYAN = "#22d3ee";

export function Fretboard({
  highlightedPcs,
  rootPc,
  frets = 15,
  showNoteNames = true,
}: Props) {
  const width = NUT_X + FRET_W * frets + 20;
  const height = STRING_Y0 + STRING_GAP * 5 + 30;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Guitar fretboard"
      style={{
        background: "var(--color-ink-raised)",
        border: "1px solid var(--color-rule-muted)",
        borderRadius: 2,
      }}
    >
      {/* fret-number row */}
      {Array.from({ length: frets }, (_, i) => (
        <text
          key={`fn-${i}`}
          x={NUT_X + FRET_W * (i + 0.5)}
          y={18}
          textAnchor="middle"
          fontSize={11}
          fill="var(--color-text-dim)"
          fontFamily="var(--font-mono)"
        >
          {i + 1}
        </text>
      ))}

      {/* nut */}
      <line
        x1={NUT_X}
        y1={STRING_Y0 - 4}
        x2={NUT_X}
        y2={STRING_Y0 + STRING_GAP * 5 + 4}
        stroke="var(--color-text-muted)"
        strokeWidth={4}
      />

      {/* frets */}
      {Array.from({ length: frets + 1 }, (_, i) => (
        <line
          key={`fret-${i}`}
          x1={NUT_X + FRET_W * i}
          y1={STRING_Y0}
          x2={NUT_X + FRET_W * i}
          y2={STRING_Y0 + STRING_GAP * 5}
          stroke="var(--color-rule)"
          strokeWidth={i === 12 ? 2 : 1}
        />
      ))}

      {/* fret inlays */}
      {[...INLAY_FRETS].map((f) => {
        if (f > frets) return null;
        const cx = NUT_X + FRET_W * (f - 0.5);
        const cy = STRING_Y0 + (STRING_GAP * 5) / 2;
        return (
          <circle
            key={`inlay-${f}`}
            cx={cx}
            cy={cy}
            r={5}
            fill="var(--color-rule-muted)"
          />
        );
      })}
      {/* double inlay at 12 */}
      {frets >= 12 && (
        <>
          <circle
            cx={NUT_X + FRET_W * 11.5}
            cy={STRING_Y0 + STRING_GAP * 1.5}
            r={5}
            fill="var(--color-rule-muted)"
          />
          <circle
            cx={NUT_X + FRET_W * 11.5}
            cy={STRING_Y0 + STRING_GAP * 3.5}
            r={5}
            fill="var(--color-rule-muted)"
          />
        </>
      )}

      {/* strings + labels */}
      {Array.from({ length: 6 }, (_, sIdx) => {
        const yLine = STRING_Y0 + sIdx * STRING_GAP;
        return (
          <g key={`string-${sIdx}`}>
            <text
              x={NUT_X - 12}
              y={yLine + 4}
              textAnchor="end"
              fontSize={11}
              fill="var(--color-text-dim)"
              fontFamily="var(--font-mono)"
            >
              {STRING_LABELS[sIdx]}
            </text>
            <line
              x1={NUT_X}
              y1={yLine}
              x2={NUT_X + FRET_W * frets}
              y2={yLine}
              stroke="var(--color-text-dim)"
              strokeWidth={sIdx < 3 ? 1.6 : 1}
            />
          </g>
        );
      })}

      {/* highlighted notes */}
      {Array.from({ length: 6 }, (_, sIdx) =>
        Array.from({ length: frets + 1 }, (_, f) => {
          const pc = pitchClassAt(sIdx, f);
          if (!highlightedPcs.has(pc)) return null;
          const isRoot = pc === rootPc;
          const cx = f === 0 ? NUT_X - 22 : NUT_X + FRET_W * (f - 0.5);
          const cy = STRING_Y0 + sIdx * STRING_GAP;
          return (
            <g key={`note-${sIdx}-${f}`}>
              <circle
                cx={cx}
                cy={cy}
                r={10}
                fill={isRoot ? REGISTRY_CYAN : "var(--color-ink)"}
                stroke={REGISTRY_CYAN}
                strokeWidth={1.5}
              />
              {showNoteNames && (
                <text
                  x={cx}
                  y={cy + 3.5}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={600}
                  fill={isRoot ? "var(--color-ink)" : "var(--color-text)"}
                  fontFamily="var(--font-mono)"
                >
                  {NOTE_NAMES[pc]}
                </text>
              )}
            </g>
          );
        }),
      )}
    </svg>
  );
}
