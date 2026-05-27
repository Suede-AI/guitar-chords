import type { Metadata } from "next";
import { Tuner } from "./Tuner";

export const metadata: Metadata = {
  title: "Free Guitar Tuner",
  description:
    "A free in-browser chromatic tuner. No sign-up. Audio stays on your device. YIN pitch detection over the Web Audio API.",
};

export default function TunerPage() {
  return <Tuner />;
}
