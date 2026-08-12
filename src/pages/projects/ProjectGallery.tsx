import { useParams } from 'react-router-dom';

import { ProjectsCarousel } from '@/components/projects/ProjectsCarousel';
import { ProjectsHeader } from '@/components/projects/ProjectsHeader';

export function ProjectGallery() {
  const { projectId } = useParams();

  return (
    <main className="flex flex-col h-full w-full overflow-hidden">
      <header className="shrink-0 h-20">
        <ProjectsHeader />
      </header>
      <section className="relative flex-1 min-h-0" aria-label="Projects">
        <ProjectsCarousel activeProject={projectId} />
      </section>
    </main>
  );
}
