"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import styles from "./TeamPage.module.css";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  hoverImage: string;
};

const TEAM_TEMPLATE: TeamMember[] = [
  {
    name: "Name Surname",
    role: "Investment Team, Milan",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Founder Relations, London",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "University Network, Milan",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Investment Team, London",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Platform Team, Milan",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Venture Partner, Europe",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
];

const UNIVERSITIES = [
  "Bocconi",
  "ETH",
  "Oxford",
  "Cambridge",
  "LSE",
  "NYU",
  "Harvard",
  "Stanford",
  "Caltech",
];

const universityGroups = UNIVERSITIES.map((name) => ({
  slug: name.toLowerCase(),
  name,
  members: TEAM_TEMPLATE,
}));

function TeamCard({ member }: { member: TeamMember }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  return (
    <article
      className={styles.card}
      onMouseEnter={playVideo}
      onMouseLeave={stopVideo}
    >
      <div className={styles.imageWrap}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.image}
          />

          <Image
            src={member.hoverImage}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.hoverImage}
          />

          <span className={styles.hold}>hold to play</span>
        </div>

      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </article>
  );
}

export default function TeamPage() {
  const [activeSlug, setActiveSlug] = useState(universityGroups[0].slug);

  useEffect(() => {
    const sections = universityGroups
      .map((group) => document.getElementById(group.slug))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      { rootMargin: "-130px 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleUniversityClick = (
    e: MouseEvent<HTMLAnchorElement>,
    slug: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.pushState(null, "", `#${slug}`);
  };

  return (
    <section data-header-theme="light" className={styles.teamPage}>
      <div className={styles.hero}>
        <h1>
          We’ve turned venture
          <br />
          into a team sport
        </h1>

        <div className={styles.heroText}>
          <p>
            We’re founders, operators, students, investors and builders working
            together to support the next generation of ambitious entrepreneurs.
          </p>

          <p>
            And you’ll never get only one of us. The united experience of our
            team stands behind you.
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <aside className={styles.filters}>
          <p>Universities</p>

          <div>
            {universityGroups.map((group) => (
              <a
                key={group.slug}
                href={`#${group.slug}`}
                onClick={(e) => handleUniversityClick(e, group.slug)}
                className={activeSlug === group.slug ? styles.activeLink : undefined}
              >
                {group.name}
              </a>
            ))}
          </div>
        </aside>

        <div className={styles.groups}>
          {universityGroups.map((group) => (
            <section key={group.slug} id={group.slug} className={styles.group}>
              <h2 className={styles.groupTitle}>{group.name}</h2>

              <div className={styles.grid}>
                {group.members.map((member, index) => (
                  <TeamCard key={`${group.slug}-${index}`} member={member} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className={styles.bottomCta}>
        <span>Click to discover</span>
        <h3>
          We back companies.
          <br />
          But we believe in humans.
        </h3>
      </div>
    </section>
  );
}