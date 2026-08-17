import type { Metadata } from "next";
import UniversityStoriesPage from "./UniversityStoriesPage";

export const metadata: Metadata = {
  title: "University Stories | Young Ventures Alumni Ventures",
  description:
    "Explore standout ventures born inside the Young Ventures university network — from Bocconi alumni Bending Spoons and Satispay to the founders we're watching next.",
};

export default function Page() {
  return <UniversityStoriesPage />;
}
