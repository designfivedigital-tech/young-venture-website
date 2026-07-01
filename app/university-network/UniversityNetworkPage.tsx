import styles from "./UniversityNetworkPage.module.css";
import UniversityMapSection from "./components/UniversityMapSection";

export default function UniversityNetworkPage() {
  return (
    <main className={styles.page}>
      <UniversityMapSection />
    </main>
  );
}