import clsx from 'clsx';

import type { Project } from '@/types/types';

import { StackIcons } from '../ui/StackIcons';
import { TitleDivider } from '../ui/TitleDivider';

type ProjectSlideProps = {
  project: Project;
};

export function ProjectSlide({ project }: ProjectSlideProps) {
  const projPanelBase = clsx(
    'flex md:flex-1 gap-10 min-w-0 min-h-full p-10 overflow-x-hidden'
  );

  return (
    <article className="proj-slide flex flex-[0_0_100%] flex-col md:flex-row min-w-0 min-h-0 overflow-y-auto">
      <div
        className={clsx('proj-img-panel', projPanelBase, 'bg-amber-300')}
      ></div>
      <div className={clsx('proj-info-panel', projPanelBase, 'flex-col')}>
        <div className="text-container flex-1 min-w-0 flex flex-col justify-start gap-6">
          <header className="flex gap-4 items-center">
            <img src={project.icon} className="w-14 h-14" />
            <h2 className="h2-project">{project.title}</h2>
          </header>
          <div className="project-text-body w-full space-y-6">
            {project.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="project-text-links flex flex-col items-center gap-4">
          <a href="" target="_blank" rel="noopener" className="">
            Live Link
          </a>
          <a href="" target="_blank" rel="noopener">
            Github Repo
          </a>
        </div>
        <div className="project-stack flex-1 min-w-0 flex flex-col gap-4 items-center">
          <TitleDivider botMargin={0}>Stack</TitleDivider>
          <StackIcons techStackItems={project.stack} />
        </div>
      </div>
    </article>
  );
}
