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

export default function Hero() {
  const [activeShape, setActiveShape] = useState<ActiveShape>(null);
  const [visibleShape, setVisibleShape] = useState<ActiveShape>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [glowActive, setGlowActive] = useState(false);
  const [glowShape, setGlowShape] = useState<ActiveShape>(null);

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

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        {Object.entries(images).map(([key, src]) => (
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
              setGlowActive(false);
              setGlowShape(null);
            }}
          >
            <defs>
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
                <stop offset="0%" stopColor="#77db21" stopOpacity="1" />
                <stop offset="45%" stopColor="#77db21" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#77db21" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="cursorGlowClean" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00e4e7" stopOpacity="1" />
                <stop offset="45%" stopColor="#00e4e7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#00e4e7" stopOpacity="0" />
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

            {cursor && glowActive && glowShape === "youth" && (
              <circle
                cx={cursor.x}
                cy={cursor.y}
                r="70"
                fill="url(#cursorGlowYouth)"
                mask="url(#strokeGlowMaskYouth)"
                pointerEvents="none"
              />
            )}

            {cursor && glowActive && glowShape === "deep" && (
              <circle
                cx={cursor.x}
                cy={cursor.y}
                r="70"
                fill="url(#cursorGlowDeep)"
                mask="url(#strokeGlowMaskDeep)"
                pointerEvents="none"
              />
            )}

            {cursor && glowActive && glowShape === "clean" && (
              <circle
                cx={cursor.x}
                cy={cursor.y}
                r="70"
                fill="url(#cursorGlowClean)"
                mask="url(#strokeGlowMaskClean)"
                pointerEvents="none"
              />
            )}

            <path
              d={paths.youth}
              fill="none"
              stroke="transparent"
              strokeWidth="130"
              pointerEvents="visibleStroke"
              onMouseEnter={() => {
                setGlowActive(true);
                setGlowShape("youth");
              }}
              onMouseLeave={() => {
                setGlowActive(false);
                setGlowShape(null);
              }}
            />

            <path
              d={paths.deep}
              transform="translate(-5.427 -420.055)"
              fill="none"
              stroke="transparent"
              strokeWidth="130"
              pointerEvents="visibleStroke"
              onMouseEnter={() => {
                setGlowActive(true);
                setGlowShape("deep");
              }}
              onMouseLeave={() => {
                setGlowActive(false);
                setGlowShape(null);
              }}
            />

            <path
              d={paths.clean}
              transform="translate(-652.153)"
              fill="none"
              stroke="transparent"
              strokeWidth="130"
              pointerEvents="visibleStroke"
              onMouseEnter={() => {
                setGlowActive(true);
                setGlowShape("clean");
              }}
              onMouseLeave={() => {
                setGlowActive(false);
                setGlowShape(null);
              }}
            />

            <path
              d={paths.youth}
              fill="black"
              fillOpacity="0"
              pointerEvents="fill"
              onMouseEnter={() => {
                setActiveShape("youth");
                setGlowActive(true);
                setGlowShape("youth");
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
                setGlowActive(true);
                setGlowShape("deep");
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
                setGlowActive(true);
                setGlowShape("clean");
              }}
              onMouseLeave={() => setActiveShape(null)}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}