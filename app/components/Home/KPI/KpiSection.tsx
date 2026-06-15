"use client";

import { useState } from "react";
import styles from "./KpiSection.module.css";
import type { CSSProperties } from "react";

type CapitalKey = "invested" | "returned" | "unrealized";

export default function KpiSection() {
  const [activeCapital, setActiveCapital] = useState<CapitalKey | null>(null);

  const capitalItems = [
    {
      key: "invested",
      label: "Invested Capital",
      value: "€7.1M",
      percent: "59%",
      colorClass: styles.purple,
    },
    {
      key: "returned",
      label: "Returned Capital",
      value: "€3.2M",
      percent: "27%",
      colorClass: styles.green,
    },
    {
      key: "unrealized",
      label: "Unrealized Value",
      value: "€1.7M",
      percent: "14%",
      colorClass: styles.cyan,
    },
  ] as const;

  const activeCapitalItem = capitalItems.find(
    (item) => item.key === activeCapital
  );

  return (
    <section data-header-theme="light" className={styles.kpiSection}>
      <div className={styles.header}>
        <div>
          <span className={styles.label}>KPI</span>
          <h2>
            Our key metrics.
            <br />
            <span>Driving meaningful impact.</span>
          </h2>
        </div>

        <p>
          A snapshot of our performance and results across investments, exits,
          and portfolio growth.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.darkCard} ${styles.partnerCard}`}>
          <div className={styles.cardTop}>
            <h3>Partner</h3>

            <div className={styles.partnerIcon}>
              <img
                src="/images/icons/partners.colorable.svg"
                alt=""
                className={styles.partnerSvg}
              />
            </div>
          </div>

          <strong className={styles.partnerNumber}>20</strong>
          <p className={styles.partnerText}>Active Partners</p>

          <div className={styles.partnerGrowthSvg} aria-hidden="true">
            <svg viewBox="0 0 360 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="partnerLineGradient" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6d2cff" />
                  <stop offset="100%" stopColor="#b986ff" />
                </linearGradient>
              </defs>

              {[
                [4, 198],
                [27, 191],
                [50, 184],
                [73, 176],
                [96, 166],
                [119, 153],
                [142, 137],
                [165, 119],
                [188, 100],
                [211, 80],
                [234, 60],
                [257, 42],
                [280, 28],
                [303, 18],
                [326, 11],
                [356, 6],
              ].map(([x, y], i) => (
                <g key={i}>
                  <line
                    x1={x}
                    y1="218"
                    x2={x}
                    y2={y}
                    className={styles.partnerThruster}
                    style={{ "--i": i } as CSSProperties}
                  />

                  <line
                    x1={x}
                    y1="218"
                    x2={x}
                    y2={y}
                    className={styles.partnerThrusterGlow}
                    style={{ "--i": i } as CSSProperties}
                  />
                </g>
              ))}

              <polyline
                className={styles.partnerCurve}
                points="4,198 27,191 50,184 73,176 96,166 119,153 142,137 165,119 188,100 211,80 234,60 257,42 280,28 303,18 326,11 356,6"
              />

              <circle className={styles.partnerDot} cx="356" cy="6" r="5" />
            </svg>
          </div>
        </article>

        <article className={`${styles.card} ${styles.capitalCard}`}>
          <h3>Capital Overview</h3>

          <div className={styles.capitalContent}>
            <div
              className={styles.donut}
              onMouseLeave={() => setActiveCapital(null)}
            >
              <svg
                className={styles.donutSvg}
                viewBox="0 0 120 120"
                aria-hidden="true"
              >
                <circle className={styles.donutTrack} cx="60" cy="60" r="42" />

                <circle
                  className={`${styles.donutArc} ${styles.investedArc} ${
                    activeCapital === "invested" ? styles.activeArc : ""
                  }`}
                  cx="60"
                  cy="60"
                  r="42"
                  pathLength="100"
                  strokeDasharray="59 41"
                  strokeDashoffset="0"
                  onMouseEnter={() => setActiveCapital("invested")}
                />

                <circle
                  className={`${styles.donutArc} ${styles.returnedArc} ${
                    activeCapital === "returned" ? styles.activeArc : ""
                  }`}
                  cx="60"
                  cy="60"
                  r="42"
                  pathLength="100"
                  strokeDasharray="27 73"
                  strokeDashoffset="-59"
                  onMouseEnter={() => setActiveCapital("returned")}
                />

                <circle
                  className={`${styles.donutArc} ${styles.unrealizedArc} ${
                    activeCapital === "unrealized" ? styles.activeArc : ""
                  }`}
                  cx="60"
                  cy="60"
                  r="42"
                  pathLength="100"
                  strokeDasharray="14 86"
                  strokeDashoffset="-86"
                  onMouseEnter={() => setActiveCapital("unrealized")}
                />
              </svg>

              <div className={styles.donutCenter}>
                {activeCapitalItem ? (
                  <>
                    <strong>{activeCapitalItem.value}</strong>
                    <span>{activeCapitalItem.percent}</span>
                    <span>{activeCapitalItem.label}</span>
                  </>
                ) : (
                  <>
                    <strong>€12M</strong>
                    <span>Total Capital</span>
                    <span>Deployed</span>
                  </>
                )}
              </div>
            </div>

            <div className={styles.legend}>
              {capitalItems.map((item) => (
                <div
                  key={item.key}
                  className={`${styles.legendItem} ${
                    activeCapital === item.key ? styles.legendItemActive : ""
                  }`}
                  onMouseEnter={() => setActiveCapital(item.key)}
                  onMouseLeave={() => setActiveCapital(null)}
                >
                  <i className={item.colorClass} />
                  <p>
                    {item.label}{" "}
                    <strong>
                      {item.value} ({item.percent})
                    </strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.darkCard} ${styles.iposCard}`}>
          <span className={styles.ipoBgNumber}>9</span>

          <div className={styles.cardTop}>
            <h3>IPOs</h3>
            <div className={styles.icon}>↗</div>
          </div>

          <strong className={styles.ipoNumber}>9</strong>
          <p className={styles.ipoText}>Total IPOs</p>

          <div className={styles.ipoLaunch} aria-hidden="true">
            <div className={styles.ipoPath}>
              <span className={styles.ipoTrail} />
              <span className={styles.ipoMovingDot} />

              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className={styles.ipoCheckpoint}
                  style={{ "--i": i } as CSSProperties}
                >
                  <em>IPO {String(i + 1).padStart(2, "0")}</em>
                </span>
              ))}
            </div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.tradeCard}`}>
  <div className={styles.tradeCopy}>
    <h3>Trade Sales</h3>
    <strong>41</strong>
    <p>Total Trade Sales</p>
  </div>

  <div className={styles.tradeOrbit} aria-hidden="true">
    <span className={styles.tradeGlow} />

    <div className={`${styles.orbitRing} ${styles.ringOne}`}>
      <i />
    </div>

    <div className={`${styles.orbitRing} ${styles.ringTwo}`}>
      <i />
    </div>

    <div className={`${styles.orbitRing} ${styles.ringThree}`}>
      <i />
    </div>

    <div className={styles.tradeCore}>
      <span>€</span>
    </div>
  </div>
</article>

        <article className={`${styles.card} ${styles.ticketCard}`}>
          <div>
            <h3>Initial Ticket Size &#40;Up To&#41;</h3>
            <strong>€250k</strong>
            <p>Average Initial Ticket Size</p>
          </div>

          <div className={styles.bars}>
  {[
    { height: 28, year: "2020", value: "€75k", deals: "4 Deals" },
    { height: 42, year: "2021", value: "€110k", deals: "7 Deals" },
    { height: 54, year: "2022", value: "€145k", deals: "11 Deals" },
    { height: 66, year: "2023", value: "€180k", deals: "16 Deals" },
    { height: 78, year: "2024", value: "€210k", deals: "22 Deals" },
    { height: 96, year: "2025", value: "€250k", deals: "31 Deals" },
  ].map((bar, i) => (
    <span
      key={i}
      className={styles.ticketBar}
      style={{ height: `${bar.height}%`, "--i": i } as CSSProperties}
    >
      <em className={styles.ticketTooltip}>
        <strong>{bar.value}</strong>
        <small>{bar.year}</small>
        <small>{bar.deals}</small>
      </em>
    </span>
  ))}
</div>
        </article>
      </div>
    </section>
  );
}