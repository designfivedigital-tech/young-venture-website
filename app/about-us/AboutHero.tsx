import styles from "./AboutUsPage.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero} data-header-theme="light">
      <div className={styles.heroInner}>
        <h1 className={styles.title}>About us</h1>

        <div className={styles.copy}>
          <p>
            Newton discovered gravity at 24. F. Scott Fitzgerald published his
            first novel at 23. Young people have always created wonders. Why
            shouldn’t we invest in them?
          </p>

          <p>
            Young Ventures is the youngest VC ever created. Build by students
            across the best universities in the world and backed by the best
            professors. Our job is to find the people building the future and
            bet on them.
          </p>

          <p>
            We are ready to uncover ideas looking for where they hide; in a lab,
            in a thesis, in a half-finished line of code. We are Young Ventures
            and we are born to scout the invisible.
          </p>
        </div>
      </div>
    </section>
  );
}