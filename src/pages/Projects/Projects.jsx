import PageLayout from "../../components/PageLayout/PageLayout";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import styles from "./Projects.module.css";
import { PROJECTS } from "../../data/projects";

export default function Projects() {
  return (
    <PageLayout title="Projects">
      <div className={styles.grid}>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </PageLayout>
  );
}
