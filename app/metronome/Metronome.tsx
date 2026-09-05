"use client";

import { useMemo } from "react";
import { useMetronome, makeTapTempo } from "@/lib/audio/use-metronome";
import { SuedeSocialBridge, socialAction } from "@/components/SuedeSocialBridge";

const MIN_BPM = 30;
const MAX_BPM = 280;

const REGISTRY_CYAN = "#22d3ee";
const RIGHTS_RED = "#9f101a";

export function Metronome() {
  const m = useMetronome({ initialBpm: 90, initialBeatsPerBar: 4 });
  const tapTempo = useMemo(() => makeTapTempo(), []);

  const onBpmChange = (value: number) => {
    const next = Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(value)));
    m.setBpm(next);
  };

  const onTap = () => {
    const detected = tapTempo.tap();
    if (detected) onBpmChange(detected);
  };

  return (
    <section
      className="mx-auto max-w-3xl px-6"
      style={{
        // The page's top gap now sits on the breadcrumb wrapper above this
        // section, so only the space between the trail and the H1 remains here.
        paddingTop: "var(--space-6)",
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
          <span aria-hidden>◆</span>&nbsp;&nbsp;04 · Metronome
        </span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-2xl)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          A click track.{" "}
          <span style={{ color: "var(--color-rights-red)" }}>Locked in.</span>
        </h1>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "var(--text-base)",
            margin: 0,
            maxWidth: "58ch",
          }}
        >
          Sample-accurate scheduling with a Chris Wilson lookahead loop. Drag
          the BPM, tap the tempo, or pick a time signature — the downbeat rings
          higher than the rest.
        </p>
      </header>

      <div
        className="terminal-card"
        style={{
          padding: "var(--space-8)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5rem, 16vw, 10rem)",
            color: m.running ? REGISTRY_CYAN : "var(--color-text)",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            transition: "color var(--duration-fast) var(--ease-out-cubic)",
          }}
        >
          {m.bpm}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            width: "100%",
            maxWidth: "26rem",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => onBpmChange(m.bpm - 1)}
            className="btn-ghost"
            style={{ width: "2.5rem", padding: 0, height: "2.5rem" }}
            aria-label="Decrease BPM"
          >
            −
          </button>
          <input
            type="range"
            min={MIN_BPM}
            max={MAX_BPM}
            value={m.bpm}
            onChange={(e) => onBpmChange(Number(e.target.value))}
            aria-label="BPM slider"
            style={{
              flex: 1,
              accentColor: REGISTRY_CYAN,
            }}
          />
          <button
            type="button"
            onClick={() => onBpmChange(m.bpm + 1)}
            className="btn-ghost"
            style={{ width: "2.5rem", padding: 0, height: "2.5rem" }}
            aria-label="Increase BPM"
          >
            +
          </button>
        </div>

        <BeatIndicator
          beatsPerBar={m.beatsPerBar}
          currentBeat={m.currentBeat}
          running={m.running}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button type="button" onClick={m.toggle} className="btn-primary">
            {m.running ? "Stop" : "Start"}
          </button>
          <button
            type="button"
            onClick={onTap}
            className="btn-ghost"
            aria-label="Tap tempo"
          >
            Tap
          </button>
          <TimeSignaturePicker
            beatsPerBar={m.beatsPerBar}
            onChange={m.setBeatsPerBar}
          />
        </div>
      </div>

      <SuedeSocialBridge
        source="metronome"
        eyebrow="Practice leaves a trace"
        title="Turn the click into a session note."
        body="Use the metronome here, then claim a Suede Social profile when you want to log what you are practicing and ask the room how to make it feel better."
        primary={socialAction("/", "Claim your handle", "metronome", "claim_handle")}
        secondary={socialAction("/forum", "Ask the forum", "metronome", "forum")}
      />
    </section>
  );
}

function BeatIndicator({
  beatsPerBar,
  currentBeat,
  running,
}: {
  beatsPerBar: number;
  currentBeat: number | null;
  running: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        height: "1.5rem",
      }}
      aria-hidden
    >
      {Array.from({ length: beatsPerBar }, (_, i) => {
        const isCurrent = running && currentBeat === i;
        const isDownbeat = i === 0;
        return (
          <span
            key={i}
            style={{
              height: "0.75rem",
              width: "0.75rem",
              borderRadius: 0,
              background: isCurrent
                ? isDownbeat
                  ? RIGHTS_RED
                  : REGISTRY_CYAN
                : "var(--color-rule)",
              transform: isCurrent ? "scale(1.4)" : "scale(1)",
              transition:
                "background-color var(--duration-instant) linear, transform var(--duration-instant) linear",
            }}
          />
        );
      })}
    </div>
  );
}

function TimeSignaturePicker({
  beatsPerBar,
  onChange,
}: {
  beatsPerBar: number;
  onChange: (n: number) => void;
}) {
  const options = [2, 3, 4, 6];
  return (
    <div
      role="radiogroup"
      aria-label="Time signature"
      style={{
        display: "flex",
        gap: "0.25rem",
        border: "1px solid var(--color-rule-muted)",
        padding: "0.25rem",
        borderRadius: 2,
      }}
    >
      {options.map((n) => (
        <button
          type="button"
          key={n}
          role="radio"
          aria-checked={n === beatsPerBar}
          onClick={() => onChange(n)}
          style={{
            padding: "0.45rem 0.75rem",
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-mono)",
            background:
              n === beatsPerBar ? "var(--color-ink-hover)" : "transparent",
            color:
              n === beatsPerBar
                ? "var(--color-registry-cyan)"
                : "var(--color-text-muted)",
            border: 0,
            cursor: "pointer",
            letterSpacing: "0.06em",
            borderRadius: 2,
          }}
        >
          {n}/4
        </button>
      ))}
    </div>
  );
}
