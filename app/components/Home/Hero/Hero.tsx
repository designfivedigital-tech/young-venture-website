"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

type ActiveShape = "youth" | "deep" | "clean" | null;

const images = {
  youth: "/images/hero/youth.jpg",
  deep: "/images/hero/deep-tech.jpg",
  clean: "/images/hero/clean-tech.jpg",
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

const imageEntries = Object.entries(images);

export default function Hero() {
  const [activeShape, setActiveShape] = useState<ActiveShape>(null);
  const [visibleShape, setVisibleShape] = useState<ActiveShape>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [glowActive, setGlowActive] = useState(false);
  const [glowShape, setGlowShape] = useState<ActiveShape>(null);
  const [autoGlowShape, setAutoGlowShape] = useState<ActiveShape>(null);

  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  const [mobileImageVisible, setMobileImageVisible] = useState(false);

  useEffect(() => {
    const shapes: Exclude<ActiveShape, null>[] = ["youth", "deep", "clean"];
    setAutoGlowShape(shapes[Math.floor(Math.random() * shapes.length)]);
  }, []);

  useEffect(() => {
    let index = 0;
    let fadeInTimeout: ReturnType<typeof setTimeout>;
    let fadeOutTimeout: ReturnType<typeof setTimeout>;
    let nextImageTimeout: ReturnType<typeof setTimeout>;

    const runSlide = () => {
      setMobileImageIndex(index);
      setMobileImageVisible(true);

      fadeOutTimeout = setTimeout(() => {
        setMobileImageVisible(false);
      }, 5000);

      nextImageTimeout = setTimeout(() => {
        index = (index + 1) % imageEntries.length;
        runSlide();
      }, 8000);
    };

    fadeInTimeout = setTimeout(() => {
      runSlide();
    }, 500);

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(nextImageTimeout);
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

  const stopAutoGlow = () => {
    if (autoGlowShape) setAutoGlowShape(null);
  };

  const activateGlow = (shape: Exclude<ActiveShape, null>) => {
    stopAutoGlow();
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
    <section className={`${styles.hero} snap-section`} data-header-theme="dark" data-header-hero>
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
                mobileImageIndex === index && mobileImageVisible
                  ? styles.mobileBgImageActive
                  : ""
              }`}
            />
          ))}

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className={styles.logoWrap}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 827.76 827.759"
            className={styles.logoSvg}
            onMouseMove={(e) => {
              stopAutoGlow();

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
            onMouseLeave={() => {
              setCursor(null);
              setActiveShape(null);
              resetGlow();
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

            {autoGlowShape && (
              <path
                d={paths[autoGlowShape]}
                transform={
                  autoGlowShape === "deep"
                    ? "translate(-5.427 -420.055)"
                    : autoGlowShape === "clean"
                      ? "translate(-652.153)"
                      : undefined
                }
                fill="transparent"
                stroke={glowColors[autoGlowShape]}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="90 1400"
                className={styles.autoGlowPath}
                filter="url(#softGlow)"
                pointerEvents="none"
              />
            )}

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
              onMouseLeave={resetGlow}
            />

            <path
              d={paths.deep}
              transform="translate(-5.427 -420.055)"
              fill="none"
              stroke="transparent"
              strokeWidth="190"
              pointerEvents="visibleStroke"
              onMouseEnter={() => activateGlow("deep")}
              onMouseLeave={resetGlow}
            />

            <path
              d={paths.clean}
              transform="translate(-652.153)"
              fill="none"
              stroke="transparent"
              strokeWidth="160"
              pointerEvents="visibleStroke"
              onMouseEnter={() => activateGlow("clean")}
              onMouseLeave={resetGlow}
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
              onMouseLeave={() => {
                setActiveShape(null);
                resetGlow();
              }}
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
              onMouseLeave={() => {
                setActiveShape(null);
                resetGlow();
              }}
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
              onMouseLeave={() => {
                setActiveShape(null);
                resetGlow();
              }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}