import { useEffect, useState } from "react";
import styles from "./TypingText.module.css";
import { cx } from "../../utils/cx";

// Types `text` out letter by letter once, then fades the cursor away.
export default function TypingText({ text, speed = 90, delay = 300 }) {
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    let i = 0;
    let id;
    const step = () => {
      i += 1;
      // Type a space together with the next letter so it doesn't read as a pause.
      if (text[i - 1] === " ") i += 1;
      setCount(i);
      if (i < text.length) id = setTimeout(step, speed);
    };
    // Wait for the web font so letters don't jump when it swaps in mid-typing.
    let cancelled = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (!cancelled) id = setTimeout(step, delay);
    });
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [text, speed, delay, reduceMotion]);

  const done = reduceMotion || count >= text.length;

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{reduceMotion ? text : text.slice(0, count)}</span>
      <span className={cx(styles.caret, done && styles.caretDone)} aria-hidden="true" />
      {/* The untyped rest holds its space so the centered line doesn't shift. */}
      <span className={styles.rest} aria-hidden="true">
        {reduceMotion ? "" : text.slice(count)}
      </span>
    </span>
  );
}
