import { ProjectCard } from '@/components/projects/ProjectCard';
import { Spinner } from '@/components/ui/LoadingSpinner';
import { useProjects } from '@/hooks/useProjects';

export function Projects() {
  const { data: projects, isPending, isError } = useProjects();

  return (
    <main className="projects flex flex-col min-h-0 items-center justify-start overflow-clip border border-red-600">
      <header>
        <h1 className="text-4xl">Projects</h1>
      </header>
      <div className="flex flex-1 flex-col-reverse justify-center md:flex-row items-start w-full max-w-3xl min-h-0 gap-16 pt-16 md:py-32">
        <div className="projects-list flex-1 flex flex-col gap-6 self-stretch overflow-y-auto scrollbar-gutter-stable">
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
