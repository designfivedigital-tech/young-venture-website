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
  website: string;
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
    website: "https://example.com",
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
    website: "https://example.com",
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
    website: "https://example.com",
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
    website: "https://example.com",
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
    website: "https://example.com",
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
    website: "https://example.com",
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
    website: "https://example.com",
  },
];

export default function CommitmentsSection() {
  const [selectedCommitment, setSelectedCommitment] =
    useState<Commitment | null>(null);

  const [mounted, setMounted] = useState(false);


  const [isClosing, setIsClosing] = useState(false);

const closePopup = () => {
  setIsClosing(true);

  setTimeout(() => {
    setSelectedCommitment(null);
    setIsClosing(false);
  }, 700);
};

  useEffect(() => {
    setMounted(true);
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
      <section data-header-theme="light" className={styles.section}>
   <div className={styles.sectionHeader}>
    <h2>Companies we back. People we believe in.</h2>
  </div>

  <div className={styles.grid}>
    {commitments.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.card}
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

          <div className={`${styles.card} ${styles.ctaCard}`}>
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
    isClosing ? styles.detailOverlayClosing : styles.detailOverlayOpen
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

  <a
  href={selectedCommitment.website}
  target="_blank"
  rel="noreferrer"
  data-cursor="commitment"
  className={styles.cardWebsite}
>
  Website <span>↗</span>
</a>
</div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}