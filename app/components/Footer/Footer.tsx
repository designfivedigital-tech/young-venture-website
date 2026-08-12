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
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

const toolLinks = [
  { label: "Valuation Tool", href: "/startup-valuation-tool" },
];

const legalLinks = [
  { label: "Legal", href: "https://blog.youngventures.vc/terms-of-use/" },
  { label: "Privacy policy", href: "https://blog.youngventures.vc/privacy-policy/" },
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
            <h4>SAN FRANCISCO</h4>
            <p>Young Ventures</p>
            <p>Via</p>
            <p>San Francisco, USA</p>
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
          {toolLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} <span className={styles.externalIcon} aria-hidden="true" />
            </a>
          ))}
        </nav>

        
      </div>

      <div className={styles.right}>
        <div className={styles.sideLinks}>
          {sideLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank">
              {link.label} <span className={styles.externalIcon} aria-hidden="true" />
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