import type { Metadata } from "next";
import UniversityNetworkPage from "./UniversityNetworkPage";

export const metadata: Metadata = {
  title: "University Network | Young Ventures Academic Partners",
  description:
    "Young Ventures' network spans professors and student talent at Bocconi, Oxford, Cambridge, Stanford and NYU — connecting frontier research to venture capital.",
};

export default function Page() {
  return <UniversityNetworkPage />;
}