import type { Project } from '@/types/types';

import { StackIcons } from '../ui/StackIcons';
import { TitleDivider } from '../ui/TitleDivider';

type ProjectSlideProps = {
  project: Project;
};

export function ProjectSlide({ project }: ProjectSlideProps) {
  return (
    <article className="flex flex-[0_0_100%] flex-col md:flex-row min-w-0">
      <div className="proj-img-container flex-1 min-w-0 flex h-full p-6 border border-purple-500 overflow-hidden"></div>
      <div className="proj-info-container flex-1 min-w-0 flex flex-col h-full p-6 overflow-x-hidden">
        <div className="text-container flex-1 min-w-0 flex flex-col justify-start gap-8 pb-8 border border-[#800080] ">
          <header className="flex gap-4 items-center">
            <img src={project.icon} className="w-12 h-12" />
            <h2 className="text-(length:--text-2xl) whitespace-nowrap">
              {project.title}
            </h2>
          </header>
          <div className="project-text-body w-full space-y-6 border border-red-600">
            {project.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="project-text-links flex flex-col gap-4">
            <a
              href=""
              target="_blank"
              rel="noopener"
              className="border border-gray-600"
            >
              Live Link
            </a>
            <a href="" target="_blank" rel="noopener">
              Github Repo
            </a>
          </div>
        </div>
        <div className="project-stack flex-1 min-w-0 flex flex-col gap-4 items-center border-4 border-orange-500">
          <TitleDivider botMargin={0}>Stack</TitleDivider>
          <StackIcons techStackItems={project.stack} />
        </div>
      </div>
    </article>
  );
}
