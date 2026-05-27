"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Chris Wilson's "A Tale of Two Clocks" lookahead scheduler.
// AudioContext.currentTime gives sample-accurate timing; setInterval drives
// the scheduling loop (which only queues events, never plays them directly).
// Ported from Strumly.

const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;

export interface UseMetronomeOptions {
  initialBpm?: number;
  initialBeatsPerBar?: number;
}

export function useMetronome(opts: UseMetronomeOptions = {}) {
  const [bpm, setBpm] = useState(opts.initialBpm ?? 90);
  const [beatsPerBar, setBeatsPerBar] = useState(opts.initialBeatsPerBar ?? 4);
  const [running, setRunning] = useState(false);
  const [currentBeat, setCurrentBeat] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const beatCounterRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const bpmRef = useRef(bpm);
  const beatsRef = useRef(beatsPerBar);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);
  useEffect(() => {
    beatsRef.current = beatsPerBar;
  }, [beatsPerBar]);

  useEffect(() => () => stop(), []); // cleanup on unmount

  const scheduleClick = useCallback((beatIndex: number, time: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const isDownbeat = beatIndex === 0;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.frequency.value = isDownbeat ? 1200 : 800;
    env.gain.setValueAtTime(0.0001, time);
    env.gain.exponentialRampToValueAtTime(isDownbeat ? 0.6 : 0.4, time + 0.001);
    env.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
    osc.connect(env).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.06);

    const delayMs = Math.max(0, (time - ctx.currentTime) * 1000);
    window.setTimeout(() => setCurrentBeat(beatIndex), delayMs);
  }, []);

  const scheduler = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    while (nextNoteTimeRef.current < ctx.currentTime + SCHEDULE_AHEAD_S) {
      const beatIdx = beatCounterRef.current % beatsRef.current;
      scheduleClick(beatIdx, nextNoteTimeRef.current);
      const secondsPerBeat = 60.0 / bpmRef.current;
      nextNoteTimeRef.current += secondsPerBeat;
      beatCounterRef.current += 1;
    }
  }, [scheduleClick]);

  function start() {
    if (running) return;
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    beatCounterRef.current = 0;
    nextNoteTimeRef.current = ctx.currentTime + 0.05;
    setRunning(true);
    timerRef.current = window.setInterval(scheduler, LOOKAHEAD_MS);
  }

  function stop() {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);
    setCurrentBeat(null);
  }

  function toggle() {
    if (running) stop();
    else start();
  }

  return {
    bpm,
    setBpm,
    beatsPerBar,
    setBeatsPerBar,
    running,
    currentBeat,
    start,
    stop,
    toggle,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Tap-tempo helper. Pure function, easy to test.
// Returns BPM averaged from the last N taps (or null if not enough data).
// Resets the rolling window if a gap > 2s between taps is observed.

const MAX_TAPS = 6;
const TAP_GAP_RESET_MS = 2000;

export function makeTapTempo() {
  let timestamps: number[] = [];

  function tap(now: number = performance.now()): number | null {
    const last = timestamps[timestamps.length - 1];
    if (last && now - last > TAP_GAP_RESET_MS) {
      timestamps = [];
    }
    timestamps.push(now);
    if (timestamps.length > MAX_TAPS) timestamps.shift();
    if (timestamps.length < 2) return null;
    const intervals: number[] = [];
    for (let i = 1; i < timestamps.length; i++) {
      intervals.push(timestamps[i] - timestamps[i - 1]);
    }
    const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    return Math.round(60000 / avgMs);
  }

  function reset() {
    timestamps = [];
  }

  return { tap, reset };
}
