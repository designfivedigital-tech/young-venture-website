import type { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Young Ventures | Pre-Seed VC for Deep Tech Student Founders",
  description:
    "Young Ventures backs deep tech and clean tech founders from top universities — Bocconi, Oxford, Stanford, Harvard — before the market catches on. €100K average ticket.",
};

export default function Page() {
  return <HomePage />;
}
