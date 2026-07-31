import styles from "./UniversityIntroSection.module.css";

export default function UniversityIntroSection() {
  return (
    <section data-header-theme="light" className={styles.section}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Our Universities</h1>

        <p className={styles.paragraph}>
         Young Ventures is powered by a network of students and professors across the world's leading universities. By bringing together exceptional talent from diverse academic and professional backgrounds, we build the next generation of founders and investors for the future of venture capital.
        </p>
      </div>
    </section>
  );
}
