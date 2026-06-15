import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const mainLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Team", href: "/team" },
  { label: "Commitments", href: "/commitments" },
  { label: "University Network", href: "/university-network" },
  { label: "Contact", href: "/contact" },
];

const sideLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "X", href: "https://x.com" },
];

const legalLinks = [
  { label: "Legal", href: "/legal" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Sustainability disclosure", href: "/sustainability" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Link href="/" className={styles.logoWrap}>
          <Image
            src="/images/logo-young-ventures.svg"
            alt="Young Ventures"
            width={180}
            height={40}
            className={styles.logo}
          />
        </Link>

        <div className={styles.offices}>
          <div className={styles.office}>
            <h4>MILAN</h4>
            <p>Young Ventures</p>
            <p>Via —</p>
            <p>Milano, Italy</p>
          </div>

          <div className={styles.office}>
            <h4>LONDON</h4>
            <p>Young Ventures</p>
            <p>—</p>
            <p>London, UK</p>
          </div>
        </div>

      </div>

      <div className={styles.center}>
        <nav className={styles.mainNav}>
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        
      </div>

      <div className={styles.right}>
        <div className={styles.sideLinks}>
          {sideLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank">
              {link.label} ↗
            </a>
          ))}
        </div>

        <div className={styles.legalLinks}>
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <p className={styles.copy}>© 2026, All rights reserved</p>
      </div>
    </footer>
  );
}