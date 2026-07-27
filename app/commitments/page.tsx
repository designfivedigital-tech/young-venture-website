import styles from "./CommitmentsPage.module.css";
import CommitmentsSection from "../components/Home/Commitments/CommitmentsSection";

export default function CommitmentsPage() {
  return (
    <main className={styles.page}>
      <section data-header-theme="light" className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.label}>Commitments</span>

          <h1>
            Backing ambitious founders.
            <br />
            Building enduring companies.
          </h1>
        </div>

        <p>
          We partner with exceptional entrepreneurs from the earliest stages,
          supporting them with capital, network and strategic guidance.
        </p>
      </section>

      <CommitmentsSection lastCard="comingSoon" snapSection={false} />
    </main>
  );
}