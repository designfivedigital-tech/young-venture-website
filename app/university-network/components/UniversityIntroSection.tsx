import styles from "./UniversityIntroSection.module.css";

export default function UniversityIntroSection() {
  return (
    <section data-header-theme="light" className={styles.section}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Our Universities</h1>

        <p className={styles.paragraph}>
          Young Ventures is powered by a network of students from leading
          universities across Europe and the United States. By bringing
          together exceptional talent from diverse academic and professional
          backgrounds, we cultivate a community committed to innovation,
          entrepreneurship, and the future of venture capital.
        </p>
      </div>
    </section>
  );
}
