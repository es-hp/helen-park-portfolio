import { useParams } from 'react-router-dom';

import { ProjectCarousel } from '@/components/projects/ProjectCarousel';
import { ProjectGalleryHeader } from '@/components/projects/ProjectGalleryHeader';
import { useProjects } from '@/hooks/useProjects';

import styles from './ProjectGallery.module.css';

export function ProjectGallery() {
  const { projectId } = useParams();

  const { data: projects, isPending, isError } = useProjects();

  return (
    <main
      id="project-gallery"
      className="flex flex-col w-full border-2 border-grey-300"
    >
      <ProjectGalleryHeader />
      <section
        className={styles.ProjGallerySection}
        aria-label="Project carousel"
      >
        {isPending ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error loading projects.</div>
        ) : (
          <ProjectCarousel projects={projects} activeProject={projectId} />
        )}
      </section>
    </main>
  );
}
