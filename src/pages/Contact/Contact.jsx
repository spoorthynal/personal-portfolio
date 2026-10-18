import PageLayout from "../../components/PageLayout/PageLayout";
import styles from "./Contact.module.css";
import { LINKS } from "../../data/links";

export default function Contact() {
  return (
    <PageLayout id="contact" title="Contact">
      <p>All the ways to reach me and follow my work:</p>
      <ul className={styles.linkList}>
        <li className={styles.item}>
          <a className={styles.circle} href={LINKS.resume} target="_blank" rel="noopener noreferrer">
            <svg className={styles.logo} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H14a1 1 0 0 1-1-1V3.5zM8 13h8v1.5H8V13zm0 3.5h8V18H8v-1.5zM8 9.5h3V11H8V9.5z" />
            </svg>
          </a>
          <span className={styles.label}>Résumé</span>
        </li>
        <li className={styles.item}>
          <a className={styles.circle} href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            <svg className={styles.logo} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <span className={styles.label}>LinkedIn</span>
        </li>
        <li className={styles.item}>
          <a className={styles.circle} href={LINKS.github} target="_blank" rel="noopener noreferrer">
            <svg className={styles.logo} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.02c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3z" />
            </svg>
          </a>
          <span className={styles.label}>GitHub</span>
        </li>
        <li className={styles.item}>
          <a className={styles.circle} href={LINKS.email}>
            <svg className={styles.logo} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.24-7.47 4.67a1 1 0 0 1-1.06 0L4 8.24V6l8 5 8-5v2.24z" />
            </svg>
          </a>
          <span className={styles.label}>Email</span>
        </li>
      </ul>
    </PageLayout>
  );
}
