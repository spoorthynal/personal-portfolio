import styles from "./InfoPanel.module.css";
import { MAP } from "../../data/ingredients";

export default function InfoPanel({ activeId }) {
  if (!activeId) return null;
  const m = MAP[activeId];

  return (
    <div className={styles.panel} key={activeId}>
      <div className={styles.top}>
        <span className={styles.dot} style={{ background: m.color }}>
          {m.emoji}
        </span>
        <div>
          <p className={styles.kicker}>
            {m.label} · {m.section}
          </p>
          <h2 className={styles.heading}>{m.section}</h2>
        </div>
      </div>
      <p className={styles.body}>{m.blurb}</p>
      {m.external ? (
        <a className={styles.cta} href={m.href} target="_blank" rel="noopener noreferrer">
          Open {m.section} →
        </a>
      ) : (
        <a className={styles.cta} href={m.to}>
          Open {m.section} →
        </a>
      )}
    </div>
  );
}
