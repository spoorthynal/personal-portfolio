import styles from "./WorkCard.module.css";

export default function WorkCard({ item }) {
  return (
    <div className={styles.card}>
      <div className={styles.thumb} />
      <h3 className={styles.heading}>{item.title}</h3>
      {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
      <p className={styles.description}>{item.description}</p>
      {item.skills?.length > 0 && (
        <ul className={styles.tags}>
          {item.skills.map((skill) => (
            <li key={skill} className={styles.tag}>
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
