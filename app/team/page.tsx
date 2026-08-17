import type { Metadata } from "next";
import TeamPage from "./TeamPage";

export const metadata: Metadata = {
  title: "Team | Young Ventures — Investors from Top Universities",
  description:
    "Meet the Young Ventures team: founders, operators and investors from Bocconi, Oxford, Cambridge, Harvard and Stanford, backing the next generation of deep tech founders.",
};

export default function Page() {
  return <TeamPage />;
}
