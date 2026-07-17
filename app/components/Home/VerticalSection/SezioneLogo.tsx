"use client";

import { useEffect, useRef, useState } from "react";
import "./SezioneLogo.css";

type Step = 1 | 2 | 3;

type SezioneLogoProps = {
  activeStep: Step;
  setActiveStep: (step: Step) => void;
};

const blocks = [
  {
    step: 1 as Step,
    title: "Youth",
    color: "pink",
    cursor: "youth",
    copy: "Investiamo nelle idee e nei talenti che stanno costruendo il futuro. Supportiamo team visionari con energia e voglia di cambiare le regole del gioco.",
  },
  {
    step: 2 as Step,
    title: "Clean Tech",
    color: "green",
    cursor: "clean",
    copy: "Sosteniamo tecnologie che migliorano il nostro pianeta. Dall'energia pulita alla mobilità sostenibile, investiamo in soluzioni che coniugano innovazione e responsabilità ambientale.",
  },
  {
    step: 3 as Step,
    title: "Deep Tech",
    color: "cyan",
    cursor: "deep",
    copy: "Crediamo nel potere della scienza e della tecnologia per risolvere le sfide più complesse. Investiamo in ricerca avanzata e startup deep tech che possono ridefinire il futuro.",
  },
];

const visualBlocks = [
  blocks[2], // 0 - Deep
  blocks[0], // 1 - Youth
  blocks[1], // 2 - Clean
  blocks[2], // 3 - Deep
  blocks[0], // 4 - Youth centrale
  blocks[1], // 5 - Clean centrale
  blocks[2], // 6 - Deep centrale
  blocks[0], // 7 - Youth
  blocks[1], // 8 - Clean
];

const getCentralIndexFromStep = (step: Step) => {
  if (step === 1) return 4;
  if (step === 2) return 5;
  return 6;
};

export default function SezioneLogo({
  activeStep,
  setActiveStep,
}: SezioneLogoProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isMobileRef = useRef(false);
  const blocksRef = useRef<HTMLElement[]>([]);
  const nodesRef = useRef<HTMLSpanElement[]>([]);
  const fillRef = useRef<HTMLDivElement | null>(null);

  const [visualActiveIndex, setVisualActiveIndex] = useState(
    getCentralIndexFromStep(activeStep)
  );

  const currentStep = visualBlocks[visualActiveIndex].step;

  const resetCursor = () => {
    delete document.body.dataset.cursor;
  };

  const moveTrackToIndex = (index: number, animated = true) => {
    const track = trackRef.current;
    const contentEl = contentRef.current;
    const target = blocksRef.current[index];

    if (!track || !contentEl || !target) return;

    const containerH = contentEl.clientHeight;
    const blockTop = target.offsetTop;
    const blockH = target.offsetHeight;
    const offset = -(blockTop - (containerH - blockH) / 2);

    if (!animated) {
      track.style.transition = "none";
    }

    track.style.transform = `translateY(${offset}px)`;

    if (!animated) {
      requestAnimationFrame(() => {
        track.style.transition = "";
      });
    }
  };

  const goToColor = (targetStep: Step) => {
    if (targetStep === currentStep) return;

    const possibleIndexes = visualBlocks
      .map((block, index) => ({ step: block.step, index }))
      .filter((item) => item.step === targetStep);

    const nearest = possibleIndexes.reduce((closest, item) => {
      const closestDistance = Math.abs(closest.index - visualActiveIndex);
      const itemDistance = Math.abs(item.index - visualActiveIndex);

      return itemDistance < closestDistance ? item : closest;
    });

    setVisualActiveIndex(nearest.index);
    setActiveStep(targetStep);
  };

  useEffect(() => {
    const newCentralIndex = getCentralIndexFromStep(activeStep);

    if (activeStep !== currentStep) {
      setVisualActiveIndex(newCentralIndex);
    }
  }, [activeStep, currentStep]);

  useEffect(() => {
    const stage = stageRef.current;
    const fill = fillRef.current;

    if (!stage || !fill) return;

    stage.dataset.step = String(currentStep);

    moveTrackToIndex(visualActiveIndex, true);

    blocksRef.current.forEach((block, index) => {
      block.classList.toggle("active", index === visualActiveIndex);
    });

    nodesRef.current.forEach((node, index) => {
      node.dataset.active = index + 1 === currentStep ? "true" : "false";
    });

    const fillPct = currentStep === 1 ? 0 : currentStep === 2 ? 50 : 100;
    fill.style.height = `${fillPct}%`;
  }, [visualActiveIndex, currentStep]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (visualActiveIndex <= 1 || visualActiveIndex >= 7) {
        const centralIndex = getCentralIndexFromStep(currentStep);

        setVisualActiveIndex(centralIndex);

        requestAnimationFrame(() => {
          moveTrackToIndex(centralIndex, false);
        });
      }
    }, 760);

    return () => window.clearTimeout(timeout);
  }, [visualActiveIndex, currentStep]);

  useEffect(() => {
    return () => resetCursor();
  }, []);

  const setNodeRef = (index: number) => (el: HTMLSpanElement | null) => {
    if (el) nodesRef.current[index] = el;
  };


  useEffect(() => {
  const checkMobile = () => {
    isMobileRef.current = window.matchMedia("(max-width: 1024px)").matches;
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  return () => window.removeEventListener("resize", checkMobile);
}, []);

const goNextStep = () => {
  if (currentStep < 3) {
    goToColor((currentStep + 1) as Step);
    return true;
  }

  return false;
};

const goPrevStep = () => {
  if (currentStep > 1) {
    goToColor((currentStep - 1) as Step);
    return true;
  }

  return false;
};

useEffect(() => {
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;
  if (!isMobile) return;

  const section = document.querySelector<HTMLElement>(".sl-scroll-section");
  if (!section) return;

  let startY = 0;

  const onTouchStart = (event: Event) => {
    const touchEvent = event as TouchEvent;
    startY = touchEvent.touches[0].clientY;
  };

  const preventScroll = (event: Event) => {
    const touchEvent = event as TouchEvent;
    const currentY = touchEvent.touches[0].clientY;
    const deltaY = startY - currentY;

    const isScrollingDown = deltaY > 0;
    const isScrollingUp = deltaY < 0;

    const canGoNextInsideSection = isScrollingDown && activeStep < 3;
    const canGoPrevInsideSection = isScrollingUp && activeStep > 1;

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
}, [activeStep]);


  return (
    <section
      className="sl-scroll-section snap-section"
      data-header-theme="light"
      onMouseLeave={resetCursor}
      onPointerLeave={resetCursor}
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
      goNextStep();
    } else {
      goPrevStep();
    }
  }}
