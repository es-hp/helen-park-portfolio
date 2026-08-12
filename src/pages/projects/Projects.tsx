import { Link } from 'react-router-dom';

import { projects } from '@/content/project-data';

export function Projects() {
  return (
    <section>
      <div>
        <h1>Projects</h1>
        <div className="flex flex-col gap-4 justify-center">
          {projects.map((project, index) => (
            <Link to={`/projects/${project.id}`} key={index}>
              {project.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
