import { useState } from "react";
import PageLayout from "../../components/PageLayout/PageLayout";
import styles from "./About.module.css";

// TODO: swap each placeholder's contents for a real <img src="..." alt="..." />
// once you have photos — the polaroid frame, stacking, and click-to-front
// interaction all keep working the same way.
const PHOTO_IDS = ["photo-1", "photo-2", "photo-3"];

export default function About() {
  const [order, setOrder] = useState(PHOTO_IDS); // last = front-most

  const bringToFront = (id) => {
    setOrder((prev) => [...prev.filter((p) => p !== id), id]);
  };

  return (
    <PageLayout id="about" title="About">
      {/* TODO: replace with your real bio */}
      <p>
        Hi! I'm Spoorthy, a Computer Science student at UCLA. Apart from building solutions to
        real-world problems, I enjoy exploring and learning about new technologies. In my free
        time, I like to explore new places, go cafe hopping, listen to music, and dance.
      </p>

      <div className={styles.stack}>
        {PHOTO_IDS.map((id) => {
          const depth = order.length - 1 - order.indexOf(id);
          return (
            <button
              key={id}
              type="button"
              className={styles.polaroid}
              data-depth={depth}
              onClick={() => bringToFront(id)}
              aria-label="Bring this photo to the front"
            >
              <span className={styles.photoArea}>
                <span className={styles.icon}>🖼️</span>
                <span className={styles.caption}>Add photo</span>
              </span>
            </button>
          );
        })}
      </div>
    </PageLayout>
  );
}
