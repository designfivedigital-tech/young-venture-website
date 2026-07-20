"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./AboutUsPage.module.css";
import { FOCUS_ITEMS } from "./focusAreasData";

const STEP = 32;
const RADIUS = 300;

export default function FocusAreasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [wheelProgress, setWheelProgress] = useState(0);
  const [entered, setEntered] = useState(false);

  // Below 1024px the section is a plain accordion (see AboutUsPage.module.css),
  // so the scroll-driven 3D drum selection is disabled and clicking a row
  // just opens/closes it directly.
  const isCompactRef = useRef(false);

  useEffect(() => {
    const checkCompact = () => {
      isCompactRef.current = window.matchMedia("(max-width: 1024px)").matches;
    };

    checkCompact();
    window.addEventListener("resize", checkCompact);
    return () => window.removeEventListener("resize", checkCompact);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (isCompactRef.current) return;
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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEntered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + (index / (FOCUS_ITEMS.length - 1)) * total;

    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  const selectItem = (index: number) => {
    if (isCompactRef.current) {
      setActive(index);
      return;
    }

    goTo(index);
  };

  const current = FOCUS_ITEMS[active];
  const entryOffset = entered ? 0 : 140;

  return (
    <section ref={sectionRef} className={styles.focusSection} data-header-theme="light">
      <div className={styles.focusSticky}>
        <div className={styles.focusInner}>
          <div className={styles.focusTop}>
            <div>
              <p className={styles.focusLabel}>Focus areas</p>
              <h2 className={styles.focusHeading}>Our definition of deep tech</h2>
            </div>
          </div>
        </div>

        <div className={styles.focusBody}>
          <div className={`${styles.drumScene} ${entered ? "" : styles.drumPre}`}>
            <span className={styles.drumMarker} aria-hidden />

            <div
              className={styles.drumRing}
              style={{
                transform: `translateZ(${-RADIUS}px) rotateX(${wheelProgress * STEP + entryOffset}deg)`,
              }}
              role="listbox"
              aria-label="Focus areas"
            >
              {FOCUS_ITEMS.map((item, index) => {
                const Icon = item.Icon;
                const distance = Math.abs(index - wheelProgress);
                const isActive = index === active;

                const opacity =
                  distance < 0.55 ? 1 : distance < 1.55 ? 0.5 : distance < 2.55 ? 0.15 : 0.05;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.drumItem} ${isActive ? styles.active : ""}`}
                    style={{
                      transform: `rotateX(${-index * STEP}deg) translateZ(${RADIUS}px)`,
                      opacity,
                    } as CSSProperties}
                    onClick={() => selectItem(index)}
                    role="option"
                    aria-selected={isActive}
                    aria-expanded={isActive}
                    tabIndex={isActive ? 0 : -1}
                  >
                    <span className={styles.drumIcon}>
                      <Icon />
                    </span>
                    <span className={styles.drumTitle}>{item.label}</span>
                    <span className={styles.mobileDescription}>{item.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.focusContent}>
            <div key={`content-${active}`} className={styles.focusContentInner}>
              <p>{current.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
