import { useParams } from 'react-router-dom';

import { ProjectCarousel } from '@/components/projects/ProjectCarousel';
import { ProjectGalleryHeader } from '@/components/projects/ProjectGalleryHeader';
import { Spinner } from '@/components/ui/LoadingSpinner';
import { useProjects } from '@/hooks/useProjects';

export function ProjectGallery() {
  const { projectId } = useParams();

  const { data: projects, isPending, isError } = useProjects();

  return (
    <main id="project-gallery" className="flex-1 flex flex-col min-h-0">
      <ProjectGalleryHeader />
      {isPending ? (
        <div className="flex-1 flex-c-centered bg-gray-950/5">
          <Spinner />
        </div>
      ) : isError ? (
        <div className="flex-1 flex-c-centered">Error loading projects.</div>
      ) : (
        <section
          className="project-gallery-section flex flex-col flex-1 min-h-0"
          aria-label="Project carousel"
        >
          <ProjectCarousel projects={projects} activeProjectId={projectId} />
        </section>
      )}
    </main>
  );
}
