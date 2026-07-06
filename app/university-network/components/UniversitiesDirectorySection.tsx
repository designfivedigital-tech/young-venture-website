import Image from "next/image";
import styles from "./UniversitiesDirectorySection.module.css";

type University = {
  name: string;
  location: string;
  logo: string;
  description: string;
  strengths: string[];
};

type CountryGroup = {
  country: string;
  flag: string;
  universities: University[];
};

const countryGroups: CountryGroup[] = [
  {
    country: "Italy",
    flag: "/images/bandiere/bandiera-italia.png",
    universities: [
      {
        name: "Bocconi University",
        location: "Milan, Italy",
        logo: "/images/university-logos/bocconi-university.png",
        description:
          "Bocconi University is internationally recognized for excellence in economics, finance, and management. Located in one of Europe's leading financial centers, it brings to Young Ventures a strong culture of entrepreneurship, investment analysis, and business innovation.",
        strengths: ["Finance", "Economics", "Entrepreneurship", "Management"],
      },
    ],
  },
  {
    country: "United Kingdom",
    flag: "/images/bandiere/bandiera-uk.png",
    universities: [
      {
        name: "University of Oxford",
        location: "Oxford, United Kingdom",
        logo: "/images/university-logos/oxford-university.png",
        description:
          "As one of the world's most renowned academic institutions, Oxford combines centuries of academic excellence with a thriving innovation ecosystem. Its students contribute diverse perspectives shaped by leadership, research, and global impact.",
        strengths: ["Research", "Innovation", "Life Sciences", "Public Policy"],
      },
      {
        name: "University of Cambridge",
        location: "Cambridge, United Kingdom",
        logo: "/images/university-logos/cambridge-university.png",
        description:
          "Home to one of Europe's most successful technology and startup clusters, Cambridge is recognized for its leadership in science, engineering, and entrepreneurship. Its ecosystem continues to produce groundbreaking research and high-growth ventures.",
        strengths: ["Deep Tech", "Engineering", "Research", "Entrepreneurship"],
      },
      {
        name: "London School of Economics and Political Science (LSE)",
        location: "London, United Kingdom",
        logo: "/images/university-logos/lse-university.png",
        description:
          "Located in the heart of one of the world's leading financial hubs, LSE is globally recognized for economics, finance, and social sciences. Its community brings a strong understanding of markets, policy, and global business dynamics.",
        strengths: ["Economics", "Finance", "Global Markets", "Public Affairs"],
      },
    ],
  },
  {
    country: "Switzerland",
    flag: "/images/bandiere/bandiera-svizzera.png",
    universities: [
      {
        name: "ETH Zürich",
        location: "Zurich, Switzerland",
        logo: "/images/university-logos/eth.zurich-university.png",
        description:
          "ETH Zürich is consistently ranked among the world's leading institutions for science and technology. Its strong research culture and close ties to industry make it a cornerstone of Europe's innovation landscape.",
        strengths: [
          "Engineering",
          "Artificial Intelligence",
          "Robotics",
          "Deep Tech",
        ],
      },
    ],
  },
  {
    country: "United States",
    flag: "/images/bandiere/bandiera-usa.png",
    universities: [
      {
        name: "Harvard University",
        location: "Cambridge, Massachusetts, United States",
        logo: "/images/university-logos/harvard-university.png",
        description:
          "Harvard's global reputation for academic excellence, leadership, and innovation has made it one of the most influential institutions in the world. Its entrepreneurial ecosystem spans disciplines, industries, and continents.",
        strengths: ["Leadership", "Entrepreneurship", "Business", "Research"],
      },
      {
        name: "California Institute of Technology (Caltech)",
        location: "Pasadena, California, United States",
        logo: "/images/university-logos/caltech-university.png",
        description:
          "Caltech is recognized for pioneering scientific research and technological advancement. Its highly specialized academic environment has contributed to major breakthroughs across engineering, physics, and space exploration.",
        strengths: ["Science", "Aerospace", "Engineering", "Research"],
      },
      {
        name: "New York University (NYU)",
        location: "New York City, United States",
        logo: "/images/university-logos/nyu.png",
        description:
          "Situated in one of the world's most dynamic business and technology centers, NYU offers a uniquely global perspective. Its ecosystem connects students with finance, entrepreneurship, media, and innovation at an international scale.",
        strengths: ["Finance", "Technology", "Entrepreneurship", "Global Business"],
      },
      {
        name: "Stanford University",
        location: "Stanford, California, United States",
        logo: "/images/university-logos/standford-university.png",
        description:
          "Widely regarded as one of the driving forces behind Silicon Valley, Stanford has played a pivotal role in shaping the modern technology and venture capital ecosystem. Its entrepreneurial culture continues to inspire generations of founders and innovators.",
        strengths: ["Entrepreneurship", "Venture Capital", "Technology", "Innovation"],
      },
    ],
  },
];

function StrengthIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

export default function UniversitiesDirectorySection() {
  return (
    <section
      data-header-theme="light"
      className={`${styles.section} snap-section`}
    >
      <div className={styles.inner}>
        <p className={styles.tagline}>
          A global community of leading institutions driving innovation and
          entrepreneurship.
        </p>

        {countryGroups.map((group) => (
          <div key={group.country} className={styles.countryGroup}>
            <div className={styles.countryHeader}>
              <Image
                src={group.flag}
                alt={`${group.country} flag`}
                width={28}
                height={20}
                className={styles.flag}
              />
              <h2 className={styles.countryName}>{group.country}</h2>
            </div>

            <div className={styles.universitiesRow}>
              {group.universities.map((university) => (
                <article key={university.name} className={styles.card}>
                  <div className={styles.identity}>
                    <div className={styles.logoWrap}>
                      <Image
                        src={university.logo}
                        alt={`${university.name} logo`}
                        width={100}
                        height={68}
                        className={styles.logo}
                      />
                    </div>

                    <div>
                      <h3 className={styles.name}>{university.name}</h3>
                      <span className={styles.location}>
                        {university.location}
                      </span>
                    </div>
                  </div>

                  <p className={styles.description}>{university.description}</p>

                  <div className={styles.strengths}>
                    <span className={styles.strengthsLabel}>
                      Key Strengths
                    </span>

                    <div className={styles.strengthsGrid}>
                      {university.strengths.map((strength) => (
                        <span key={strength} className={styles.strengthItem}>
                          <span className={styles.strengthIcon}>
                            <StrengthIcon />
                          </span>
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}

        <p className={styles.closingTagline}>
          <span className={styles.closingIcon}>
          </span>
          Our network connects top talent, pioneering research, and
          entrepreneurial spirit across the world.
        </p>
      </div>
    </section>
  );
}
