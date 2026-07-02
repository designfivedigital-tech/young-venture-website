import styles from "./UniversityNetworkPage.module.css";
import UniversityIntroSection from "./components/UniversityIntroSection";
import UniversityMapSection from "./components/UniversityMapSection";

export default function UniversityNetworkPage() {
  return (
    <main className={styles.page}>
      <UniversityIntroSection />
      <UniversityMapSection />
    </main>
  );
}