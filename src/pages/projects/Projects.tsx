import { Link } from 'react-router-dom';

import { ProjectCard } from '@/components/projects/ProjectCard';
import { Spinner } from '@/components/ui/LoadingSpinner';
import { useProjects } from '@/hooks/useProjects';

export function Projects() {
  const { data: projects, isPending, isError } = useProjects();

  // const isTrue: boolean = true;

  return (
    <main className="projects flex flex-col items-center justify-start border border-red-600">
      <header>
        <h1 className="text-4xl">Projects</h1>
      </header>
      <div className="flex-1 flex flex-col-reverse justify-center md:flex-row items-start w-full max-w-3xl gap-16 py-32 border border-blue-300">
        <div className="projects-list flex-1 flex flex-col gap-6 self-stretch md:min-h-80 border border-amber-400">
          {isPending ? (
            <Spinner />
          ) : isError ? (
            <div>Error loading projects.</div>
          ) : (
            projects?.map((project, index) => (
              <ProjectCard project={project} index={index} />
            ))
          )}
        </div>
        <div className="projects-filter-container flex flex-col w-full md:w-48 h-32 md:min-h-82 border border-green-300"></div>
      </div>
    </main>
  );
}
