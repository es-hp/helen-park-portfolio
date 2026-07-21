import { useParams } from 'react-router-dom';

import { ProjectsCarousel } from '@/components/projects/ProjectsCarousel';
import { ProjectsHeader } from '@/components/projects/ProjectsHeader';

import styles from './Projects.module.css';

export function Projects() {
  const { projectId } = useParams();

  return (
    <main className={styles.projectsPage}>
      <header>
        <ProjectsHeader />
      </header>
      <section className={styles.carousel} aria-label="Projects">
        <ProjectsCarousel activeProject={projectId} />
      </section>
    </main>
  );
}
