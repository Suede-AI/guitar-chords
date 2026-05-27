import { FINGERINGS, type Fingering } from "@/lib/chords/fingerings";

const REGISTRY_CYAN = "#22d3ee";
const RIGHTS_RED = "#9f101a";

export function ChordDiagram({ chord }: { chord: string }) {
  const fingering = FINGERINGS[chord] as Fingering | undefined;
  return (
    <figure
      className="terminal-card"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem",
        width: "100%",
      }}
    >
      <figcaption
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.35rem",
          color: "var(--color-text)",
          letterSpacing: "0.02em",
        }}
      >
        {chord}
      </figcaption>
      {fingering ? (
        <FingeringGrid fingering={fingering} chord={chord} />
      ) : (
        <span style={{ fontSize: "0.75rem", color: "var(--color-text-dim)" }}>
          No diagram
        </span>
      )}
      <CapoRow fingering={fingering} />
    </figure>
  );
}

function FingeringGrid({ fingering, chord }: { fingering: Fingering; chord: string }) {
  const numericFrets = fingering.frets.filter(
    (f): f is number => typeof f === "number" && f > 0,
  );
  const minFret = numericFrets.length > 0 ? Math.min(...numericFrets) : 1;
  const maxFret = numericFrets.length > 0 ? Math.max(...numericFrets) : 0;
  const fretsAboveStart = Math.max(4, maxFret - (minFret > 1 ? minFret - 1 : 0));
  const fretCount = Math.max(4, fretsAboveStart);
  const startFret = minFret > 1 ? minFret : 1;

  const W = 96;
  const H = 110;
  const padX = 10;
  const padTop = 18;
  const padBottom = 12;
  const stringSpacing = (W - padX * 2) / 5;
  const fretSpacing = (H - padTop - padBottom) / fretCount;

  return (
    <svg
      width="100%"
      height="110"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`${chord} guitar chord fingering diagram`}
      style={{ maxWidth: "120px" }}
    >
      {/* strings (6 vertical lines, low-E on the left) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={`str-${i}`}
          x1={padX + i * stringSpacing}
          y1={padTop}
          x2={padX + i * stringSpacing}
          y2={H - padBottom}
          stroke="var(--color-text-dim)"
          strokeWidth={0.8}
        />
      ))}
      {/* frets */}
      {Array.from({ length: fretCount + 1 }).map((_, i) => (
        <line
          key={`fret-${i}`}
          x1={padX}
          y1={padTop + i * fretSpacing}
          x2={W - padX}
          y2={padTop + i * fretSpacing}
          stroke="var(--color-rule)"
          strokeWidth={i === 0 && startFret === 1 ? 2.5 : 0.8}
        />
      ))}

      {/* mute / open indicators above the nut */}
      {fingering.frets.map((f, i) => {
        const cx = padX + i * stringSpacing;
        if (f === "x") {
          return (
            <text
              key={`mute-${i}`}
              x={cx}
              y={padTop - 5}
              textAnchor="middle"
              fontSize={8}
              fill="var(--color-text-dim)"
              fontFamily="var(--font-mono)"
            >
              ×
            </text>
          );
        }
        if (f === 0) {
          return (
            <circle
              key={`open-${i}`}
              cx={cx}
              cy={padTop - 6}
              r={2.5}
              fill="none"
              stroke={REGISTRY_CYAN}
              strokeWidth={0.8}
            />
          );
        }
        return null;
      })}

      {/* fret position label for non-open shapes */}
      {startFret > 1 && (
        <text
          x={padX - 2}
          y={padTop + fretSpacing * 0.7}
          textAnchor="end"
          fontSize={7}
          fill="var(--color-text-dim)"
          fontFamily="var(--font-mono)"
          letterSpacing="0.08em"
        >
          {startFret}fr
        </text>
      )}

      {/* finger dots */}
      {fingering.frets.map((f, i) => {
        if (f === "x" || f === null || f === 0) return null;
        const cx = padX + i * stringSpacing;
        const relFret = f - startFret + 1;
        if (relFret <= 0 || relFret > fretCount) return null;
        const cy = padTop + (relFret - 0.5) * fretSpacing;
        return (
          <circle key={`dot-${i}`} cx={cx} cy={cy} r={3.2} fill={RIGHTS_RED} />
        );
      })}
    </svg>
  );
}

function CapoRow({ fingering }: { fingering: Fingering | undefined }) {
  if (!fingering) return null;
  const strings = ["E", "A", "D", "G", "B", "e"];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "0.25rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        letterSpacing: "0.04em",
        color: "var(--color-text-dim)",
        width: "100%",
        textAlign: "center",
      }}
      aria-hidden
    >
      {fingering.frets.map((f, i) => (
        <span key={`label-${i}`}>
          <span style={{ color: "var(--color-text-muted)" }}>{strings[i]}</span>
          <br />
          <span>{f === "x" ? "×" : f === 0 ? "0" : f}</span>
        </span>
      ))}
    </div>
  );
}
