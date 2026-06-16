import Image from "next/image";
import styles from "./CommitmentsPage.module.css";

const clients = [
  {
    name: "Northline",
    logo: "/images/commitments-logo/Samsung_Black_icon.svg",
    description: "AI-powered logistics infrastructure for modern supply chains.",
  },
  {
    name: "Spotify",
    logo: "/images/commitments-logo/spotify-logo.svg",
    description: "Digital platform shaping the future of audio and culture.",
  },
  {
    name: "Midas",
    logo: "/images/commitments-logo/microsoft.svg",
    description: "Building financial tools for a new generation of investors.",
  },
  {
    name: "Klarna",
    logo: "/images/commitments-logo/Logo_NIKE",
    description: "Consumer payment experiences for global digital commerce.",
  },
  {
    name: "Trade Republic",
    logo: "/images/commitments-logo/Huawei_wordmark.svg",
    description: "Making investing accessible, simple and transparent.",
  },
  {
    name: "Bolt",
    logo: "/images/commitments-logo/apple-logo.svg",
    description: "Urban mobility and delivery infrastructure at scale.",
  },
];

export default function CommitmentsPage() {
  return (
    <main className={styles.page}>
      <section data-header-theme="light" className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.label}>Commitments</span>

          <h1>
            Backing ambitious founders.
            <br />
            Building enduring companies.
          </h1>
        </div>

        <p>
          We partner with exceptional entrepreneurs from the earliest stages,
          supporting them with capital, network and strategic guidance.
        </p>
      </section>

      <section data-header-theme="light" className={styles.clientsSection}>
        <div className={styles.sectionTop}>
          <span>Selected Commitments</span>
          <span>{clients.length.toString().padStart(2, "0")}</span>
        </div>

        <div className={styles.grid}>
          {clients.map((client) => (
            <article key={client.name} className={styles.card}>
              <div className={styles.logoWrap}>
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={180}
                  height={80}
                  className={styles.logo}
                />
              </div>

              <div className={styles.cardBottom}>
                <h2>{client.name}</h2>
                <p>{client.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}