import styles from "./AboutUsPage.module.css";

const beliefs = [
  {
    title: "For us, innovation means three things:",
    text: "research, venture capital, and policy.",
    icon: "⌕",
  },
  {
    title: "Being young means people underestimate you.",
    text: "We turn that into an advantage.",
    icon: "ϟ",
  },
  {
    title: "We understand the founder first.",
    text: "Because every great technology eventually needs a market.",
    icon: "○",
  },
  {
    title: "We invest for the future we want to help build.",
    text: "Not just for a mandate.\nNot just for a covenant.",
    icon: "↗",
  },
  {
    title: "Venture capital has too much noise.",
    text: "We create synergies, not jealousy.",
    icon: "⌁",
  },
  {
    title: "Network is net worth.",
    text: "Sales is discipline.\nWe move first, fast, and relentlessly.",
    icon: "✣",
  },
  {
    title: "We come from the best universities.",
    text: "We think ambitiously.\nWe work like nothing is guaranteed.",
    icon: "◇",
  },
];

export default function BeliefsSection() {
  return (
    <section className={styles.beliefsSection} data-header-theme="dark">
      <div className={styles.beliefsIntro}>
        <span>Young ventures</span>
        <h2>Our Manifesto</h2>
        <div className={styles.beliefsLine} />
        <p>
          Our principles guide every decision we make and every founder we
          support.
        </p>
      </div>

      <div className={styles.beliefsList}>
        {beliefs.map((item, index) => (
          <div className={styles.beliefItemWrap} key={item.title}>
            <div
              className={styles.beliefItem}
              style={{ zIndex: index + 1 }}
            >
              <div className={styles.beliefItemInner}>
                <div className={styles.beliefNumber}>
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className={styles.beliefIcon}>
                  <span>{item.icon}</span>
                </div>

                <div className={styles.beliefText}>
                  <h3>{item.title}</h3>
                  <p>
                    {item.text.split("\n").map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}