import styles from "./PageLayout.module.css";

export default function PageLayout({ id, title, children }) {
  return (
    <section id={id} className={styles.page}>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
