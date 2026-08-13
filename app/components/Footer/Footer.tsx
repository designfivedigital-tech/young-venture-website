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
  { label: "LinkedIn", href: "https://www.linkedin.com/company/young-ventures-vc" },
  { label: "TikTok", href: "https://www.tiktok.com/@youngventures.vc" },
  { label: "Instagram", href: "https://www.instagram.com/youngventures.vc" },
];

const toolLinks = [
  { label: "Valuation Tool", href: "/startup-valuation-tool" },
];

const offices = [
  { city: "Milan", university: "Bocconi University" },
  { city: "San Francisco", university: "Stanford University" },
  { city: "Boston", university: "Harvard University" },
  { city: "Zurich", university: "ETH Zürich" },
  { city: "Cambridge", university: "University of Cambridge" },
  { city: "London", university: "LSE" },
  { city: "New York", university: "NYU" },
  { city: "Oxford", university: "University of Oxford" },
  { city: "Pasadena", university: "Caltech" },
];

const legalLinks = [
  { label: "Legal", href: "https://blog.youngventures.vc/terms-of-use/" },
  { label: "Privacy policy", href: "https://blog.youngventures.vc/privacy-policy/" },
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
          {offices.map((office) => (
            <div key={office.city} className={styles.office}>
              <h4>{office.university}</h4>
              <p>{office.city}</p>
            </div>
          ))}
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
              {link.label} <span className={styles.externalIcon} aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className={styles.sideLinks}>
          {toolLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} <span className={styles.externalIcon} aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className={styles.legalLinks}>
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} target="_blank">
              {link.label}
            </Link>
          ))}
        </div>

        <p className={styles.copy}>© 2026 Young Ventures YV LLC. All rights reserved. A Delaware limited liability company.</p>
      </div>
    </footer>
  );
}