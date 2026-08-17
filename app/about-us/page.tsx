import type { Metadata } from "next";
import styles from "./AboutUsPage.module.css";
import AboutHero from "./AboutHero";
import FocusAreasSection from "./FocusAreasSection";
import CollegeDeepTechSection from "./CollegeDeepTechSection";
import BeliefsSection from "./BeliefsSection";

export const metadata: Metadata = {
  title: "About Us | Young Ventures — Deep Tech VC Run by Students",
  description:
    "Young Ventures is a venture firm founded by students inside top universities, backing deep tech and clean tech founders before their idea has a pitch deck.",
};

export default function AboutUsPage() {
  return (
    <main className={styles.aboutPage}>
      <AboutHero />
      <FocusAreasSection />
      <CollegeDeepTechSection />
      <BeliefsSection/>
    </main>
  );
}