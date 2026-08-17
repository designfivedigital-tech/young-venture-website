"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

type ActiveShape = "youth" | "deep" | "clean" | null;

const images = {
  youth: "/images/hero/davide-hero.jpg",
  deep: "/images/hero/foto_team-hero.jpg",
  clean: "/images/hero/camilla-hero.jpg",
};

const paths = {
  youth:
    "M367.128,0l-.195,481.524L4.35,715.313C2.6,716.442,1.664,717.328,0,717.39V0Z",
  deep:
    "M833.187,716.67v531.144H9.26c.286-.96.712-1.3,1.995-2.127l818.071-527.2C830.964,717.432,831.73,716.711,833.187,716.67Z",
  clean:
    "M1112.784,0h367.128V184.822a21,21,0,0,0-5.095,2.79l-362.157,233.4Z",
};

const glowColors = {
  youth: "#da2991",
  deep: "#00e4e7",
  clean: "#77db21",
};

// Only the inner diagonal cut of each shape (not the two outer frame edges),
// so the traveling neon hands off from one segment straight into the next.
const autoGlowPaths = {
  youth: {
    d: "M0,717.39 C1.664,717.328,2.6,716.442,4.35,715.313 L366.933,481.524 L367.128,0",
    transform: undefined,
    travel: 915,
  },
  clean: {
    d: "M1112.784,0 L1112.66,421.012 L1474.817,187.612 a21,21,0,0,1,5.095,-2.79",
    transform: "translate(-652.153)",
    travel: 858,
  },
  deep: {
    d: "M833.187,716.67 C831.73,716.711,830.964,717.432,829.326,718.487 L11.255,1245.687 C9.972,1246.514,9.546,1246.854,9.26,1247.814",
    transform: "translate(-5.427 -420.055)",
    travel: 978,
  },
};

// five stacked layers per shape build a smooth tapered streak (core first:
// dash length, stroke width, opacity)
const SWEEP_LAYERS = [
  { len: 36, width: 4.4, op: 1 },
  { len: 50, width: 3.4, op: 0.75 },
  { len: 64, width: 2.5, op: 0.55 },
  { len: 80, width: 1.6, op: 0.35 },
  { len: 96, width: 0.9, op: 0.2 },
];

const SWEEP_SEQUENCE: { shape: Exclude<ActiveShape, null>; duration: number }[] = [
  { shape: "youth", duration: 2600 },
  { shape: "clean", duration: 2420 },
  { shape: "deep", duration: 2760 },
];

const imageEntries = Object.entries(images);
const MOBILE_SLIDE_INTERVAL = 4600;
const MOBILE_BLACKOUT_MS = 950;

