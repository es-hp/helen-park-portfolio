import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { ProjectCarousel } from '@/components/projects/ProjectCarousel';
import { ProjectGalleryHeader } from '@/components/projects/ProjectGalleryHeader';
import { Spinner } from '@/components/ui/LoadingSpinner';
import { useElementHeight } from '@/hooks/useElementHeight';
import { useProjects } from '@/hooks/useProjects';

export function ProjectGallery() {
  const { projectId } = useParams();

  const { data: projects, isPending, isError } = useProjects();

  const frameRef = useRef(null);

  const maxViewportHeight = useElementHeight(frameRef);

  return (
    <main id="project-gallery" className="flex-1 flex flex-col min-h-0">
      <div
        ref={frameRef}
        aria-hidden="true"
        className="frame-overlay fixed inset-frame z-50 bg-transparent shadow-[0_0_0_100vmax] shadow-background pointer-events-none"
      >
        <ProjectGalleryHeader />
      </div>
      {isPending ? (
        <div className="flex-1 flex-c-centered p-frame bg-gray-950/5">
          <Spinner />
        </div>
      ) : isError ? (
        <div className="flex-1 flex-c-centered p-frame">
          Error loading projects.
        </div>
      ) : (
        <section
          className="project-gallery-section flex flex-col flex-1 min-h-0 p-frame"
          aria-label="Project carousel"
        >
          <ProjectCarousel
            projects={projects}
            activeProjectId={projectId}
            maxViewportHeight={maxViewportHeight}
          />
        </section>
      )}
    </main>
  );
}
