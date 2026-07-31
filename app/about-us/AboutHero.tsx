import styles from "./AboutUsPage.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero} data-header-theme="light">
      <div className={styles.heroInner}>
        <h1 className={styles.title}>About us</h1>

        <div className={styles.copy}>
          <p>
            Most of the companies that end up defining an era are founded by people in their twenties, at the exact age when nobody is willing to fund them. Talent tends to arrive early, and capital tends to arrive late. We exist to close that distance.
          </p>

          <p>
            Young Ventures is a venture firm founded and run by students inside the world's leading universities, with their professors behind us. We don't visit the places where the future is being built, we live in them, and that changes what we get to see and how early we get to see it.
          </p>

          <p>
            By the time an idea has a pitch deck, everyone can see it. We look for founders before that moment, in research groups, dorm rooms and late-night side projects, and we back them when a bet on them still means something.
          </p>
        </div>
      </div>
    </section>
  );
}