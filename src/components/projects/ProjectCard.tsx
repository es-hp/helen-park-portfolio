import StackIcon from 'tech-stack-icons';

import { fadeInXVariants, MotionLink } from '@/motion';
import type { Project } from '@/types';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <MotionLink
      variants={fadeInXVariants}
      to={`/projects/${project.id}`}
      key={index}
      className="bg-card-bg border border-card-border hover:bg-card-bg-hover transition-colors"
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
    </MotionLink>
  );
}
