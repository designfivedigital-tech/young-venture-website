"use client";

import { useEffect, useRef } from "react";
import "./slogan.css";

type WordTiming = {
  start: number;
  end: number;
};

export default function Slogan() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let frameId: number | null = null;

    const words: WordTiming[] = [
      { start: 0, end: 0.16 },
      { start: 0.14, end: 0.3 },
      { start: 0.28, end: 0.48 },
      { start: 0.46, end: 0.62 },
      { start: 0.6, end: 0.86 },
    ];

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;

      const current = -rect.top;
      const progress = Math.min(Math.max(current / maxScroll, 0), 1);

      wordRefs.current.forEach((el, index) => {
        if (!el) return;

        const timing = words[index];
        if (!timing) return;

        const wordProgress = Math.min(
          Math.max((progress - timing.start) / (timing.end - timing.start), 0),
          1
        );

        el.style.setProperty("--progress", `${wordProgress * 100}%`);
      });

      frameId = null;
    };

    const onScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="payoff-section">
      <div className="payoff-sticky">
        <h1 className="payoff-title">
          <span className="payoff-line">
            {["Born", "to", "Scout"].map((word, index) => (
              <span
                key={`${word}-${index}`}
                ref={(el) => {
                  wordRefs.current[index] = el;
                }}
                className="payoff-word"
              >
                {word}
              </span>
            ))}
          </span>

          <span className="payoff-line">
            {["the", "invisible"].map((word, index) => {
              const realIndex = index + 3;

              return (
                <span
                  key={`${word}-${realIndex}`}
                  ref={(el) => {
                    wordRefs.current[realIndex] = el;
                  }}
                  className="payoff-word"
                >
                  {word}
                </span>
              );
            })}
          </span>
        </h1>
      </div>
    </section>
  );
}