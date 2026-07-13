"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import styles from "./AboutUsPage.module.css";

const beliefs = [
  {
    title: "For us, innovation means three things:",
    text: "research, venture capital, and policy.",
  },
  {
    title: "Being young means people underestimate you.",
    text: "We turn that into an advantage.",
  },
  {
    title: "We understand the founder first.",
    text: "Because every great technology eventually needs a market.",
  },
  {
    title: "We invest for the future we want to help build.",
    text: "Not just for a mandate.\nNot just for a covenant.",
  },
  {
    title: "Venture capital has too much noise.",
    text: "We create synergies, not jealousy.",
  },
  {
    title: "Network is net worth.",
    text: "Sales is discipline.\nWe move first, fast, and relentlessly.",
  },
  {
    title: "We come from the best universities.",
    text: "We think ambitiously.\nWe work like nothing is guaranteed.",
  },
];

export default function BeliefsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const ghostCurrentRef = useRef(1);

  const [visible, setVisible] = useState<boolean[]>(() => beliefs.map(() => false));
  const [ghost, setGhostState] = useState({ number: 1, swap: false });

  const setGhost = useCallback((n: number) => {
    if (ghostCurrentRef.current === n) return;
    ghostCurrentRef.current = n;
    setGhostState((s) => ({ ...s, swap: true }));
    window.setTimeout(() => {
      setGhostState({ number: n, swap: false });
    }, 220);
  }, []);

  useEffect(() => {
    const items = itemRefs.current;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = items.indexOf(entry.target as HTMLDivElement);
          if (idx === -1) return;
          setVisible((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );

    items.forEach((el) => el && revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (hoveringRef.current) return;

      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });

      setGhost(best + 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [setGhost]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    const r = section.getBoundingClientRect();
    glow.style.left = `${e.clientX - r.left}px`;
    glow.style.top = `${e.clientY - r.top}px`;
  };

  return (
    <section
      ref={sectionRef}
      className={styles.beliefsSection}
      data-header-theme="dark"
      onMouseEnter={() => {
        hoveringRef.current = true;
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
      }}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.beliefsInner}>
        <div className={styles.beliefsIntro}>
          <h2>What we believe</h2>
          <div className={styles.beliefsLine} />
          <p>
            Our principles guide every decision we make and every founder we
            support.
          </p>
        </div>

        <div className={styles.beliefsList}>
          {beliefs.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`${styles.beliefItem} ${visible[index] ? styles.beliefVisible : ""}`}
              style={{ transitionDelay: `${index * 0.12}s` }}
              onMouseEnter={() => setGhost(index + 1)}
            >
              <div className={styles.beliefNumber}>{index + 1}</div>

              <div className={styles.beliefText}>
                <h3>{item.title}</h3>
                <p>
                  {item.text.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.beliefGhost} ${ghost.swap ? styles.ghostSwap : ""}`}>
        {ghost.number}
      </div>
      <div ref={glowRef} className={styles.beliefGlow} />
    </section>
  );
}
