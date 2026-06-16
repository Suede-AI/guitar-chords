"use client";

import { useTuner } from "@/lib/audio/use-tuner";
import { STANDARD_TUNING } from "@/lib/audio/note";
import { SuedeSocialBridge, socialAction } from "@/components/SuedeSocialBridge";

const IN_TUNE_CENTS = 5;
const RIGHTS_RED = "#9f101a";
const REGISTRY_CYAN = "#22d3ee";

export function Tuner() {
  const { state, reading, error, start, stop } = useTuner();

  return (
    <section
      className="mx-auto max-w-4xl px-6"
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
        <span className="eyebrow eyebrow--cyan">⊕ 03 · Chromatic Tuner</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          One mic.{" "}
          <span style={{ color: "var(--color-registry-cyan)" }}>
            Zero servers.
          </span>
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "var(--text-base)",
            margin: 0,
            maxWidth: "60ch",
          }}
        >
          Click below, grant mic access, and pluck a string. Audio is analysed
          locally by a YIN pitch detector and never leaves the page.
        </p>
      </header>

      <div
        className="terminal-card"
        style={{
          padding: "var(--space-8) var(--space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          alignItems: "center",
          minHeight: "320px",
          justifyContent: "center",
        }}
      >
        {state === "idle" && !error && (
          <button type="button" onClick={start} className="btn-primary">
            Start tuning
          </button>
        )}

        {error && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <p style={{ color: "var(--color-text)" }}>{error}</p>
            <p style={{ color: "var(--color-text-dim)", fontSize: "var(--text-sm)" }}>
              Mic permission was denied or unavailable. Check your
              browser&rsquo;s site settings.
            </p>
            <button type="button" onClick={start} className="btn-ghost">
              Try again
            </button>
          </div>
        )}

        {state === "running" && (
          <TunerDisplay reading={reading} onStop={stop} />
        )}
      </div>

      <footer
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3)",
        }}
      >
        <span className="eyebrow">Standard tuning reference</span>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
            gap: "0.5rem",
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontFamily: "var(--font-mono)",
            textAlign: "center",
          }}
        >
          {STANDARD_TUNING.map((s) => (
            <li
              key={s.name}
              style={{
                border: "1px solid var(--color-rule-muted)",
                padding: "0.65rem 0",
                background: "var(--color-ink-raised)",
              }}
            >
              <div style={{ color: "var(--color-text)", fontSize: "var(--text-base)" }}>
                {s.name}
              </div>
              <div
                style={{
                  color: "var(--color-text-dim)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.04em",
                }}
              >
                {s.hz.toFixed(2)} Hz
              </div>
            </li>
          ))}
        </ul>
      </footer>

      <SuedeSocialBridge
        source="tuner"
        eyebrow="After tuning"
        title="Put the guitar behind the note on your profile."
        body="Suede Social profiles are built around real rigs: guitar, pedals, amp, tuning, and the choices that make the sound yours."
        primary={socialAction("/", "Start my rig", "tuner", "start_rig")}
        secondary={socialAction("/roast", "Roast my rig", "tuner", "roast")}
      />
    </section>
  );
}

function TunerDisplay({
  reading,
  onStop,
}: {
  reading: ReturnType<typeof useTuner>["reading"];
  onStop: () => void;
}) {
  const cents = reading?.cents ?? 0;
  const inTune = !!reading && Math.abs(cents) <= IN_TUNE_CENTS;
  const noteColor = !reading
    ? "var(--color-text-dim)"
    : inTune
      ? REGISTRY_CYAN
      : "var(--color-text)";
  const needlePct = Math.max(0, Math.min(100, ((cents + 50) / 100) * 100));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-8)",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          minHeight: "8rem",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 12vw, 8rem)",
            lineHeight: 1,
            color: noteColor,
            transition: "color var(--duration-fast) var(--ease-out-cubic)",
          }}
        >
          {reading?.name ?? "—"}
        </div>
        {reading && (
          <div
            style={{
              color: "var(--color-text-dim)",
              fontSize: "var(--text-sm)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {reading.fullName} · {reading.smoothedHz.toFixed(1)} Hz
          </div>
        )}
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "32rem",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "12px",
            borderRadius: 2,
            background: "var(--color-ink)",
            border: "1px solid var(--color-rule-muted)",
          }}
        >
          {/* in-tune zone */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              background: "var(--color-registry-cyan-soft)",
              left: `${((-IN_TUNE_CENTS + 50) / 100) * 100}%`,
              right: `${100 - ((IN_TUNE_CENTS + 50) / 100) * 100}%`,
            }}
          />
          {/* center marker */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "var(--color-text-dim)",
              left: "50%",
            }}
          />
          {/* needle */}
          {reading && (
            <div
              style={{
                position: "absolute",
                top: "-6px",
                bottom: "-6px",
                width: "4px",
                borderRadius: 2,
                background: inTune ? REGISTRY_CYAN : RIGHTS_RED,
                left: `calc(${needlePct}% - 2px)`,
                transition: "left var(--duration-fast) var(--ease-out-cubic)",
              }}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.72rem",
            color: "var(--color-text-dim)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.08em",
          }}
        >
          <span>-50¢</span>
          <span style={{ color: inTune ? REGISTRY_CYAN : undefined }}>
            {reading ? `${cents > 0 ? "+" : ""}${cents}¢` : "—"}
          </span>
          <span>+50¢</span>
        </div>
      </div>

      <button type="button" onClick={onStop} className="btn-ghost">
        Stop
      </button>
    </div>
  );
}
