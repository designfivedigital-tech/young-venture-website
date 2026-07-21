import Link from "next/link";
import styles from "./VennSection.module.css";
import { VENN_LOGOS } from "../universityLogos";

export default function VennSection() {
  return (
    <section data-header-theme="light" className={styles.section} id="venn">
      <div className={styles.header}>
        <Link className={styles.learnMore} href="/university-stories">
          Learn more <span>→</span>
        </Link>
        <h2>Where our universities excel</h2>
        <p>Two souls, one network: engineering depth and business acumen.</p>
      </div>

      <div className={styles.wrap}>
        <div className={styles.labels}>
          <span className={`${styles.label} ${styles.labelTechnical}`}>Technical</span>
          <span className={`${styles.label} ${styles.labelBusiness}`}>Business</span>
        </div>

        <div className={styles.diagram}>
          <svg className={styles.svg} viewBox="0 0 1060 596" aria-hidden>
            <circle cx="330" cy="298" r="280" fill="rgba(0,228,231,0.06)" />
            <circle cx="730" cy="298" r="280" fill="rgba(218,41,145,0.06)" />
            <circle cx="330" cy="298" r="280" fill="none" stroke="#00b7ba" strokeWidth="2" />
            <circle cx="730" cy="298" r="280" fill="none" stroke="#da2991" strokeWidth="2" />
          </svg>

          {VENN_LOGOS.map((logo) => (
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
      </div>
    </section>
  );
}
