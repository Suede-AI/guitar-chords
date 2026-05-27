import type { Metadata } from "next";
import { Metronome } from "./Metronome";

export const metadata: Metadata = {
  title: "Free Metronome",
  description:
    "A free in-browser metronome with tap tempo and time-signature support. No sign-up. Sample-accurate Web Audio scheduling.",
};

export default function MetronomePage() {
  return <Metronome />;
}
