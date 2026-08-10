import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
  return (
    <div className={styles.card}>
      <div className={styles.thumb} />
      <h3 className={styles.heading}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      <a href={project.link} className={styles.link}>
        View →
      </a>
    </div>
  );
}
