"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import "./slogan.css";

type WordTiming = {
  start: number;
  end: number;
};

export default function Slogan() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const title = titleRef.current;
    const line = lineRef.current;
    if (!title || !line) return;

    const fitTitle = () => {
      title.style.fontSize = "";

      // below 768px the title is allowed to wrap onto multiple lines
      // (see slogan.css), so it doesn't need to be shrunk to fit one line
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const style = window.getComputedStyle(title);
      const horizontalPadding =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const available = title.clientWidth - horizontalPadding;
      const needed = line.scrollWidth;

      if (available > 0 && needed > available) {
        const current = parseFloat(style.fontSize);
        title.style.fontSize = `${(current * available) / needed}px`;
      }
    };

    fitTitle();
    window.addEventListener("resize", fitTitle);

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(fitTitle);
    }

    return () => window.removeEventListener("resize", fitTitle);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    // Releasing the snap as soon as Slogan enters the viewport (rather than
    // when Commitments finishes leaving it) avoids a dead zone where
    // mandatory snap-type has nothing left to snap to but Slogan still
    // isn't recognized as "arrived" - that gap was trapping the scroll.
    // The release must also stay on once Slogan has scrolled fully past
    // (entry.boundingClientRect.bottom < 0) - otherwise, by the time the
    // user reaches the footer, Slogan is no longer intersecting, snapping
    // re-activates with nothing left to snap to, and the scroll gets
    // pulled back instead of reaching the footer. It only re-locks when
    // Slogan hasn't been reached yet (still below the viewport, scrolling
    // back up from it).
    const observer = new IntersectionObserver(
      ([entry]) => {
        const reachedOrPast =
          entry.isIntersecting || entry.boundingClientRect.bottom < 0;

        document.documentElement.classList.toggle(
          "snap-scroll-released",
          reachedOrPast
        );
      },
      { threshold: 0 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("snap-scroll-released");
    };
  }, []);

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
    <section ref={sectionRef} className="payoff-section snap-section">
      <div className="payoff-sticky">
        <h1 className="payoff-title" ref={titleRef}>
  <span className="payoff-line" ref={lineRef}>
    {["Born", "to", "Scout", "the", "invisible"].map((word, index) => (
      <Fragment key={`${word}-${index}`}>
        {index > 0 ? " " : ""}
        <span
          ref={(el) => {
            wordRefs.current[index] = el;
          }}
          className="payoff-word"
        >
          {word}
        </span>
      </Fragment>
    ))}
  </span>
</h1>
      </div>
    </section>
  );
}