"use client";

import styles from "./Kpi2Section.module.css";
import { useState } from "react";

const universities = [
  { name: "Caltech", x: 18, y: 42 },
  { name: "Stanford", x: 14, y: 45 },
  { name: "Oxford", x: 47, y: 36 },
  { name: "Bocconi", x: 51, y: 43 },
  { name: "ETH", x: 50, y: 40 },
  { name: "NUS", x: 75, y: 58 },
];
  

export default function Kpi2Section() {

    const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isLight = theme === "light";
  return (
    <section   data-header-theme={isLight ? "light" : "dark"}  className={`${styles.kpi2Section} ${isLight ? styles.lightMode : ""}`}>
            <button
        type="button"
        className={styles.themeSwitch}
        onClick={() => setTheme(isLight ? "dark" : "light")}
        aria-label="Toggle section theme"
      >
        <span className={styles.switchText}>
          {isLight ? "Light" : "Dark"}
        </span>
        <span className={styles.switchTrack}>
          <span className={styles.switchThumb} />
        </span>
      </button>

        
      <div className={styles.header}>
        <div>
          <span className={styles.label}>KPI</span>
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

      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.ticketCard}`}>
        <div className={styles.ticketNumber}>
            <span className={styles.euro}>€</span>
            <span className={styles.one}>1</span>
            <span className={styles.zero}>0</span>
            <span className={styles.k}>M</span>
        </div>

        <p className={styles.ticketCaption}>
            Average ticket size up to €100K
        </p>
        </article>

        <article className={`${styles.card} ${styles.universityCard}`}>
            <div className={styles.universityValue}>9</div>

            <div className={styles.universityIcon} aria-hidden="true">
                 <img
                        src="images/icons/mortarboard.colorable.svg"
                        alt=""
                        className={styles.universityIconImg}
                    />
            </div>

            <p className={styles.universityLabel}>Active Universities</p>
            </article>

        <article className={`${styles.card} ${styles.vcCard}`}>
            <div className={styles.vcNumber}>
                <span className={styles.vcTwo}>2</span>
                <span className={styles.vcZero}>5</span>
            </div>

        <p className={styles.vcText}>
            25 VCs in our network
        </p>
        </article>

        <article className={`${styles.card} ${styles.cagrCard}`}>
  <div className={styles.aumValue}>38%</div>

 <svg
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
  className={styles.aumChart}
  aria-hidden="true"
>
  <defs>
    <linearGradient id="aumFill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#355c91" />
      <stop offset="50%" stopColor="#7a438d" />
      <stop offset="100%" stopColor="#bd1f3f" />
    </linearGradient>
  </defs>

  <path
  className={styles.aumFill}
  d="M-2 78 C13 54 26 42 42 42 C58 42 66 52 80 38 C90 28 94 17 102 15 L102 102 L-2 102 Z"
/>

<path
  className={styles.aumLine}
  d="M-2 78 C13 54 26 42 42 42 C58 42 66 52 80 38 C90 28 94 17 102 15"
/>
</svg>

  <p className={styles.aumCaption}>
    Projected CGR
  </p>
</article>

        <article className={`${styles.card} ${styles.mapCard}`}>
  <div className={styles.mapTop}>
    <p className={styles.cardLabel}>Geography</p>
    <span>Global university reach</span>
  </div>

  <div className={styles.worldMap} aria-hidden="true">
  <img
    src="/images/mondo.png"
    alt=""
    className={styles.worldMapImg}
  />
</div>
</article>

        <article className={`${styles.card} ${styles.dealCard}`}>
        <div className={styles.dealValue}>500+</div>

        <div className={styles.dealIcon} aria-hidden="true">
            <img
            src="images/icons/creativity.colorable.svg"
            alt=""
            className={styles.dealIconImg}
            />
        </div>

        <p className={styles.dealLabel}>Initiative Deal Flow</p>
        </article>
      </div>
    </section>
  );
}