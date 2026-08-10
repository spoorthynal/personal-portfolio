import PageLayout from "../../components/PageLayout/PageLayout";
import styles from "./Contact.module.css";
import { LINKS } from "../../data/links";

export default function Contact() {
  return (
    <PageLayout title="Contact">
      <p>All the ways to reach me and follow my work:</p>
      <ul className={styles.linkList}>
        <li>
          <a className={styles.bigLink} href={LINKS.resume} target="_blank" rel="noopener noreferrer">
            📄 Résumé →
          </a>
        </li>
        <li>
          <a className={styles.bigLink} href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            💼 LinkedIn →
          </a>
        </li>
        <li>
          <a className={styles.bigLink} href={LINKS.github} target="_blank" rel="noopener noreferrer">
            💻 GitHub →
          </a>
        </li>
        <li>
          <a className={styles.bigLink} href={LINKS.email}>
            ✉️ Email →
          </a>
        </li>
      </ul>
    </PageLayout>
  );
}
