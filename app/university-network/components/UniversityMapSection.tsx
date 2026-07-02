"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./UniversityMapSection.module.css";

const universities = [
  { name: "Stanford", cx: 104.47, cy: 182.43 },
  { name: "Caltech", cx: 107.67, cy: 188.82 },
  { name: "NYU", cx: 197.63, cy: 164.88 },
  { name: "Harvard", cx: 200.63, cy: 156.88 },
  { name: "Oxford", cx: 287.18, cy: 153.68, image: "/images/mappe/mappa-eng.png" },
  { name: "Cambridge", cx: 292.18, cy: 158.68 },
  { name: "Bocconi", cx: 306.41, cy: 166.46 },
  { name: "ETH Zurich", cx: 312.82, cy: 179.24 },
];

export default function UniversityMapSection() {
  const [active, setActive] = useState<string | null>(null);
  const [popupImage, setPopupImage] = useState<string | null>(null);

  const handleSelect = (university: (typeof universities)[number]) => {
    setActive(university.name);
    if (university.image) {
      setPopupImage(university.image);
    }
  };

  return (
    <section
      data-header-theme="light"
      className={`${styles.section} snap-section`}
    >
      <div className={styles.mapArea}>
        <Image
          src="/images/mappamondo.svg"
          alt="University network map"
          fill
          className={styles.mapImage}
          priority
        />

        <svg
          className={styles.network}
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {universities.map((university) => {
            const isActive = active === university.name;

            return (
              <g
                key={university.name}
                className={styles.pointGroup}
                onClick={() => handleSelect(university)}
              >
                <circle
                  cx={university.cx}
                  cy={university.cy}
                  r={isActive ? 6 : 4.2}
                  className={`${styles.point} ${
                    isActive ? styles.activePoint : ""
                  }`}
                />

                {isActive && (
                  <text
                    x={university.cx + 8}
                    y={university.cy - 8}
                    className={styles.label}
                  >
                    {university.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {popupImage && (
        <div
          className={styles.popupOverlay}
          onClick={() => setPopupImage(null)}
        >
          <div
            className={styles.popupContent}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.popupClose}
              onClick={() => setPopupImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={popupImage}
              alt="University map detail"
              className={styles.popupImage}
            />
          </div>
        </div>
      )}
    </section>
  );
}