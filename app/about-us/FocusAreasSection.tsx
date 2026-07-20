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

  const isMobileRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.matchMedia("(max-width: 767px)").matches;
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (isMobileRef.current) return;
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

  const goNextItem = () => {
    if (active >= FOCUS_ITEMS.length - 1) return false;
    setActive(active + 1);
    return true;
  };

  const goPrevItem = () => {
    if (active <= 0) return false;
    setActive(active - 1);
    return true;
  };

  // Mobile: intercept touch-scroll so each swipe steps through one focus
  // area at a time instead of free-scrolling past the whole list.
  useEffect(() => {
    if (!isMobileRef.current) return;

    const section = sectionRef.current;
    if (!section) return;

    let startY = 0;

    const onTouchStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY;
    };

    const preventScroll = (event: TouchEvent) => {
      const currentY = event.touches[0].clientY;
      const deltaY = startY - currentY;

      const isScrollingDown = deltaY > 0;
      const isScrollingUp = deltaY < 0;

      const canGoNextInsideSection = isScrollingDown && active < FOCUS_ITEMS.length - 1;
      const canGoPrevInsideSection = isScrollingUp && active > 0;

      if (canGoNextInsideSection || canGoPrevInsideSection) {
        event.preventDefault();
      }
    };

    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove", preventScroll);
    };
  }, [active]);

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

  const current = FOCUS_ITEMS[active];
  const entryOffset = entered ? 0 : 140;

  return (
    <section
      ref={sectionRef}
      className={styles.focusSection}
      data-header-theme="light"
      onTouchStart={(event) => {
        if (!isMobileRef.current) return;
        touchStartYRef.current = event.touches[0].clientY;
      }}
      onTouchEnd={(event) => {
        if (!isMobileRef.current) return;
        if (touchStartYRef.current === null) return;

        const endY = event.changedTouches[0].clientY;
        const deltaY = touchStartYRef.current - endY;

        touchStartYRef.current = null;

        if (Math.abs(deltaY) < 35) return;

        if (deltaY > 0) {
          goNextItem();
        } else {
          goPrevItem();
        }
      }}
    >
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
          <p className={styles.mobileProgress}>
            {active + 1} / {FOCUS_ITEMS.length}
          </p>

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
                    onClick={() => goTo(index)}
                    role="option"
                    aria-selected={isActive}
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