export default function Hero() {
  const [activeShape, setActiveShape] = useState<ActiveShape>(null);
  const [visibleShape, setVisibleShape] = useState<ActiveShape>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [glowActive, setGlowActive] = useState(false);
  const [glowShape, setGlowShape] = useState<ActiveShape>(null);

  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  const [mobileBlackout, setMobileBlackout] = useState(false);

  const logoSvgRef = useRef<SVGSVGElement | null>(null);

  // Chained sweep lights on the inner edges: one shape at a time, five
  // stacked layers per shape, runs forever regardless of hover state.
  useEffect(() => {
    const svg = logoSvgRef.current;
    if (!svg) return;

    let stopped = false;
    let shapeIndex = 0;
    let activeAnimations: Animation[] = [];

    const sweep = () => {
      if (stopped) return;

      const { shape, duration } = SWEEP_SEQUENCE[shapeIndex];
      const travel = autoGlowPaths[shape].travel;
      const paths = svg.querySelectorAll<SVGPathElement>(
        `[data-shape="${shape}"]`
      );

      activeAnimations = Array.from(paths).map((path) => {
        const layer = SWEEP_LAYERS[Number(path.dataset.layer)];
        const shift = (layer.len - SWEEP_LAYERS[0].len) / 2;
        path.style.strokeDasharray = `${layer.len} ${travel + 200}`;
        path.style.strokeWidth = String(layer.width);
        path.style.opacity = String(layer.op);
        return path.animate(
          [
            { strokeDashoffset: `${shift + SWEEP_LAYERS[0].len}px` },
            { strokeDashoffset: `${-travel + shift}px` },
          ],
          { duration, easing: "linear" }
        );
      });

      Promise.all(activeAnimations.map((anim) => anim.finished))
        .then(() => {
          if (stopped) return;
          paths.forEach((path) => {
            path.style.opacity = "0";
          });
          shapeIndex = (shapeIndex + 1) % SWEEP_SEQUENCE.length;
          sweep();
        })
        .catch(() => {});
    };

    sweep();

    return () => {
      stopped = true;
      activeAnimations.forEach((anim) => anim.cancel());
    };
  }, []);

  // Mobile hero: rotate through the three images by fading to black, swapping
  // the image while hidden, then fading back in (not a direct crossfade).
  useEffect(() => {
    let swapTimeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setMobileBlackout(true);

      swapTimeout = setTimeout(() => {
        setMobileImageIndex((i) => (i + 1) % imageEntries.length);
        setMobileBlackout(false);
      }, MOBILE_BLACKOUT_MS);
    }, MOBILE_SLIDE_INTERVAL);

    return () => {
      clearInterval(interval);
      clearTimeout(swapTimeout);
    };
  }, []);

  useEffect(() => {
    if (activeShape) {
      setVisibleShape(activeShape);
      return;
    }

    const timeout = setTimeout(() => {
      setVisibleShape(null);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [activeShape]);

  useEffect(() => {
    return () => {
      delete document.body.dataset.cursor;
    };
  }, []);

  const activateGlow = (shape: Exclude<ActiveShape, null>) => {
    setGlowActive(true);
    setGlowShape(shape);
    document.body.dataset.cursor = shape;
  };

  const resetGlow = () => {
    setGlowActive(false);
    setGlowShape(null);
    delete document.body.dataset.cursor;
  };

  return (
    <section
      className={`${styles.hero} snap-section`}
      data-header-theme="dark"
      data-header-hero
      onMouseLeave={() => {
        setCursor(null);
        setActiveShape(null);
        resetGlow();
      }}
    >
      <div className={styles.background}>
        <div className={styles.desktopBackground}>
          {imageEntries.map(([key, src]) => (
            <Image
              key={key}
              src={src}
              alt=""
              fill
              priority
              className={`${styles.bgImage} ${
                visibleShape === key && activeShape ? styles.bgImageActive : ""
              }`}
            />
          ))}

          <div
            className={`${styles.blackBase} ${
              visibleShape ? styles.blackBaseHidden : ""
            }`}
          />

          {visibleShape && (
            <div
              className={`${styles.heroOverlay} ${
                activeShape ? styles.heroOverlayVisible : ""
              }`}
            />
          )}
        </div>

        <div className={styles.mobileBackground}>
          {imageEntries.map(([key, src], index) => (
            <Image
              key={key}
              src={src}
              alt=""
              fill
              priority={index === 0}
              className={`${styles.mobileBgImage} ${
                mobileImageIndex === index ? styles.mobileBgImageActive : ""
              }`}
            />
          ))}

          <div
            className={`${styles.mobileBlackout} ${
              mobileBlackout ? styles.mobileBlackoutActive : ""
            }`}
          />

          <div className={styles.mobileOverlayCutout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 827.76 827.759"
              className={styles.mobileOverlaySvg}
            >
              <defs>
                <mask
                  id="mobileOverlayMask"
                  maskUnits="userSpaceOnUse"
                  x="-10000"
                  y="-10000"
                  width="20000"
                  height="20000"
                >
                  <rect
                    x="-10000"
                    y="-10000"
                    width="20000"
                    height="20000"
                    fill="white"
                  />

                  <path d={paths.youth} fill="black" />

                  <path
                    d={paths.deep}
                    transform="translate(-5.427 -420.055)"
                    fill="black"
                  />

                  <path
                    d={paths.clean}
                    transform="translate(-652.153)"
                    fill="black"
                  />
                </mask>
              </defs>

              <rect
                x="-10000"
                y="-10000"
                width="20000"
                height="20000"
                fill="rgba(0,0,0,0.68)"
                mask="url(#mobileOverlayMask)"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroTitle}>
          <h1>Young Ventures</h1>
          <p>
            Investing in elite young funders before the world is watching.
          </p>
        </div>

        <div className={styles.logoWrap}>
          <svg
            ref={logoSvgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 827.76 827.759"
            className={styles.logoSvg}
            onMouseMove={(e) => {
              const svg = e.currentTarget;
              const point = svg.createSVGPoint();

              point.x = e.clientX;
              point.y = e.clientY;

              const matrix = svg.getScreenCTM();
              if (!matrix) return;

              const svgPoint = point.matrixTransform(matrix.inverse());

              setCursor({
                x: svgPoint.x,
                y: svgPoint.y,
              });
            }}
          >
            <defs>
              <filter
                id="softGlow"
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter
                id="geniusGlow"
                x="-180%"
                y="-180%"
                width="460%"
                height="460%"
              >
                <feGaussianBlur stdDeviation="22" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                </feMerge>
              </filter>

              <mask id="strokeGlowMaskYouth">
                <rect width="100%" height="100%" fill="black" />
                <path
                  d={paths.youth}
                  fill="transparent"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>

              <mask id="strokeGlowMaskDeep">
                <rect width="100%" height="100%" fill="black" />
                <path
                  d={paths.deep}
                  transform="translate(-5.427 -420.055)"
                  fill="transparent"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>

              <mask id="strokeGlowMaskClean">
                <rect width="100%" height="100%" fill="black" />
                <path
                  d={paths.clean}
                  transform="translate(-652.153)"
                  fill="transparent"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </mask>

              <radialGradient id="cursorGlowYouth" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#da2991" stopOpacity="1" />
                <stop offset="45%" stopColor="#da2991" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#da2991" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="cursorGlowDeep" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00e4e7" stopOpacity="1" />
                <stop offset="45%" stopColor="#00e4e7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#00e4e7" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="cursorGlowClean" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#77db21" stopOpacity="1" />
                <stop offset="45%" stopColor="#77db21" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#77db21" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g
              fill="transparent"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.9"
              strokeLinejoin="round"
              strokeLinecap="round"
              pointerEvents="none"
            >
              <path d={paths.youth} />
              <path d={paths.deep} transform="translate(-5.427 -420.055)" />
              <path d={paths.clean} transform="translate(-652.153)" />
            </g>

            {/* running lights on the inner edges: 5 stacked layers per shape,
                animated imperatively in a chained sweep (see useEffect) */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none">
              {(Object.keys(autoGlowPaths) as Exclude<ActiveShape, null>[]).map((shape) =>
                SWEEP_LAYERS.map((_, layerIndex) => (
                  <path
                    key={`${shape}-${layerIndex}`}
                    d={autoGlowPaths[shape].d}
                    transform={autoGlowPaths[shape].transform}
                    data-shape={shape}
                    data-layer={layerIndex}
                    className={styles.heroLight}
                    stroke={glowColors[shape]}
                    filter="url(#softGlow)"
                  />
                ))
              )}
            </g>

            {cursor && glowActive && glowShape === "youth" && (
              <>
                <circle
                  cx={cursor.x}
                  cy={cursor.y}
                  r="125"
                  fill="url(#cursorGlowYouth)"
                  mask="url(#strokeGlowMaskYouth)"
                  filter="url(#geniusGlow)"
                  opacity="0.75"
                  pointerEvents="none"
                />
                <circle
                  cx={cursor.x}
                  cy={cursor.y}
                  r="52"
                  fill="url(#cursorGlowYouth)"
                  mask="url(#strokeGlowMaskYouth)"
                  filter="url(#softGlow)"
                  pointerEvents="none"
                />
              </>
            )}

            {cursor && glowActive && glowShape === "deep" && (
              <>
                <circle
                  cx={cursor.x}
                  cy={cursor.y}
                  r="125"
                  fill="url(#cursorGlowDeep)"
                  mask="url(#strokeGlowMaskDeep)"
                  filter="url(#geniusGlow)"
                  opacity="0.75"
                  pointerEvents="none"
                />
                <circle
                  cx={cursor.x}
                  cy={cursor.y}
                  r="52"
                  fill="url(#cursorGlowDeep)"
                  mask="url(#strokeGlowMaskDeep)"
                  filter="url(#softGlow)"
                  pointerEvents="none"
                />
              </>
            )}

            {cursor && glowActive && glowShape === "clean" && (
              <>
                <circle
                  cx={cursor.x}
                  cy={cursor.y}
                  r="125"
                  fill="url(#cursorGlowClean)"
                  mask="url(#strokeGlowMaskClean)"
                  filter="url(#geniusGlow)"
                  opacity="0.75"
                  pointerEvents="none"
                />
                <circle
                  cx={cursor.x}
                  cy={cursor.y}
                  r="52"
                  fill="url(#cursorGlowClean)"
                  mask="url(#strokeGlowMaskClean)"
                  filter="url(#softGlow)"
                  pointerEvents="none"
                />
              </>
            )}

            <path
              d={paths.youth}
              fill="none"
              stroke="transparent"
              strokeWidth="190"
              pointerEvents="visibleStroke"
              onMouseEnter={() => activateGlow("youth")}
            />

            <path
              d={paths.deep}
              transform="translate(-5.427 -420.055)"
              fill="none"
              stroke="transparent"
              strokeWidth="190"
              pointerEvents="visibleStroke"
              onMouseEnter={() => activateGlow("deep")}
            />

            <path
              d={paths.clean}
              transform="translate(-652.153)"
              fill="none"
              stroke="transparent"
              strokeWidth="160"
              pointerEvents="visibleStroke"
              onMouseEnter={() => activateGlow("clean")}
            />

            <path
              d={paths.youth}
              fill="black"
              fillOpacity="0"
              pointerEvents="fill"
              onMouseEnter={() => {
                setActiveShape("youth");
                activateGlow("youth");
              }}
              onMouseLeave={() => setActiveShape(null)}
            />

            <path
              d={paths.deep}
              transform="translate(-5.427 -420.055)"
              fill="black"
              fillOpacity="0"
              pointerEvents="fill"
              onMouseEnter={() => {
                setActiveShape("deep");
                activateGlow("deep");
              }}
              onMouseLeave={() => setActiveShape(null)}
            />

            <path
              d={paths.clean}
              transform="translate(-652.153)"
              fill="black"
              fillOpacity="0"
              pointerEvents="fill"
              onMouseEnter={() => {
                setActiveShape("clean");
                activateGlow("clean");
              }}
              onMouseLeave={() => setActiveShape(null)}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}