"use client";

import { useState } from "react";
import styles from "./ProfessorsSection.module.css";

type Professor = {
  name: string;
  initials: string;
  university: string;
  bio: string;
  photo: string;
  company: { name: string; logo: string };
};

const PROFESSORS: Professor[] = [
  {
    name: "Paul Wolfowitz",
    initials: "PW",
    university: "Stanford",
    bio: "American economist, former President of the World Bank (2005–2007), with prior experience in international and external policy.",
    photo: "/images/professors/paul-wolfowitz.png",
    company: { name: "World Bank", logo: "/images/companies/world-bank-icon.png" },
  },
  {
    name: "Luca Sintoni",
    initials: "LS",
    university: "Bocconi",
    bio: "Chartered accountant, member of the Board of Directors of Bending Spoons, with experience in M&A advisory and corporate restructuring.",
    photo: "/images/professors/luca-sintoni.jpg",
    company: { name: "Bending Spoons", logo: "/images/companies/bending-spoons-icon.png" },
  },
  {
    name: "Hannah Leach",
    initials: "HL",
    university: "LSE",
    bio: "Hannah Leach is a Partner at Antler, a global early-stage venture capital firm, and serves on the advisory board of LSE Generate.",
    photo: "/images/professors/hannah-leach.png",
    company: { name: "Antler", logo: "/images/companies/antler-icon.png" },
  },
  {
    name: "Gerard Grech",
    initials: "GG",
    university: "Cambridge",
    bio: "Gerard Grech is Founding Partner of “Founders at Cambridge”, the university related program for new student ventures.",
    photo: "/images/professors/gerard-grech.png",
    company: { name: "Founders at Cambridge", logo: "/images/companies/cambridge-icon.png" },
  },
  {
    name: "Mathias Cohen",
    initials: "MC",
    university: "NYU",
    bio: "Mathias Cohen is a lecturer at NYU Tandon School of Engineering. In his career he raised over $50M in venture capital for his startups.",
    photo: "/images/professors/mathias-cohen.png",
    company: { name: "NYU Tandon", logo: "/images/companies/nyu-icon.png" },
  },
];

function ProfessorCard({ professor }: { professor: Professor }) {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.photo}>
        <span className={styles.initials}>{professor.initials}</span>
        {!photoFailed && (
          <img
            src={professor.photo}
            alt={professor.name}
            onError={() => setPhotoFailed(true)}
          />
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{professor.name}</h3>
        <p className={styles.university}>{professor.university}</p>
        <p className={styles.bio}>{professor.bio}</p>

        <div className={styles.companies}>
          <img
            src={professor.company.logo}
            alt={professor.company.name}
            title={professor.company.name}
          />
        </div>
      </div>
    </article>
  );
}

export default function ProfessorsSection() {
  return (
    <section data-header-theme="light" className={`${styles.section} snap-section`} id="professors">
      <div className={styles.header}>
        <h2>Our Professors</h2>
        <p>
          Leading academics and operators from our partner universities who
          mentor, advise and open doors for the next generation of founders.
        </p>
      </div>

      <div className={styles.grid}>
        {PROFESSORS.map((professor) => (
          <ProfessorCard key={professor.name} professor={professor} />
        ))}
      </div>
    </section>
  );
}
