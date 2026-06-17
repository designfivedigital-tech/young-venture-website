"use client";

import { useState } from "react";
import styles from "./ContactPage.module.css";

const offices = [
  {
    city: "Milan",
    company: "Young Ventures",
    lines: ["Via Torino 12", "20123 Milano", "Italy"],
  },
  {
    city: "London",
    company: "Young Ventures UK",
    lines: ["36 Carnaby Street", "London W1F 7DS", "United Kingdom"],
  },
  {
    city: "San Francisco",
    company: "Young Ventures US",
    lines: ["58 S Park St", "San Francisco, CA 94107", "USA"],
  },
  {
    city: "Stockholm",
    company: "Young Ventures Nordics",
    lines: ["Jakobsbergsgatan 18", "111 44 Stockholm", "Sweden"],
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const email = "hello@youngventures.com";

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className={styles.page} data-header-theme="light">
      <section className={styles.hero}>
        <div className={styles.visual}>
          <div className={`${styles.tile} ${styles.tileOne}`} />
          <div className={`${styles.tile} ${styles.tileTwo}`} />
          <div className={`${styles.tile} ${styles.tileThree}`} />
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Contact</p>
          <h1>Hi there!</h1>

          <div className={styles.offices}>
            {offices.map((office) => (
              <article key={office.city} className={styles.office}>
                <h2>{office.city}</h2>
                <p>{office.company}</p>
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </article>
            ))}
          </div>

          <div className={styles.emailBlock}>
            <span>Media enquiries</span>

            <button onClick={copyEmail} className={styles.emailButton}>
              {email}
            </button>

            <button onClick={copyEmail} className={styles.copyButton}>
              {copied ? "Copied" : "Copy to clipboard"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}