import { Link } from "react-router-dom";
import styles from "./PageLayout.module.css";

export default function PageLayout({ title, children }) {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        ← back to bowl
      </Link>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
