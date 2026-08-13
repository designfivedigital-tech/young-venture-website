"use client";

import { useEffect, useState } from "react";
import styles from "./ContactPage.module.css";

const locations = [
  {
    country: "ITALY",
    region: "europe",
    timezone: "Europe/Rome",
    universities: [{ name: "Bocconi" }],
  },
  {
    country: "ENGLAND",
    region: "europe",
    timezone: "Europe/London",
    universities: [
      { name: "Oxford Univerity" },
      { name: "Cambridge University" },
      { name: "LSE" },
    ],
  },
  {
    country: "SWITZERLAND",
    region: "europe",
    timezone: "Europe/Zurich",
    universities: [{ name: "ETH" }],
  },
  {
    country: "UNITED STATES - WEST COAST",
    region: "usa",
    timezone: "America/Los_Angeles",
    universities: [{ name: "Caltech" }, { name: "Stanford University" }],
  },
  {
    country: "UNITED STATES - EAST COAST",
    region: "usa",
    timezone: "America/New_York",
    universities: [{ name: "Harvard" }, { name: "NYU" }],
  },
];

const europeLocations = locations.filter((location) => location.region === "europe");
const usaLocations = locations.filter((location) => location.region === "usa");

function getClockAngles(timezone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value || 0
  );
  const second = Number(
    parts.find((part) => part.type === "second")?.value || 0
  );

  return {
    hour: ((hour % 12) + minute / 60) * 30,
    minute: minute * 6,
    second: second * 6,
  };
}

function AnalogClock({ timezone }: { timezone: string }) {
  const [angles, setAngles] = useState(() => getClockAngles(timezone));

  useEffect(() => {
    const updateClock = () => {
      setAngles(getClockAngles(timezone));
    };

    updateClock();

    const interval = window.setInterval(updateClock, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [timezone]);

  return (
    <div className={styles.clock} aria-hidden="true">
      <span
        className={`${styles.hand} ${styles.hourHand}`}
        style={{
          transform: `translateX(-50%) rotate(${angles.hour}deg)`,
        }}
      />

      <span
        className={`${styles.hand} ${styles.minuteHand}`}
        style={{
          transform: `translateX(-50%) rotate(${angles.minute}deg)`,
        }}
      />

      <span
        className={`${styles.hand} ${styles.secondHand}`}
        style={{
          transform: `translateX(-50%) rotate(${angles.second}deg)`,
        }}
      />

      <span className={styles.clockDot} />
    </div>
  );
}

type Location = (typeof locations)[number];

function LocationCard({ location }: { location: Location }) {
  return (
    <article className={styles.card}>
      <AnalogClock timezone={location.timezone} />

      <h2>{location.country}</h2>

      {location.universities.map((university) => (
        <div className={styles.university} key={university.name}>
          <p>{university.name}</p>
        </div>
      ))}
    </article>
  );
}

export default function ContactPage() {
  return (
    <main className={styles.page} data-header-theme="dark">
      <section className={styles.contactHero}>
        <div className={styles.background} />
        <div className={styles.overlay} />

        <div className={styles.inner}>
          <div className={styles.left}>
            <h1>
              Hi
              <br />
              there!
            </h1>

            <div className={styles.media}>
              <span>Media enquiries</span>
              <span className={styles.dot}>·</span>
              <a href="mailto:hello@youngventures.vc">
                hello@youngventures.vc
              </a>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.europeRow}>
              {europeLocations.map((location) => (
                <LocationCard key={location.country} location={location} />
              ))}
            </div>

            <div className={styles.usaRow}>
              {usaLocations.map((location) => (
                <LocationCard key={location.country} location={location} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}