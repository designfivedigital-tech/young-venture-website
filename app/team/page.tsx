"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./TeamPage.module.css";

type TeamMember = {
  name: string;
  role: string;
  university: string;
  image: string;
  hoverImage: string;
};

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

// Each member belongs to exactly one university (must match a name in
// UNIVERSITIES above) - that's what drives the sidebar filter.
const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Davide",
    role: "Investment Team, Milan",
    university: "Bocconi",
    image: "/images/team-members/Davide-Bocconi_1.jpg",
    hoverImage: "/images/team-members/Davide-Bocconi_2.jpg",
  },

  {
    name: "Elisa",
    role: "Investment Team, Milan",
    university: "Bocconi",
    image: "/images/team-members/Elisa-Bocconi_1.jpg",
    hoverImage: "/images/team-members/Elisa-Bocconi_2.jpg",
  },

   {
    name: "Ilaria",
    role: "University Network, Zurich",
    university: "ETH",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },

  {
    name: "Marc",
    role: "University Network, Zurich",
    university: "Bocconi",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },

  {
    name: "Name Surname",
    role: "University Network, Zurich",
    university: "Bocconi",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Founder Relations, Oxford",
    university: "Oxford",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Platform Team, Cambridge",
    university: "Cambridge",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Investment Team, London",
    university: "LSE",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Founder Relations, New York",
    university: "NYU",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Venture Partner, Boston",
    university: "Harvard",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Investment Team, San Francisco",
    university: "Stanford",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
  {
    name: "Name Surname",
    role: "Platform Team, Pasadena",
    university: "Caltech",
    image: "/images/team-members/ragazzo-prova.jpg",
    hoverImage: "/images/team-members/ragazzo-prova-hover.jpg",
  },
];

const universityGroups = UNIVERSITIES.map((name) => ({
  slug: name.toLowerCase(),
  name,
  members: TEAM_MEMBERS.filter((member) => member.university === name),
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

        </div>

      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </article>
  );
}

export default function TeamPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>("all");

  const visibleGroups =
    selectedSlug === "all"
      ? universityGroups
      : universityGroups.filter((group) => group.slug === selectedSlug);

  return (
    <section data-header-theme="light" className={styles.teamPage}>
      <div className={styles.hero}>
        <h1>
          The minds at work.
        </h1>

        <div className={styles.heroText}>
          <p>
           We come from different universities, but the pattern is the same: each of us stood out before we ever stood together.
          </p>

          <p>
            Now, that individual drive becomes collective experience - and it all stands behind every founder we support.
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <aside className={styles.filters}>
          <p>Universities</p>

          <div>
            <button
              type="button"
              onClick={() => setSelectedSlug("all")}
              className={selectedSlug === "all" ? styles.activeLink : undefined}
            >
              All
            </button>

            {universityGroups.map((group) => (
              <button
                key={group.slug}
                type="button"
                onClick={() => setSelectedSlug(group.slug)}
                className={selectedSlug === group.slug ? styles.activeLink : undefined}
              >
                {group.name}
              </button>
            ))}
          </div>
        </aside>

        <div className={styles.groups}>
          {visibleGroups
            .filter((group) => group.members.length > 0)
            .map((group) => (
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
        <h3>
          We back companies.
          <br />
          But we believe in humans.
        </h3>
      </div>
    </section>
  );
}