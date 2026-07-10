"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
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
    name: "Northline",
    logo: "/images/commitments-logo/spotify-logo.svg",
    shortDescription: "AI infrastructure for modern teams",
    longDescription:
      "Northline is building intelligent infrastructure for ambitious companies, helping teams automate complex workflows and make better decisions with data.",
    status: "ACTIVE",
    founded: "2021",
    backed: "2023",
    founder: "Alex Morgan",
    location: "Milan, Italy",
    website: "https://example.com",
    linkedin: "https://www.linkedin.com/company/example",
  },
  {
    id: 2,
    name: "Velora",
    logo: "/images/commitments-logo/apple-logo.svg",
    shortDescription: "Clean energy software platform",
    longDescription:
      "Velora helps energy operators optimize distributed renewable assets through predictive analytics, real-time monitoring and intelligent automation.",
    status: "ACTIVE",
    founded: "2020",
    backed: "2022",
    founder: "Maya Conti",
    location: "Berlin, Germany",
    website: "https://example.com",
    linkedin: "https://www.linkedin.com/company/example",
  },
  {
    id: 3,
    name: "Luma Labs",
    logo: "/images/commitments-logo/Logo_NIKE.svg",
    shortDescription: "Creative tools powered by AI",
    longDescription:
      "Luma Labs creates next-generation tools for designers, developers and creative teams, making advanced AI workflows simple and accessible.",
    status: "ACTIVE",
    founded: "2022",
    backed: "2024",
    founder: "Daniel Reed",
    location: "London, UK",
    website: "https://example.com",
    linkedin: "https://www.linkedin.com/company/example",
  },
  {
    id: 4,
    name: "Orbit",
    logo: "/images/commitments-logo/Huawei_wordmark.svg",
    shortDescription: "Finance OS for founders",
    longDescription:
      "Orbit gives founders a modern financial operating system to manage cash, forecast growth and understand company performance in real time.",
    status: "ACTIVE",
    founded: "2019",
    backed: "2021",
    founder: "Sofia Lane",
    location: "Paris, France",
    website: "https://example.com",
    linkedin: "https://www.linkedin.com/company/example",
  },
  {
    id: 5,
    name: "Kinetiq",
    logo: "/images/commitments-logo/TikTok_logo.svg.colorable.svg",
    shortDescription: "Mobility data for cities",
    longDescription:
      "Kinetiq works with cities and mobility operators to design cleaner, safer and more efficient urban transportation systems.",
    status: "EXITED",
    founded: "2018",
    backed: "2020",
    founder: "Leo Ferri",
    location: "Amsterdam, Netherlands",
    website: "https://example.com",
    linkedin: "https://www.linkedin.com/company/example",
  },
  {
    id: 6,
    name: "Auralis",
    logo: "/images/commitments-logo/microsoft.svg",
    shortDescription: "Audio intelligence for products",
    longDescription:
      "Auralis develops audio intelligence systems that allow products to understand speech, sound and context in demanding environments.",
    status: "ACTIVE",
    founded: "2023",
    backed: "2024",
    founder: "Nina Brooks",
    location: "Zurich, Switzerland",
    website: "https://example.com",
    linkedin: "https://www.linkedin.com/company/example",
  },
  {
    id: 7,
    name: "Black Forest",
    logo: "/images/commitments-logo/Samsung_Black_icon.svg",
    shortDescription: "AI image generation research",
    longDescription:
      "Black Forest is advancing generative media through research-driven image models, creative infrastructure and tools for visual production.",
    status: "ACTIVE",
    founded: "2021",
    backed: "2023",
    founder: "Jonas Weber",
    location: "Munich, Germany",
    website: "https://example.com",
    linkedin: "https://www.linkedin.com/company/example",
  },
];

const EXPANSION_COLS = 4;

export default function CommitmentsSection() {
  const [selectedCommitment, setSelectedCommitment] =
    useState<Commitment | null>(null);

  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    const clearHover = () => setHoveredIndex(null);
    window.addEventListener("resize", clearHover);
    return () => window.removeEventListener("resize", clearHover);
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
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile) return;

  const section = document.querySelector<HTMLElement>(".commitments-section");
  if (!section) return;

  let ticking = false;

  const updateSnapState = () => {
    const sectionTop = section.offsetTop;
    const currentScroll = window.scrollY;

    if (currentScroll >= sectionTop - 4) {
      document.documentElement.classList.add("after-commitments");
    } else {
      document.documentElement.classList.remove("after-commitments");
    }

    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateSnapState);
  };

  updateSnapState();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateSnapState);

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", updateSnapState);
    document.documentElement.classList.remove("after-commitments");
  };
}, []);

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
        className={`${styles.section} snap-section commitments-section`}
      >
        <div className={styles.sectionHeader}>
          <h2>Companies we back. People we believe in.</h2>
        </div>

        <div className={styles.grid} onMouseLeave={() => setHoveredIndex(null)}>
          {commitments.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.card} ${getHoverClass(index)}`}
              onMouseEnter={() => setHoveredIndex(index)}
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
            </button>
          ))}

          <div
            className={`${styles.card} ${styles.ctaCard} ${getHoverClass(
              commitments.length
            )}`}
            onMouseEnter={() => setHoveredIndex(commitments.length)}
          >
            <h2>
              We back companies.
              <br />
              But we believe in humans.
            </h2>

            <button type="button" className={styles.viewAll}>
              View all
            </button>
          </div>
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
              ←
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
                    Website <span>↗</span>
                  </a>

                  <a
                    href={selectedCommitment.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="commitment"
                    className={styles.cardLinkedin}
                  >
                    LinkedIn <span>↗</span>
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