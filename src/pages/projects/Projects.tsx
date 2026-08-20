import { Link } from 'react-router-dom';

import { useProjects } from '@/hooks/useProjects';

export function Projects() {
  const { data: projects, isPending, isError } = useProjects();

  return (
    <section>
      <div>
        <h1>Projects</h1>
        <div className="flex flex-col gap-4 justify-center">
          {isPending ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error loading projects.</div>
          ) : (
            projects.map((project, index) => (
              <Link to={`/projects/${project.id}`} key={index}>
                {project.title}
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
