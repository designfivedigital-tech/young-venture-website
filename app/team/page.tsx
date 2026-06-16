"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./TeamPage.module.css";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  video: string;
  category: string;
  location: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Name Surname",
    role: "Investment Team, Milan",
    image: "/images/team-members/ragazzo-prova.jpg",
    video: "/images/team-members/video-ragazzo-prova.mp4",
    category: "Investment",
    location: "Milan",
  },
  {
    name: "Name Surname",
    role: "Founder Relations, London",
    image: "/images/team-members/team-2.jpg",
    video: "/images/team-members/team-2.mp4",
    category: "Operations",
    location: "London",
  },
  {
    name: "Name Surname",
    role: "University Network, Milan",
    image: "/images/team-members/team-3.jpg",
    video: "/images/team-members/team-3.mp4",
    category: "Specialists",
    location: "Milan",
  },
  {
    name: "Name Surname",
    role: "Investment Team, London",
    image: "/images/team-members/team-4.jpg",
    video: "/images/team-members/team-4.mp4",
    category: "Investment",
    location: "London",
  },
  {
    name: "Name Surname",
    role: "Platform Team, Milan",
    image: "/images/team-members/team-5.jpg",
    video: "/images/team-members/team-5.mp4",
    category: "Operations",
    location: "Milan",
  },
  {
    name: "Name Surname",
    role: "Venture Partner, Europe",
    image: "/images/team-members/team-6.jpg",
    video: "/images/team-members/team-6.mp4",
    category: "Specialists",
    location: "Europe",
  },
];

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

        <video
          ref={videoRef}
          className={styles.video}
          src={member.video}
          muted
          loop
          playsInline
          preload="metadata"
        />

        <span className={styles.hold}>hold to play</span>
      </div>

      <h2>{member.name}</h2>
      <p>{member.role}</p>
    </article>
  );
}

export default function TeamPage() {
  return (
    <section data-header-theme="dark" className={styles.teamPage}>
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
          <p>Filters</p>

          <div>
            <button>Operations</button>
            <button>Investment</button>
            <button>Specialists</button>
          </div>

          <div>
            <button>Milan</button>
            <button>London</button>
            <button>Europe</button>
          </div>
        </aside>

        <div className={styles.grid}>
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
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