>
      <div className="sl-sticky">
        <div className="sl-grid">
          <div className="sl-logo-stage" ref={stageRef} data-step="1">
            <div className="sl-floor" />

            <svg
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="slGPink" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff3d8e" />
                  <stop offset="100%" stopColor="#d6116a" />
                </linearGradient>

                <linearGradient id="slGGreen" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7ad84a" />
                  <stop offset="100%" stopColor="#43b026" />
                </linearGradient>

                <linearGradient id="slGCyan" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2dd0e6" />
                  <stop offset="100%" stopColor="#0aa3bd" />
                </linearGradient>

                <linearGradient id="slSheen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>

              <g
                className="sl-shape sl-shape--pink"
                data-cursor="youth"
                onClick={() => goToColor(1)}
                onMouseLeave={resetCursor}
                onPointerLeave={resetCursor}
                role="button"
                tabIndex={0}
              >
                <path
                  d="M354.82,0l-.19,465.38L4.2,691.32c-1.69,1.09-2.6,1.95-4.2,2.01V0h354.82Z"
                  fill="url(#slGPink)"
                />
                <path
                  d="M354.82,0l-.19,465.38L4.2,691.32c-1.69,1.09-2.6,1.95-4.2,2.01V0h354.82Z"
                  fill="url(#slSheen)"
                />
              </g>

              <g
                className="sl-shape sl-shape--green"
                data-cursor="clean"
                onClick={() => goToColor(2)}
                onMouseLeave={resetCursor}
                onPointerLeave={resetCursor}
                role="button"
                tabIndex={0}
              >
                <path
                  d="M445.18,0h354.82v178.62c-1.76.57-2.89,1.39-4.92,2.7l-350.01,225.58.12-406.9Z"
                  fill="url(#slGGreen)"
                />
                <path
                  d="M445.18,0h354.82v178.62c-1.76.57-2.89,1.39-4.92,2.7l-350.01,225.58.12-406.9Z"
                  fill="url(#slSheen)"
                />
              </g>

              <g
                className="sl-shape sl-shape--cyan"
                data-cursor="deep"
                onClick={() => goToColor(3)}
                onMouseLeave={resetCursor}
                onPointerLeave={resetCursor}
                role="button"
                tabIndex={0}
              >
                <path
                  d="M800,286.67v513.33H3.7c.28-.93.69-1.26,1.93-2.06l790.64-509.52c1.58-1.02,2.32-1.72,3.73-1.76Z"
                  fill="url(#slGCyan)"
                />
                <path
                  d="M800,286.67v513.33H3.7c.28-.93.69-1.26,1.93-2.06l790.64-509.52c1.58-1.02,2.32-1.72,3.73-1.76Z"
                  fill="url(#slSheen)"
                />
              </g>
            </svg>
          </div>

          <div className="sl-content" ref={contentRef}>
            <div className="sl-content-track" ref={trackRef}>
              {visualBlocks.map((block, index) => (
                <article
                  key={`${block.step}-${index}`}
                  className={`sl-block sl-block--${block.color}`}
                  data-block={block.step}
                  ref={(el) => {
                    if (el) blocksRef.current[index] = el;
                  }}
                >
                  <div className="sl-block__head">
                    <span className="sl-dot" />
                  </div>

                  <h2 className="sl-title">{block.title}</h2>
                  <div className="sl-underline" />
                  <p className="sl-copy">{block.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="sl-rail" aria-hidden="true">
            <div className="sl-rail__track">
              <div className="sl-rail__fill" ref={fillRef} />
            </div>

            <div className="sl-rail__nodes">
              <span
                className="sl-node"
                data-color="pink"
                data-active="false"
                ref={setNodeRef(0)}
              >
                <span className="sl-node__label">01 · Youth</span>
              </span>

              <span
                className="sl-node"
                data-color="green"
                data-active="false"
                ref={setNodeRef(1)}
              >
                <span className="sl-node__label">02 · Clean Tech</span>
              </span>

              <span
                className="sl-node"
                data-color="cyan"
                data-active="false"
                ref={setNodeRef(2)}
              >
                <span className="sl-node__label">03 · Deep Tech</span>
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}