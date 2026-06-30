"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutUsPage.module.css";

/* ── Icone (stroke, currentColor) ───────────────────────────── */
function CpuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  );
}
function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18h6M10 22h4" />
      <path d="M15.1 14c.2-.8.8-1.4 1.3-2 1.3-1.3 1.6-2.5 1.6-3.5A6 6 0 1 0 6 8.5c0 1 .3 2.2 1.6 3.5.5.6 1.1 1.2 1.3 2" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
      <path d="M2 21c0-3 1.9-5.4 5.1-6" />
    </svg>
  );
}
function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}
function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1Z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2Z" />
      <path d="M9 12H4s.5-2.8 2-4c1.7-1.3 5 0 5 0M12 15v5s2.8-.5 4-2c1.3-1.7 0-5 0-5" />
    </svg>
  );
}
function AtomIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="1" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    </svg>
  );
}
function DnaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 3c0 6 16 6 16 12M20 21c0-6-16-6-16-12" />
      <path d="M7 5h10M7 19h10M6 9h12M6 15h12" />
    </svg>
  );
}

/* ── Dati: 7 voci. Le prime 5 dal mockup, le ultime 2 inventate. ─
   Sostituisci i placeholder mettendo image: "/percorso.jpg"        */
const FOCUS_ITEMS = [
  { id: 1, label: "Digital and frontier technologies", Icon: CpuIcon, bg: "linear-gradient(135deg,#0a1a3f,#1e3a6e)", image: null as string | null },
  { id: 2, label: "Digital and frontier technologies", Icon: BulbIcon, bg: "linear-gradient(135deg,#2b1a4f,#5b3fb0)", image: null as string | null },
  { id: 3, label: "Sustainability and advanced industries", Icon: LeafIcon, bg: "linear-gradient(135deg,#0e3a1f,#2f9e4f)", image: null as string | null },
  { id: 4, label: "Human argumentation and advanced materials", Icon: NetworkIcon, bg: "linear-gradient(135deg,#3a0e3a,#a01f7e)", image: null as string | null },
  { id: 5, label: "Digital and frontier technologies", Icon: RocketIcon, bg: "linear-gradient(135deg,#0a2a3f,#1f8ea0)", image: null as string | null },
  { id: 6, label: "Robotics and industrial automation", Icon: AtomIcon, bg: "linear-gradient(135deg,#3f1a0e,#c0562e)", image: null as string | null },
  { id: 7, label: "Computational biology and life sciences", Icon: DnaIcon, bg: "linear-gradient(135deg,#0e2f3f,#19a3c3)", image: null as string | null },
];

function FocusAreasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const el = sectionRef.current;
        if (!el) return;
        const vh = window.innerHeight;
        const total = el.offsetHeight - vh;
        const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        let idx = Math.floor(p * FOCUS_ITEMS.length);
        idx = Math.max(0, Math.min(FOCUS_ITEMS.length - 1, idx));
        setActive((prev) => (prev === idx ? prev : idx));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + ((i + 0.5) / FOCUS_ITEMS.length) * total;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  const current = FOCUS_ITEMS[active];

  return (
    <section ref={sectionRef} className={styles.focusSection} data-header-theme="light">
      <div className={styles.focusSticky}>
        {/* ── Fascia 1: header ── */}
        <div className={styles.focusInner}>
          <div className={styles.focusTop}>
            <div>
              <p className={styles.focusLabel}>Focus areas</p>
              <h2 className={styles.focusHeading}>Our definition of deep tech</h2>
              <div className={styles.focusUnderline} />
            </div>
            <p className={styles.focusDesc}>
              Our focus spans sectors where scientific breakthroughs can unlock meaningful economic and
              societal impact, including climate and energy technologies, advanced materials, robotics,
              industrial automation, medical technologies, computational biology, and frontier
              physics-based innovations.
            </p>
          </div>
        </div>

        {/* ── Fascia 2: ruota (sx) + cerchio (dx) ── */}
        <div className={styles.focusBody}>
          <div
  className={styles.wheel}
  style={{ "--active": active } as React.CSSProperties}
  role="listbox"
  aria-label="Focus areas"
>
  <div className={styles.wheelArc} aria-hidden />

  {Array.from({ length: FOCUS_ITEMS.length + 4 }).map((_, virtualIndex) => {
    const offset = virtualIndex - 2;

    const realIndex =
      ((active + offset) % FOCUS_ITEMS.length + FOCUS_ITEMS.length) %
      FOCUS_ITEMS.length;

    const item = FOCUS_ITEMS[realIndex];
    const Icon = item.Icon;

    const isActive = offset === 0;

    const op =
      Math.abs(offset) === 0
        ? 1
        : Math.abs(offset) === 1
          ? 0.55
          : Math.abs(offset) === 2
            ? 0.32
            : 0.14;

    return (
      <button
        key={`${realIndex}-${virtualIndex}`}
        type="button"
        className={`${styles.wheelItem} ${isActive ? styles.active : ""}`}
        style={
          {
            "--offset": offset,
            opacity: op,
          } as React.CSSProperties
        }
        onClick={() => goTo(realIndex)}
        role="option"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
      >
        <span className={styles.wheelInner}>
          <span className={styles.wheelIcon}>
            <Icon />
          </span>

          <span className={styles.wheelLabel}>{item.label}</span>
        </span>
      </button>
    );
  })}
</div>

          <div className={styles.media}>
            <div className={styles.mediaInner}>
              <div key={active} className={styles.slide} style={{ background: current.bg }}>
                {current.image ? (
                  <img src={current.image} alt={current.label} />
                ) : (
                  <span className={styles.slidePlaceholder}>
                    {current.label}
                    <small>Immagine {active + 1} — placeholder</small>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutUsPage() {
  return (
    <main className={styles.aboutPage}>
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
              We are ready to uncover ideas looking for where they hide; in a
              lab, in a thesis, in a half-finished line of code. We are Young
              Ventures and we are born to scout the invisible.
            </p>
          </div>
        </div>
      </section>

      <FocusAreasSection />
    </main>
  );
}