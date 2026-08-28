import { useParams } from 'react-router-dom';

import { ProjectCarousel } from '@/components/projects/ProjectCarousel';
import { ProjectGalleryHeader } from '@/components/projects/ProjectGalleryHeader';
import { useProjects } from '@/hooks/useProjects';

export function ProjectGallery() {
  const { projectId } = useParams();

  const { data: projects, isPending, isError } = useProjects();

  return (
    <main id="project-gallery" className="flex flex-col w-full">
      <ProjectGalleryHeader />
      <section
        className="project-gallery-section flex-1"
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
