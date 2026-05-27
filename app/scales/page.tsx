import type { Metadata } from "next";
import { ScaleTrainer } from "./ScaleTrainer";

export const metadata: Metadata = {
  title: "Guitar Scale Trainer",
  description:
    "Interactive guitar fretboard for every key and twelve scales — major, natural minor, pentatonics, blues, and the modes. Free, no sign-up. From guitarchords.info.",
};

export default function ScalesPage() {
  return <ScaleTrainer />;
}
