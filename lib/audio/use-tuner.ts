"use client";

import { useEffect, useRef, useState } from "react";
import { detectPitch } from "./yin";
import { hzToNote, type NoteReading } from "./note";

export type TunerState = "idle" | "running";

export interface TunerReading extends NoteReading {
  /** Median of the recent detections, smoothed to reduce jitter. */
  smoothedHz: number;
}

const HISTORY_SIZE = 5;

export function useTuner() {
  const [state, setState] = useState<TunerState>("idle");
  const [reading, setReading] = useState<TunerReading | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletRef = useRef<AudioWorkletNode | null>(null);
  const historyRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function start() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        },
      });
      mediaStreamRef.current = stream;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      await ctx.audioWorklet.addModule("/tuner-audio-processor.js");

      const src = ctx.createMediaStreamSource(stream);
      const node = new AudioWorkletNode(ctx, "tuner-audio-processor");
      workletRef.current = node;
      src.connect(node);
      const muted = ctx.createGain();
      muted.gain.value = 0;
      node.connect(muted).connect(ctx.destination);

      node.port.onmessage = (ev: MessageEvent<{ samples: Float32Array }>) => {
        const hz = detectPitch(ev.data.samples, { sampleRate: ctx.sampleRate });
        if (hz === null) return;
        const hist = historyRef.current;
        hist.push(hz);
        if (hist.length > HISTORY_SIZE) hist.shift();
        const sorted = [...hist].sort((a, b) => a - b);
        const median = sorted[Math.floor(sorted.length / 2)];
        const note = hzToNote(median);
        setReading({ ...note, smoothedHz: median });
      };

      setState("running");
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Couldn't access the microphone.";
      setError(message);
      stop();
    }
  }

  function stop() {
    try {
      workletRef.current?.disconnect();
      workletRef.current?.port.close();
    } catch {
      /* ignore */
    }
    workletRef.current = null;
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    historyRef.current = [];
    setReading(null);
    setState("idle");
  }

  return { state, reading, error, start, stop };
}
