import { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import { cx } from "../../utils/cx";
import acaiBowl from "../../assets/acai-bowl.png";

const ITEMS = ["home", "about", "work", "contact"];

export default function Nav() {
  const [current, setCurrent] = useState("home");

  // Highlight whichever section is crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id));
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    // The last section is short and may never reach the middle, so treat
    // hitting the bottom of the page as being on it.
    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setCurrent(ITEMS[ITEMS.length - 1]);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <a href="#home" className={styles.brand}>
        <img src={acaiBowl} alt="" className={styles.brandIcon} />
        spoorthy
      </a>
      <ul className={styles.menu}>
        {ITEMS.map((id) => (
          <li key={id}>
            <a href={`#${id}`} className={cx(styles.navbtn, current === id && styles.navOn)}>
              {id}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
