import { Link } from 'react-router-dom';

import StackIcon from 'tech-stack-icons';

import type { Project } from '@/types';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.id}`}
      key={index}
      className="bg-gray-300 hover:bg-gray-400 transition-colors"
    >
      <div className="flex items-start gap-4 w-full p-4">
        <img src={project.icon} className="size-14 rounded-sm" />
        <div className="flex-1 flex flex-col gap-2 justify-center">
          <p className="font-medium">{project.title}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
            {project.stack.map((item) => {
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-center"
                >
                  <StackIcon
                    name={item.icon}
                    variant="grayscale"
                    className="w-5"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
