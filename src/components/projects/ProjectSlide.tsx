import type { Project } from '@/types/types';

import styles from './ProjectComponents.module.css';

type ProjectSlideProps = {
  project: Project;
};

export function ProjectSlide({ project }: ProjectSlideProps) {
  return (
    <article className={styles.projSlide} key={project.id}>
      <h2>{project.title}</h2>
    </article>
  );
}
