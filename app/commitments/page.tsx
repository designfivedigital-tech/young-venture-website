import styles from "./CommitmentsPage.module.css";
import CommitmentsSection from "../components/Home/Commitments/CommitmentsSection";

export default function CommitmentsPage() {
  return (
    <main className={styles.page}>
      <section data-header-theme="light" className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.label}>Commitments</span>

          <h1>
            We back academic talent building enduring companies.
          </h1>
        </div>

        <p>
          We back the kind of minds universities are full of and industry is short of, and we help them build companies worth talking about.
        </p>
      </section>

      <CommitmentsSection lastCard="comingSoon" snapSection={false} />
    </main>
  );
}