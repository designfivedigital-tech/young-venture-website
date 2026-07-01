import styles from "./AboutUsPage.module.css";

export default function CollegeDeepTechSection() {
  return (
    <section className={styles.collegeSection} data-header-theme="light">
      <div className={styles.collegeInner}>
        <h2>Why college deep tech ?</h2>

        <p>
          We typically invest up to <strong>€100,000</strong> alongside leading
          venture firms, research institutions, and angel investors, helping
          founders bridge the gap between breakthrough and momentum.
        </p>

        <h3>The future starts earlier than most people think. So do we.</h3>

        <p>
          Every technological revolution begins in the same place:
          <br />a laboratory, a workshop, a dorm room.
        </p>

        <p>
          The founders building tomorrow&apos;s breakthroughs are no longer
          emerging after a decade in industry. They are publishing papers,
          building prototypes, and launching companies while still in
          universities and research labs.
        </p>

        <h4>
          Most investors wait for proof.
          <br />
          We look for conviction.
        </h4>
      </div>
    </section>
  );
}