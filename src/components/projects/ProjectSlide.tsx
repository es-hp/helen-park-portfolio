import type { Project } from '@/types/types';

import styles from './ProjectComponents.module.css';

type ProjectSlideProps = {
  project: Project;
};

export function ProjectSlide({ project }: ProjectSlideProps) {
  return (
    <article className={styles.projectSlide} key={project.id}>
      <div className="carousel-container flex-1 flex h-full p-6 border border-purple-500 overflow-hidden"></div>
      <div className="text-container flex-1 flex flex-col gap-8 h-full items-start p-6 border border-[#800080] overflow-hidden">
        <header className="flex gap-4 items-center">
          <img src={project.icon} className="w-12 h-12" />
          <h2 className="text-(length:--text-2xl) whitespace-nowrap">
            {project.title}
          </h2>
        </header>
        <div className="project-text-body flex-1 w-full space-y-6 border border-red-600">
          {project.description.map((p) => (
            <p>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
