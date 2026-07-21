import styles from "./PolesSection.module.css";
import { POLES_LOGOS } from "../universityLogos";

export default function PolesSection() {
  return (
    <section data-header-theme="light" className={styles.section} id="poles">
      <div className={styles.header}>
        <h2>The spectrum of excellence</h2>
        <p>
          From deep engineering to global business — our universities span
          the whole spectrum.
        </p>
      </div>

      <div className={styles.diagram}>
        <span className={`${styles.poleLabel} ${styles.poleLabelTechnical}`}>Technical</span>
        <span className={`${styles.poleLabel} ${styles.poleLabelBusiness}`}>Business</span>

        {POLES_LOGOS.map((logo) => (
          <div
            key={logo.name}
            className={styles.logo}
            style={{
              left: logo.left,
              top: logo.top,
              width: logo.width,
              animationDuration: logo.duration,
              animationDelay: logo.delay,
            }}
          >
            <img src={logo.src} alt={logo.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
