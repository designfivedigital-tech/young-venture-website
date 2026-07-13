"use client";

import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import styles from "./UniversityStoriesPage.module.css";
import { STARTUPS, UNIVERSITIES, type Startup } from "./storiesData";

function handleCardMouseMove(e: MouseEvent<HTMLElement>) {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  const tiltX = (py - 0.5) * -10;
  const tiltY = (px - 0.5) * 12;

  card.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-4px)`;
  card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
  card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
}

function handleCardMouseLeave(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = "";
}

export default function UniversityStoriesPage() {
  const [active, setActive] = useState(UNIVERSITIES[0].key);
  const [selected, setSelected] = useState<Startup | null>(null);

  const list = useMemo(() => STARTUPS.filter((s) => s.uni === active), [active]);

  useEffect(() => {
    if (!selected) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const openDetail = (startup: Startup) => setSelected(startup);
  const closeDetail = () => setSelected(null);

  const handleCardKeyDown = (e: KeyboardEvent<HTMLElement>, startup: Startup) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    openDetail(startup);
  };

  const selectedUniversity = selected
    ? UNIVERSITIES.find((u) => u.key === selected.uni)
    : undefined;

  return (
    <section data-header-theme="light" className={styles.section}>
      <div className={styles.hero}>
        <h1>See some university stories</h1>
        <p>
          The companies born inside our network — famous alumni ventures and
          the founders we are watching. Pick a university to explore its
          stories.
        </p>
      </div>

      <div className={styles.filters} role="tablist" aria-label="Filter by university">
        {UNIVERSITIES.map((u) => (
          <button
            key={u.key}
            type="button"
            role="tab"
            aria-selected={active === u.key}
            className={`${styles.pill} ${active === u.key ? styles.pillActive : ""}`}
            onClick={() => setActive(u.key)}
          >
            {u.name}
          </button>
        ))}
      </div>

      <div className={styles.meta}>
        <span>
          {list.length} {list.length === 1 ? "story" : "stories"}
        </span>
        <span className={styles.legend}>
          <i /> In our portfolio
        </span>
      </div>

      <div className={styles.grid}>
        {list.map((s, index) => (
          <article
            key={s.name}
            className={`${styles.card} ${s.portfolio ? styles.cardPortfolio : ""}`}
            style={{ animationDelay: `${index * 45}ms` }}
            tabIndex={0}
            role="button"
            aria-label={`Open ${s.name} details`}
            onClick={() => openDetail(s)}
            onKeyDown={(e) => handleCardKeyDown(e, s)}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <span className={styles.dots} aria-hidden />
            <span className={styles.topline} aria-hidden />
            <span className={styles.year} aria-hidden>
              {s.founded}
            </span>

            {s.portfolio && <span className={styles.badge}>In our portfolio</span>}

            <div className={styles.top}>
              <span className={styles.overline}>{s.sector}</span>
              <h3 className={styles.name}>{s.name}</h3>
            </div>

            <div className={styles.bottom}>
              <p className={styles.founder}>
                <span>Founder</span>
                {s.founder}
              </p>
              <span className={styles.arrow}>→</span>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div className={styles.overlay} onClick={closeDetail}>
          <div
            className={`${styles.detail} ${selected.portfolio ? styles.detailPortfolio : ""}`}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.detailClose}
              onClick={closeDetail}
              aria-label="Close"
            >
              ×
            </button>

            {selected.portfolio && (
              <span className={`${styles.badge} ${styles.detailBadge}`}>In our portfolio</span>
            )}

            <p className={styles.detailLabel}>
              {selectedUniversity?.name} · {selected.sector}
            </p>
            <h2 className={styles.detailName}>{selected.name}</h2>
            <p className={styles.detailDesc}>{selected.description}</p>

            <dl className={styles.detailFacts}>
              <div>
                <dt>Founder</dt>
                <dd>{selected.founder}</dd>
              </div>
              <div>
                <dt>Founded</dt>
                <dd>{selected.founded}</dd>
              </div>
              <div>
                <dt>Headquarters</dt>
                <dd>{selected.hq}</dd>
              </div>
              <div>
                <dt>Stage</dt>
                <dd>{selected.stage}</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>{selected.employees}</dd>
              </div>
              <div>
                <dt>University</dt>
                <dd>{selectedUniversity?.name}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}
