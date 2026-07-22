"use client";

import styles from "./Kpi2Section.module.css";

export default function Kpi2Section() {
  return (
    <section
      data-header-theme="dark"
      className={`${styles.kpi2Section} snap-section`}
    >
      <div className={styles.header}>
        <div>
          <h2>
            Powering young founders.
            <br />
            <span>Across capital, universities and venture networks.</span>
          </h2>
        </div>

        <p>
          A snapshot of Young Ventures’ investment reach, university access and
          venture ecosystem.
        </p>
      </div>

      <div className={styles.kpiBoard}>
        <article className={`${styles.kpiCard} ${styles.kpiTicket}`}>
          <div className={styles.kpiTicketNumber}>
            <span className={styles.kpiEuro}>€</span>
            <span className={`${styles.kpiDigit} ${styles.kpiDigitHi}`}>1</span>
            <span className={`${styles.kpiDigit} ${styles.kpiDigitMid}`}>0</span>
            <span className={`${styles.kpiDigit} ${styles.kpiDigitLo}`}>0</span>
            <span className={styles.kpiM}>K</span>
          </div>
          <p className={styles.kpiCaption}>Average ticket</p>
        </article>

        <article className={`${styles.kpiCard} ${styles.kpiMiniUni}`}>
          <div className={styles.kpiMiniValue}>9</div>
          <span className={styles.kpiMiniIcon} aria-hidden="true">
            <img
              src="/images/icons/mortarboard.colorable.svg"
              alt=""
              className={styles.kpiMiniIconImg}
            />
          </span>
          <p className={styles.kpiCaption}>Active Universities</p>
        </article>

        <article className={`${styles.kpiCard} ${styles.kpiMiniVc}`}>
          <div className={styles.kpiMiniValue}>500+</div>
          <span className={styles.kpiMiniIcon} aria-hidden="true">
            <img
              src="/images/icons/creativity.colorable.svg"
              alt=""
              className={styles.kpiMiniIconImg}
            />
          </span>
          <p className={styles.kpiCaption}>Initiatives in our deal flow</p>
        </article>

        <article className={`${styles.kpiCard} ${styles.kpiCagr}`}>
          <div className={styles.kpiCagrValue}>18%</div>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className={styles.kpiCagrChart}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="kpiFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff4fae" />
                <stop offset="55%" stopColor="#da2991" />
                <stop offset="100%" stopColor="#00e4e7" />
              </linearGradient>
            </defs>
            <path
              className={styles.kpiCagrFill}
              d="M-2 78 C13 54 26 42 42 42 C58 42 66 52 80 38 C90 28 94 17 102 15 L102 102 L-2 102 Z"
            />
            <path
              className={styles.kpiCagrLine}
              d="M-2 78 C13 54 26 42 42 42 C58 42 66 52 80 38 C90 28 94 17 102 15"
            />
          </svg>
          <p className={styles.kpiCaption}>Projected CGR</p>
        </article>

        <article className={`${styles.kpiCard} ${styles.kpiGeo}`}>
          <h3 className={styles.kpiGeoTitle}>Global university reach</h3>
          <div className={styles.kpiBubbles}>
            <span className={`${styles.kpiBubble} ${styles.kpiBubbleEu}`}>
              <b>Europe</b>
              <i>60%</i>
            </span>
            <span className={`${styles.kpiBubble} ${styles.kpiBubbleUs}`}>
              <b>USA</b>
              <i>35%</i>
            </span>
            <span className={`${styles.kpiBubble} ${styles.kpiBubbleAs}`}>
              <b>Asia</b>
              <i>5%</i>
            </span>
          </div>
        </article>

        <article className={`${styles.kpiCard} ${styles.kpiGiant}`}>
          <div className={styles.kpiGiantNumber}>
            <span className={`${styles.kpiDigit} ${styles.kpiDigitUp}`}>2</span>
            <span className={`${styles.kpiDigit} ${styles.kpiDigitDown}`}>5</span>
          </div>
          <p className={styles.kpiCaption}>25 VCs in our network</p>
        </article>
      </div>
    </section>
  );
}
