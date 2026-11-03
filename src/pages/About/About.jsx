import { useState } from "react";
import PageLayout from "../../components/PageLayout/PageLayout";
import styles from "./About.module.css";
import photo1 from "../../assets/about/about-1.jpg";
import photo2 from "../../assets/about/about-2.jpg";
import photo3 from "../../assets/about/about-3.jpg";

// `focus` is the object-position that keeps the subject in the square-ish
// polaroid crop. The last photo starts in front, the middle one back left,
// and the first back right. Optional `zoom` scales a photo up around its
// focus point (1 = no zoom).
const PHOTOS = [
  { id: "photo-3", src: photo3, alt: "Spoorthy looking out over the city at sunset", focus: "45% 60%" },
  { id: "photo-2", src: photo2, alt: "Spoorthy and a friend at a concert", focus: "50% 65%" },
  { id: "photo-1", src: photo1, alt: "Spoorthy at a café with an iced matcha", focus: "50% 52%", zoom: 1.2 },
];
const PHOTO_IDS = PHOTOS.map((p) => p.id);

export default function About() {
  const [order, setOrder] = useState(PHOTO_IDS); // last = front-most

  const bringToFront = (id) => {
    setOrder((prev) => [...prev.filter((p) => p !== id), id]);
  };

  return (
    <PageLayout id="about" title="About">
      <p>
        Hi! I'm Spoorthy, a Computer Science major with a Data Science Engineering minor at UCLA. I love açaí bowls but I also love building impactful solutions to real-world problems and I'm especially interested in Agentic AI and data-driven applications. A fun fact about me is that my name means <i>inspiration</i> so I constantly try to live up to it through my work and actions. In my free time, I like to explore new places, go cafe hopping, listen to music, and dance!
      </p>

      <div className={styles.stack}>
        {PHOTOS.map(({ id, src, alt, focus, zoom = 1 }) => {
          const depth = order.length - 1 - order.indexOf(id);
          return (
            <button
              key={id}
              type="button"
              className={styles.polaroid}
              data-depth={depth}
              onClick={() => bringToFront(id)}
              aria-label={`${alt}. Bring this photo to the front`}
            >
              <span className={styles.frame}>
                <img
                  src={src}
                  alt=""
                  className={styles.photo}
                  style={{ objectPosition: focus, transform: `scale(${zoom})`, transformOrigin: focus }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </PageLayout>
  );
}
