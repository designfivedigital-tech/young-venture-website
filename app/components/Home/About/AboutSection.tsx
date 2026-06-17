"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./AboutSection.module.css";

const universities = [
  { name: "Bocconi", cx: 306.41, cy: 166.46 },
  { name: "Oxford", cx: 287.18, cy: 153.68 },
  { name: "NYU", cx: 197.63, cy: 164.88 },
  { name: "Caltech", cx: 107.67, cy: 188.82 },
  { name: "ETH Zurich", cx: 312.82, cy: 179.24 },
  { name: "Stanford", cx: 104.47, cy: 182.43 },
  { name: "Harvard", cx: 200.63, cy: 156.88 },
];

const logos = [
  {
    name: "Bocconi University",
    src: "/images/university-logos/bocconi-university.png",
  },
  {
    name: "NYU",
    src: "/images/university-logos/nyu.png",
  },
  {
    name: "Oxford",
    src: "/images/university-logos/oxford-university.png",
  },
  {
    name: "Stanford",
    src: "/images/university-logos/standford-university.png",
  },
  {
    name: "Harvard",
    src: "/images/university-logos/harvard-university.png",
  },
  {
    name: "ETH Zürich",
    src: "/images/university-logos/eth.zurich-university.png",
  },
  {
    name: "LSE",
    src: "/images/university-logos/lse-university.png",
  },
  {
    name: "Caltech",
    src: "/images/university-logos/caltech-university.png",
  },
  {
    name: "Cambridge",
    src: "/images/university-logos/cambridge-university.png",
  },
];

const route = [0, 1, 2, 3, 4, 5, 6, 0];

const colors = ["routePink", "routeGreen", "routeCyan"] as const;

function getNextColor(previous: string) {
  const available = colors.filter((color) => color !== previous);
  return available[Math.floor(Math.random() * available.length)];
}

function createCurve(fromIndex: number, toIndex: number) {
  const start = universities[fromIndex];
  const end = universities[toIndex];

  const midX = (start.cx + end.cx) / 2;
  const distance = Math.abs(end.cx - start.cx);
  const curveHeight = Math.max(42, distance * 0.32);
  const midY = Math.min(start.cy, end.cy) - curveHeight;

  return `M${start.cx} ${start.cy} Q${midX} ${midY} ${end.cx} ${end.cy}`;
}

export default function AboutSection() {
  const [step, setStep] = useState(0);
  const [routeColor, setRouteColor] = useState("routePink");
  const [trailPaths, setTrailPaths] = useState<
    { path: string; color: string; id: number }[]
  >([]);

  const fromIndex = route[step];
  const toIndex = route[(step + 1) % route.length];

  const activePath = useMemo(
    () => createCurve(fromIndex, toIndex),
    [fromIndex, toIndex]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTrailPaths((current) => [
        ...current.slice(-2),
        {
          path: activePath,
          color: routeColor,
          id: Date.now(),
        },
      ]);

      setRouteColor((previous) => getNextColor(previous));
      setStep((current) => (current + 1) % (route.length - 1));
    }, 3900);

    return () => window.clearInterval(interval);
  }, [activePath, routeColor]);

  return (
    <section data-header-theme="light" className={`${styles.aboutUs} snap-section`}>
      <div className={styles.mapArea}>
        <Image
          src="/images/mappamondo.svg"
          alt=""
          fill
          className={styles.mapImage}
          priority
        />

        <svg
          className={styles.network}
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {trailPaths.map((trail) => (
            <g key={trail.id}>
              <path
                d={trail.path}
                className={`${styles.routeLineExitGlow} ${
                  styles[trail.color]
                }`}
              />
              <path
                d={trail.path}
                className={`${styles.routeLineExit} ${styles[trail.color]}`}
              />
            </g>
          ))}

          <path
            key={`glow-${fromIndex}-${toIndex}-${routeColor}`}
            d={activePath}
            className={`${styles.routeLineGlow} ${styles[routeColor]}`}
          />

          <path
            key={`${fromIndex}-${toIndex}-${routeColor}`}
            d={activePath}
            className={`${styles.routeLine} ${styles[routeColor]}`}
          />

          {universities.map((point, index) => {
            const isActive = index === fromIndex || index === toIndex;

            return (
              <circle
                key={point.name}
                cx={point.cx}
                cy={point.cy}
                r={isActive ? 4.3 : 3.2}
                className={`${styles.universityPoint} ${
                  isActive ? styles.activePoint : ""
                } ${isActive ? styles[routeColor] : ""}`}
              />
            );
          })}
        </svg>
      </div>

      <div className={styles.contentCard}>
        <p className={styles.label}>About us</p>

        <h2>We back founders building what comes next.</h2>

        <p className={styles.text}>
          Young Ventures connects ambitious founders with a global university
          network across youth culture, clean technology and deep tech.
        </p>
      </div>

      <div className={styles.universityMarquee}>
        <div className={styles.marqueeHeading}>
          <span />
          <p>Trusted by leading universities and institutions</p>
          <span />
        </div>

        <div className={styles.marquee}>
          <div className={styles.track}>
            {[...logos, ...logos].map((logo, index) => (
              <div className={styles.logoItem} key={`${logo.name}-${index}`}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={260}
                  height={90}
                  className={styles.logo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}