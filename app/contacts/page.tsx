"use client";

import { useEffect, useState } from "react";
import styles from "./ContactPage.module.css";

const locations = [
  {
    city: "SAN FRANCISCO",
    company: "Young Ventures Advisor Ltd.",
    address: ["58 S Park St", "San Francisco, CA 94107"],
    timezone: "America/Los_Angeles",
  },
  {
    city: "LONDON",
    company: "Young Ventures Advisor LLP.",
    address: ["36 Carnaby Street", "London W1F 7DS"],
    timezone: "Europe/London",
  },
  {
    city: "STOCKHOLM",
    company: "Young Ventures VII Advisor AB",
    address: ["Jakobsbergsgatan 18", "111 44 Stockholm"],
    timezone: "Europe/Stockholm",
  },
  {
    city: "BERLIN",
    company: "Young Ventures Advisor GmbH",
    address: ["Torstraße 42", "10119 Berlin"],
    timezone: "Europe/Berlin",
  },
];

function getTime(timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function ContactPage() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const nextTimes: Record<string, string> = {};

      locations.forEach((location) => {
        nextTimes[location.city] = getTime(location.timezone);
      });

      setTimes(nextTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

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
              <a href="mailto:hello@youngventures.com">
                hello@youngventures.com
              </a>
            </div>
          </div>

          <div className={styles.grid}>
            {locations.map((location) => (
              <article className={styles.card} key={location.city}>
                <div className={styles.clock}>
                  {times[location.city] || "--:--"}
                </div>

                <h2>{location.city}</h2>

                <p>{location.company}</p>

                {location.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}