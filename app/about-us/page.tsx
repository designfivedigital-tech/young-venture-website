"use client";

import { useState } from "react";
import styles from "./AboutUsPage.module.css";

type TabKey = "founders" | "universities" | "capital" | "portfolio";

const tabs: { key: TabKey; label: string }[] = [
  { key: "founders", label: "Founders" },
  { key: "universities", label: "Universities" },
  { key: "capital", label: "Capital" },
  { key: "portfolio", label: "Portfolio" },
];

const chartData = {
  founders: [18, 32, 48, 74, 110, 156],
  universities: [4, 7, 12, 18, 25, 34],
  capital: [1.2, 2.4, 4.1, 6.8, 8.6, 10],
  portfolio: [3, 7, 12, 18, 27, 39],
};

const chartLabels = ["2021", "2022", "2023", "2024", "2025", "2026"];

const tabCopy = {
  founders: {
    title: "Founders supported",
    description: "Young founders connected to capital, talent and operators.",
    suffix: "",
  },
  universities: {
    title: "University network",
    description: "A growing network across leading academic ecosystems.",
    suffix: "",
  },
  capital: {
    title: "Capital deployed",
    description: "Illustrative capital deployed into early-stage opportunities.",
    suffix: "M",
  },
  portfolio: {
    title: "Portfolio companies",
    description: "Student-led companies supported from idea to scale.",
    suffix: "",
  },
};

const kpis = [
  { value: "€10M+", label: "Capital deployed" },
  { value: "150+", label: "Founders supported" },
  { value: "30+", label: "University partners" },
  { value: "12", label: "Countries reached" },
];

const sectors = [
  { name: "AI", value: 38 },
  { name: "Fintech", value: 24 },
  { name: "Climate", value: 16 },
  { name: "Health", value: 12 },
  { name: "Consumer", value: 10 },
];

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("founders");

  const currentData = chartData[activeTab];
  const maxValue = Math.max(...currentData);
  const currentCopy = tabCopy[activeTab];

  return (
    <main className={styles.page}>
      <section className={styles.hero} data-header-theme="light">
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>About Young Ventures</span>

          <h1>
            Backing the next generation
            <br />
            of European founders.
          </h1>

          <p>
            We invest in ambitious student founders, connecting capital,
            universities and venture networks across Europe.
          </p>
        </div>
      </section>

      <section className={styles.kpiSection} data-header-theme="light">
        <div className={styles.kpiGrid}>
          {kpis.map((item) => (
            <article key={item.label} className={styles.kpiCard}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.dashboardSection} data-header-theme="light">
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Our pulse</span>
          <h2>Building a generation of founders.</h2>
          <p>
            A live-feeling view of how our ecosystem grows across founders,
            universities, capital and portfolio companies.
          </p>
        </div>

        <div className={styles.dashboard}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`${styles.tab} ${
                  activeTab === tab.key ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.chartPanel}>
            <div className={styles.chartTop}>
              <div>
                <h3>{currentCopy.title}</h3>
                <p>{currentCopy.description}</p>
              </div>

              <strong>
                {currentData[currentData.length - 1]}
                {currentCopy.suffix}
              </strong>
            </div>

            <div className={styles.lineChart}>
              <svg viewBox="0 0 700 300" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#da2991" />
                    <stop offset="50%" stopColor="#00d5ff" />
                    <stop offset="100%" stopColor="#7cff8b" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    x2="700"
                    y1={70 + line * 55}
                    y2={70 + line * 55}
                    className={styles.gridLine}
                  />
                ))}

                <polyline
                  className={styles.chartLine}
                  points={currentData
                    .map((value, index) => {
                      const x = (index / (currentData.length - 1)) * 700;
                      const y = 260 - (value / maxValue) * 220;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />

                {currentData.map((value, index) => {
                  const x = (index / (currentData.length - 1)) * 700;
                  const y = 260 - (value / maxValue) * 220;

                  return (
                    <circle
                      key={`${activeTab}-${index}`}
                      cx={x}
                      cy={y}
                      r="7"
                      className={styles.chartDot}
                    />
                  );
                })}
              </svg>

              <div className={styles.chartLabels}>
                {chartLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectorSection} data-header-theme="dark">
        <div className={styles.sectorText}>
          <span className={styles.eyebrowDark}>Investment focus</span>
          <h2>Where young founders are building.</h2>
          <p>
            We focus on sectors where technical talent, speed and ambition can
            compound into category-defining companies.
          </p>
        </div>

        <div className={styles.barChart}>
          {sectors.map((sector) => (
            <div key={sector.name} className={styles.barRow}>
              <div className={styles.barInfo}>
                <span>{sector.name}</span>
                <strong>{sector.value}%</strong>
              </div>

              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${sector.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.flywheelSection} data-header-theme="dark">
        <div className={styles.flywheel}>
          <div className={styles.orbit} />
          <div className={`${styles.node} ${styles.nodeTop}`}>Universities</div>
          <div className={`${styles.node} ${styles.nodeRight}`}>Founders</div>
          <div className={`${styles.node} ${styles.nodeBottom}`}>Capital</div>
          <div className={`${styles.node} ${styles.nodeLeft}`}>Operators</div>

          <div className={styles.centerNode}>
            Young
            <br />
            Ventures
          </div>
        </div>

        <div className={styles.flywheelText}>
          <span className={styles.eyebrowDark}>Ecosystem flywheel</span>
          <h2>Talent, capital and networks reinforcing each other.</h2>
          <p>
            Our model connects universities, founders, operators and capital in
            one compounding ecosystem.
          </p>
        </div>
      </section>

      <section className={styles.closing} data-header-theme="light">
        <h2>
          We believe the future
          <br />
          belongs to founders
          <br />
          who start earlier.
        </h2>

        <p>
          Young Ventures exists to help exceptional students become exceptional
          founders.
        </p>
      </section>
    </main>
  );
}