import styles from "./AboutUsPage.module.css";

export default function CollegeDeepTechSection() {
  return (
    <section className={styles.collegeSection} data-header-theme="light">
      <div className={styles.collegeInner}>
        <div className={styles.collegeHeader}>
      
          <h2>Why college deep tech?</h2>
        </div>

        <div className={styles.collegeSplit}>
          <div className={styles.triad} aria-label="Our three pillars">
            <svg
              className={styles.triadSvg}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path className={styles.triadEdges} d="M50 12 L15 74 L85 74 Z" />
              <path
                className={styles.triadSpokes}
                d="M50 12 L50 53.33 M15 74 L50 53.33 M85 74 L50 53.33"
              />
              <path className={styles.triadLight} d="M50 12 L15 74 L85 74 Z" pathLength={100} />
            </svg>

            <span className={styles.triadCenter}>YV</span>
            <span className={styles.triadVertex} style={{ left: "50%", top: "12%" }} />
            <span className={styles.triadVertex} style={{ left: "15%", top: "74%" }} />
            <span className={styles.triadVertex} style={{ left: "85%", top: "74%" }} />

            <div className={`${styles.triadNode} ${styles.triadNodeTop}`}>
              <div className={styles.triadText}>
                <h4>Know-how</h4>
              </div>
            </div>

            <div className={`${styles.triadNode} ${styles.triadNodeLeft}`}>
              <div className={styles.triadText}>
                <h4>Environment</h4>
              </div>
            </div>

            <div className={`${styles.triadNode} ${styles.triadNodeRight}`}>
              <div className={styles.triadText}>
                <h4>Network</h4>
              </div>
            </div>
          </div>

          <div className={styles.collegeCopy}>
            <p>
              We typically invest up to <strong>€100,000</strong> alongside
              leading venture firms, research institutions, and angel investors,
              helping founders bridge the gap between breakthrough and momentum.
            </p>

            <h4>The future starts earlier than most people think. So do we.</h4>
          </div>
        </div>
      </div>
    </section>
  );
}