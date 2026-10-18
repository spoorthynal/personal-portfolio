import PageLayout from "../../components/PageLayout/PageLayout";
import WorkCard from "../../components/WorkCard/WorkCard";
import styles from "./Work.module.css";
import { WORK, PROJECTS } from "../../data/work";

export default function Work() {
  return (
    <PageLayout id="work" title="Work">
      <section>
        <h2 className={styles.sectionHeading}>Experience</h2>
        <div className={styles.grid}>
          {WORK.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Projects</h2>
        <div className={styles.grid}>
          {PROJECTS.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
