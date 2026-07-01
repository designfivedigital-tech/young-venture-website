"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./AboutUsPage.module.css";
import { FOCUS_ITEMS } from "./focusAreasData";

export default function FocusAreasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [wheelProgress, setWheelProgress] = useState(0);

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

        const exact = p * (FOCUS_ITEMS.length - 1);
        const idx = Math.max(0, Math.min(FOCUS_ITEMS.length - 1, Math.round(exact)));

        setWheelProgress(exact);
        setActive((prev) => (prev === idx ? prev : idx));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + (index / (FOCUS_ITEMS.length - 1)) * total;

    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  const current = FOCUS_ITEMS[active];
  const centerIndex = Math.round(wheelProgress);
  const visibleItems = 7;

  return (
    <section ref={sectionRef} className={styles.focusSection} data-header-theme="light">
      <div className={styles.focusSticky}>
        <div className={styles.focusInner}>
          <div className={styles.focusTop}>
            <div>
              <p className={styles.focusLabel}>Focus areas</p>
              <h2 className={styles.focusHeading}>Our definition of deep tech</h2>
            </div>

            <p className={styles.focusDesc}>
              Our focus spans sectors where scientific breakthroughs can unlock meaningful economic and
              societal impact, including climate and energy technologies, advanced materials, robotics,
              industrial automation, medical technologies, computational biology, and frontier
              physics-based innovations.
            </p>
          </div>
        </div>

        <div className={styles.focusBody}>
          <div className={styles.wheel} role="listbox" aria-label="Focus areas">
            <div className={styles.wheelArc} aria-hidden />

            {Array.from({ length: visibleItems }).map((_, virtualIndex) => {
              const virtualOffset = virtualIndex - Math.floor(visibleItems / 2);

              const realIndex =
                ((centerIndex + virtualOffset) % FOCUS_ITEMS.length + FOCUS_ITEMS.length) %
                FOCUS_ITEMS.length;

              let offset = realIndex - wheelProgress;

              if (offset > FOCUS_ITEMS.length / 2) offset -= FOCUS_ITEMS.length;
              if (offset < -FOCUS_ITEMS.length / 2) offset += FOCUS_ITEMS.length;

              const item = FOCUS_ITEMS[realIndex];
              const Icon = item.Icon;
              const distance = Math.abs(offset);
              const isActive = realIndex === active && distance < 0.55;

              const opacity =
                distance < 0.55 ? 1 : distance < 1.55 ? 0.55 : distance < 2.55 ? 0.32 : 0.14;

              return (
                <button
                  key={`${realIndex}-${virtualIndex}`}
                  type="button"
                  className={`${styles.wheelItem} ${isActive ? styles.active : ""}`}
                  style={{ "--offset": offset, opacity } as CSSProperties}
                  onClick={() => goTo(realIndex)}
                  role="option"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                >
                  <span className={styles.wheelInner}>
                    <span className={styles.wheelIcon}>
                      <Icon />
                    </span>

                    <span className={styles.wheelLabel}>
                      <span className={styles.mobileTitle}>{item.label}</span>
                      <span className={styles.mobileDescription}>{item.description}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className={styles.focusContent}>
            <div key={`content-${active}`} className={styles.focusContentInner}>
              <span className={styles.focusContentNumber}>
                {String(active + 1).padStart(2, "0")}
              </span>

              <h3>{current.title}</h3>
              <p>{current.description}</p>

              <a href={current.link}>
                Learn more
                <span>→</span>
              </a>
            </div>
          </div>

          <div className={styles.media}>
            <div className={styles.mediaInner}>
              <div key={`media-${active}`} className={styles.slide} style={{ background: current.bg }}>
                {current.image ? (
                  <img src={current.image} alt={current.title} />
                ) : (
                  <span className={styles.slidePlaceholder}>
                    {current.title}
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