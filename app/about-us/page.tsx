import styles from "./AboutUsPage.module.css";
import AboutHero from "./AboutHero";
import FocusAreasSection from "./FocusAreasSection";

export default function AboutUsPage() {
  return (
    <main className={styles.aboutPage}>
      <AboutHero />
      <FocusAreasSection />
    </main>
  );
}