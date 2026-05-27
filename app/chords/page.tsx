import type { Metadata } from "next";
import { ChordLibrary } from "./ChordLibrary";

export const metadata: Metadata = {
  title: "Guitar Chord Library",
  description:
    "Free guitar chord library — open, barre, 7th, maj7, min7, sus, and power chord shapes for standard tuning. No sign-up. A guitarchords.info reference page.",
};

export default function ChordsPage() {
  return <ChordLibrary />;
}
