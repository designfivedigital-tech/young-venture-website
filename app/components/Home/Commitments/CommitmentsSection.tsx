"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import styles from "./CommitmentsSection.module.css";

type Commitment = {
  id: number;
  name: string;
  logo: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  founded: string;
  backed: string;
  founder: string;
  location: string;
  website: string;
  linkedin: string;
};

const commitments: Commitment[] = [
  {
    id: 1,
    name: "Cortirio",
    logo: "/images/commitments-logo/cortirio.svg",
    shortDescription: "Portable brain imaging\nthat saves time and lives",
    longDescription:
      "Cortirio is developing a portable, wearable brain-imaging device that uses infrared light to rapidly detect strokes and traumatic brain injuries, wherever care is needed.",
    status: "ACTIVE",
    founded: "2017",
    backed: "2026",
    founder: "Patrick Beldon e Paul Macey",
    location: "London, Uk",
    website: "https://cortirio.com",
    linkedin: "https://uk.linkedin.com/company/cortirio",
  },
];

const COMING_SOON_SLOTS = 6;

const EXPANSION_COLS = 4;

type CommitmentsSectionProps = {
  lastCard?: "cta" | "comingSoon";
  snapSection?: boolean;
};

export default function CommitmentsSection({
  lastCard = "cta",
  snapSection = true,
}: CommitmentsSectionProps) {
  const [selectedCommitment, setSelectedCommitment] =
    useState<Commitment | null>(null);

  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHoverEnter = (index: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setHoveredIndex(index), 80);
  };

  const handleHoverLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredIndex(null);
  };

  const closePopup = () => {
    setIsClosing(true);

    setTimeout(() => {
      setSelectedCommitment(null);
      setIsClosing(false);
    }, 700);
  };

  const getHoverClass = (index: number) => {
    if (hoveredIndex === null) return "";

    const rowStart = Math.floor(hoveredIndex / EXPANSION_COLS) * EXPANSION_COLS;
    if (index < rowStart || index >= rowStart + EXPANSION_COLS) return "";

    return index === hoveredIndex ? styles.isExpanded : styles.isShrunk;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleHoverLeave);
    return () => {
      window.removeEventListener("resize", handleHoverLeave);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!selectedCommitment) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedCommitment]);

  useEffect(() => {
    if (selectedCommitment) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCommitment]);

  return (
    <>
      <section
        data-header-theme="light"
        className={`${styles.section}${snapSection ? " snap-section" : ""}`}
      >
        <div className={styles.sectionHeader}>
          <h2>Companies we back. Founders we believe in.</h2>
        </div>

        <div className={styles.grid} onMouseLeave={handleHoverLeave}>
          {commitments.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.card} ${getHoverClass(index)}`}
              onMouseEnter={() => handleHoverEnter(index)}
              onClick={() => setSelectedCommitment(item)}
            >
              <div className={styles.logoWrap}>
                <Image
                  src={item.logo}
                  alt={`${item.name} logo`}
                  width={240}
                  height={90}
                  className={styles.logo}
                />
              </div>

              <p>{item.shortDescription}</p>

              <button type="button" className={styles.viewAll}>
                More info
              </button>
            </div>
          ))}

          {Array.from({ length: COMING_SOON_SLOTS }).map((_, i) => {
            const index = commitments.length + i;
            return (
              <div
                key={`coming-soon-${i}`}
                className={`${styles.card} ${styles.comingSoonCard} ${getHoverClass(
                  index
                )}`}
                onMouseEnter={() => handleHoverEnter(index)}
              >
                <div className={styles.logoWrap}>
                  <span className={styles.comingSoonMark}>+</span>
                </div>

                <p>Coming soon</p>
              </div>
            );
          })}

          {lastCard === "cta" ? (
            <div
              className={`${styles.card} ${styles.ctaCard} ${getHoverClass(
                commitments.length + COMING_SOON_SLOTS
              )}`}
              onMouseEnter={() =>
                handleHoverEnter(commitments.length + COMING_SOON_SLOTS)
              }
            >
              <h2>
                We back companies.
                <br />
                But we believe in humans.
              </h2>

              <Link href="/commitments" className={styles.viewAll}>
                View all
              </Link>
            </div>
          ) : (
            <div
              className={`${styles.card} ${styles.comingSoonCard} ${getHoverClass(
                commitments.length + COMING_SOON_SLOTS
              )}`}
              onMouseEnter={() =>
                handleHoverEnter(commitments.length + COMING_SOON_SLOTS)
              }
            >
              <div className={styles.logoWrap}>
                <span className={styles.comingSoonMark}>+</span>
              </div>

              <p>More partnerships coming soon</p>
            </div>
          )}
        </div>
      </section>

      {mounted &&
        selectedCommitment &&
        createPortal(
          <div
            className={`${styles.detailOverlay} ${
              isClosing
                ? styles.detailOverlayClosing
                : styles.detailOverlayOpen
            }`}
          >
            <button
              type="button"
              className={styles.backButton}
              onClick={closePopup}
            >
              <span className={styles.backIcon} aria-hidden="true" />
            </button>

            <div className={styles.detailContent}>
              <div className={styles.detailText}>
                <h2>{selectedCommitment.name}</h2>
                <p>{selectedCommitment.longDescription}</p>

                <div className={styles.metaRow}>
                  <span>Founded</span>
                  <strong>{selectedCommitment.founded}</strong>
                </div>

                <div className={styles.metaRow}>
                  <span>Young Ventures Backed</span>
                  <strong>{selectedCommitment.backed}</strong>
                </div>

                <div className={styles.metaRow}>
                  <span>Founder</span>
                  <strong>{selectedCommitment.founder}</strong>
                </div>

                <div className={styles.metaRow}>
                  <span>Location</span>
                  <strong>{selectedCommitment.location}</strong>
                </div>
              </div>

              <div className={styles.detailCard}>
                <span className={styles.status}>
                  {selectedCommitment.status}
                </span>

                <Image
                  src={selectedCommitment.logo}
                  alt={`${selectedCommitment.name} logo`}
                  width={280}
                  height={110}
                  className={styles.detailLogo}
                />

                <p>{selectedCommitment.shortDescription}</p>

                <div className={styles.detailLinks}>
                  <a
                    href={selectedCommitment.website}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="commitment"
                    className={styles.cardWebsite}
                  >
                    Website
                    <span>
                      <span className={styles.arrowIcon} aria-hidden="true" />
                    </span>
                  </a>

                  <a
                    href={selectedCommitment.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="commitment"
                    className={styles.cardLinkedin}
                  >
                    LinkedIn
                    <span>
                      <span className={styles.arrowIcon} aria-hidden="true" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}