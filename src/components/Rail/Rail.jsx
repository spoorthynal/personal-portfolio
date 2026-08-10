import styles from "./Rail.module.css";
import { cx } from "../../utils/cx";
import { MAP } from "../../data/ingredients";

export default function Rail({ ids, isOn, pick, active, side }) {
  return (
    <ul className={cx(styles.rail, side === "left" ? styles.left : styles.right)}>
      {ids.map((id) => {
        const m = MAP[id];
        const on = isOn(id);
        return (
          <li key={id} className={styles.item}>
            <button
              onClick={() => pick(id)}
              className={cx(
                styles.chip,
                on && styles.chipOn,
                active === id && styles.chipActive,
                side === "right" && styles.chipRowReverse
              )}
            >
              <span
                className={cx(styles.chipEmoji, on && styles.chipEmojiOn)}
                style={on ? { background: m.color } : undefined}
              >
                {m.emoji}
              </span>
              <span className={cx(styles.chipText, side === "left" ? styles.textRight : styles.textLeft)}>
                <span className={styles.chipLabel}>{m.label}</span>
                <span className={styles.chipSection}>{on ? `✓ ${m.section}` : m.section}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
