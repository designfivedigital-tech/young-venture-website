import styles from "./AboutUsPage.module.css";

const items = [
  { label: "Digital and frontier technologies", icon: "chip" },
  { label: "Digital and frontier technologies", icon: "brain" },
  { label: "Sustainability and advanced industries", icon: "leaf", active: true },
  { label: "Human argumentation and advanced materials", icon: "nodes" },
  { label: "Digital and frontier technologies", icon: "rocket" },
];

export default function FocusAreasSection() {
  return (
    <section className={styles.focusSection} data-header-theme="light">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <span className={styles.eyebrow}>FOCUS AREAS</span>
            <h2 className={styles.title}>
              OUR DEFINITION
              <br />
              OF DEEP TECH
            </h2>
            <span className={styles.gradientLine} />
          </div>

          <p className={styles.copy}>
            Our focus spans sectors where scientific breakthroughs can unlock
            meaningful economic and societal impact, including climate and
            energy technologies, advanced materials, robotics, industrial
            automation, medical technologies, computational biology, and
            frontier physics-based innovations.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.leftGraphic}>
            <div className={styles.arc} />

            <div className={styles.items}>
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.item} ${item.active ? styles.active : ""}`}
                >
                  <div className={styles.iconWrap}>
                    <Icon type={item.icon} />
                  </div>

                  <div className={styles.itemText}>
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.imageWrap}>
            <div className={styles.imageRing}>
              <img
                src="/images/focus-areas/sustainability.jpg"
                alt="Sustainability and advanced industries"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Icon({ type }: { type: string }) {
  if (type === "leaf") {
    return (
      <svg viewBox="0 0 48 48">
        <path d="M39 9C19 10 9 22 12 37c15 3 27-7 27-28Z" />
        <path d="M13 36c7-9 14-15 25-21" />
      </svg>
    );
  }

  if (type === "rocket") {
    return (
      <svg viewBox="0 0 48 48">
        <path d="M28 8c6 1 10 5 12 12L26 34l-12-12L28 8Z" />
        <path d="M16 24l-7 3 5 5" />
        <path d="M24 32l-3 7-5-5" />
        <circle cx="29" cy="19" r="3" />
      </svg>
    );
  }

  if (type === "brain") {
    return (
      <svg viewBox="0 0 48 48">
        <path d="M18 15a6 6 0 0 1 11-3 6 6 0 0 1 8 8 6 6 0 0 1-2 11 7 7 0 0 1-13 2 7 7 0 0 1-10-7 6 6 0 0 1 6-11Z" />
        <path d="M24 12v25M18 21h12M17 30h14" />
      </svg>
    );
  }

  if (type === "nodes") {
    return (
      <svg viewBox="0 0 48 48">
        <circle cx="24" cy="13" r="4" />
        <circle cx="13" cy="31" r="4" />
        <circle cx="35" cy="31" r="4" />
        <circle cx="24" cy="35" r="4" />
        <path d="M22 17 15 28M26 17l7 11M17 31h14M24 17v14" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48">
      <rect x="16" y="16" width="16" height="16" rx="3" />
      <rect x="21" y="21" width="6" height="6" rx="1" />
      <path d="M12 20h4M12 28h4M32 20h4M32 28h4M20 12v4M28 12v4M20 32v4M28 32v4" />
    </svg>
  );
}