import styles from "./UniversityNetworkPage.module.css";
import UniversityMapSection from "./components/UniversityMapSection";
import UniversityIntroSection from "./components/UniversityIntroSection";
import ProfessorsSection from "./components/ProfessorsSection";
import VennSection from "./components/VennSection";
import PolesSection from "./components/PolesSection";

export default function UniversityNetworkPage() {
  return (
    <main className={styles.page}>
      <UniversityMapSection />
      <UniversityIntroSection />
      <ProfessorsSection />
      <VennSection />
      <PolesSection />
    </main>
  );
}