// YIN pitch detector — monophonic fundamental-frequency estimation.
// de Cheveigné & Kawahara (2002), "YIN, a fundamental frequency estimator
// for speech and music." Ported from Strumly.

export interface YinOptions {
  sampleRate: number;
  threshold?: number;
  minFreq?: number;
  maxFreq?: number;
  rmsThreshold?: number;
}

export function detectPitch(buf: Float32Array, opts: YinOptions): number | null {
  const sr = opts.sampleRate;
  const threshold = opts.threshold ?? 0.1;
  const minFreq = opts.minFreq ?? 50;
  const maxFreq = opts.maxFreq ?? 1500;
  const rmsThreshold = opts.rmsThreshold ?? 0.01;

  let rms = 0;
  for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / buf.length);
  if (rms < rmsThreshold) return null;

  const tauMin = Math.max(2, Math.floor(sr / maxFreq));
  const tauMax = Math.min(buf.length >> 1, Math.floor(sr / minFreq));
  if (tauMax <= tauMin) return null;

  const diff = new Float32Array(tauMax + 1);
  for (let tau = 1; tau <= tauMax; tau++) {
    let s = 0;
    for (let i = 0; i < tauMax; i++) {
      const delta = buf[i] - buf[i + tau];
      s += delta * delta;
    }
    diff[tau] = s;
  }

  const cmnd = new Float32Array(tauMax + 1);
  cmnd[0] = 1;
  let running = 0;
  for (let tau = 1; tau <= tauMax; tau++) {
    running += diff[tau];
    cmnd[tau] = running === 0 ? 1 : (diff[tau] * tau) / running;
  }

  let tauEstimate = -1;
  for (let tau = tauMin; tau <= tauMax; tau++) {
    if (cmnd[tau] < threshold) {
      while (tau + 1 <= tauMax && cmnd[tau + 1] < cmnd[tau]) tau++;
      tauEstimate = tau;
      break;
    }
  }
  if (tauEstimate < 0) return null;

  const t = tauEstimate;
  const x0 = t < 1 ? t : t - 1;
  const x2 = t + 1 < tauMax ? t + 1 : t;
  let betterTau: number;
  if (x0 === t) betterTau = cmnd[t] <= cmnd[x2] ? t : x2;
  else if (x2 === t) betterTau = cmnd[t] <= cmnd[x0] ? t : x0;
  else {
    const s0 = cmnd[x0];
    const s1 = cmnd[t];
    const s2 = cmnd[x2];
    const denom = 2 * (2 * s1 - s2 - s0);
    betterTau = denom === 0 ? t : t + (s2 - s0) / denom;
  }

  return sr / betterTau;
}
