# guitarchords.info

A zero-auth public reference site for guitar players — chord library, scale
trainer, in-browser tuner, and metronome. No accounts, no analytics, no
backend. Designed in the Suede Institutional IP Terminal language.

## Stack

- Next.js 16 (App Router)
- TypeScript (strict)
- Tailwind v4 (driven by CSS variables in `app/globals.css`)
- pnpm

The site is fully static where possible. The tuner and metronome use the
Web Audio API on the client; everything else renders on the server.

## Running locally

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

Other useful scripts:

```bash
pnpm typecheck   # tsc --noEmit
pnpm build       # next build
pnpm start       # serve the production build
```

## Project layout

```
app/
  layout.tsx          # site shell, header, footer, Suede palette tokens
  page.tsx            # editorial landing with four tool tiles
  globals.css         # design tokens (Rights Red / Registry Cyan / Deep Ink)
  chords/             # chord library route
  scales/             # scale trainer route
  tuner/              # chromatic tuner route (Web Audio + YIN)
  metronome/          # metronome route (Web Audio scheduler)
components/
  ChordDiagram.tsx    # SVG chord diagram
  Fretboard.tsx       # SVG fretboard for the scale trainer
lib/
  chords/fingerings.ts  # chord-shape data (open/barre/7/maj7/m7/sus/power)
  music/scales.ts       # scale theory primitives (12 scales)
  music/fretboard.ts    # pitch-class math for standard tuning
  audio/note.ts         # Hz <-> note math, standard-tuning reference
  audio/yin.ts          # YIN pitch detector
  audio/use-tuner.ts    # React hook for the tuner
  audio/use-metronome.ts # React hook for the metronome + tap-tempo helper
public/
  tuner-audio-processor.js  # AudioWorklet for the tuner mic pump
```

## Design

The visual language follows the Suede Institutional IP Terminal palette:

- **Rights Red** `#9f101a` — accents, alerts, downbeat
- **Registry Cyan** `#22d3ee` — accents, in-tune state, root notes
- **Deep Ink** `#050b16` — page background

Editorial typography (serif display + monospace eyebrow + system body),
hairline rules, hard-edged corners, terminal-style filter pills. Not a
generic dark Tailwind template.

## Provenance

Core music primitives (chord fingerings, scale intervals, YIN pitch
detector, Web Audio worklet, metronome scheduler) are ported from
[Strumly](https://strumly.com), Suede Labs&rsquo; onchain music oracle.
The UI shells are rewritten in the IP Terminal language and the auth /
paid-tier scaffolding has been removed.

## License

TBD by the owner.
