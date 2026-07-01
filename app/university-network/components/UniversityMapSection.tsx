"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./UniversityMapSection.module.css";

const universities = [
  {
    name: "Oxford",
    country: "United Kingdom",
    cx: 287.18,
    cy: 153.68,
    image: "/images/mappe/mappa-inghilterra.png",
    cities: ["Oxford", "Cambridge", "London"],
  },
  {
    name: "Cambridge",
    country: "United Kingdom",
    cx: 292.18,
    cy: 158.68,
    image: "/images/university-network/uk.jpg",
    cities: ["Cambridge", "Oxford", "London"],
  },
  {
    name: "Bocconi",
    country: "Italy",
    cx: 306.41,
    cy: 166.46,
    image: "/images/university-network/italy.jpg",
    cities: ["Milan", "Zurich", "Rome"],
  },
  {
    name: "NYU",
    country: "United States",
    cx: 197.63,
    cy: 164.88,
    image: "/images/university-network/usa-east.jpg",
    cities: ["New York", "Boston", "Cambridge"],
  },
  {
    name: "Stanford",
    country: "United States",
    cx: 104.47,
    cy: 182.43,
    image: "/images/university-network/usa-west.jpg",
    cities: ["Stanford", "Caltech", "San Francisco"],
  },
  {
    name: "Caltech",
    country: "United States",
    cx: 107.67,
    cy: 188.82,
    image: "/images/university-network/usa-west.jpg",
    cities: ["Caltech", "Stanford", "Los Angeles"],
  },
];

export default function UniversityMapSection() {
  const [activeUniversity, setActiveUniversity] = useState(universities[0]);

  return (
    <section
      data-header-theme="light"
      className={`${styles.section} snap-section`}
    >
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
          {universities.map((university) => {
            const isActive = activeUniversity.name === university.name;

            return (
              <button
                key={university.name}
                type="button"
                className={styles.pointButton}
                onClick={() => setActiveUniversity(university)}
              >
                <circle
                  cx={university.cx}
                  cy={university.cy}
                  r={isActive ? 5.2 : 4}
                  className={`${styles.point} ${
                    isActive ? styles.activePoint : ""
                  }`}
                />
              </button>
            );
          })}
        </svg>

        <div key={activeUniversity.name} className={styles.zoomCard}>
          <div className={styles.zoomImageWrap}>
            <Image
              src={activeUniversity.image}
              alt={activeUniversity.country}
              fill
              className={styles.zoomImage}
            />
          </div>

          <div className={styles.zoomContent}>
            <p className={styles.country}>{activeUniversity.country}</p>

            <div className={styles.cityList}>
              {activeUniversity.cities.map((city) => (
                <span key={city}>{city}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.label}>University Network</p>

        <h1>
          We scout founders where tomorrow is already being built.
        </h1>

        <p>
          Our university network connects Young Ventures with students,
          researchers and professors across the most ambitious academic
          ecosystems in the world.
        </p>
      </div>
    </section>
  );
}