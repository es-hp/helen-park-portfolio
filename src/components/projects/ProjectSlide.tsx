import { StackIcons } from '@/components/ui/StackIcons';
import { TitleDivider } from '@/components/ui/TitleDivider';
import type { Project } from '@/types';

import { ImageCarousel } from './ImageCarousel';

type ProjectSlideProps = {
  project: Project;
  index: number;
  height?: number;
};

export function ProjectSlide(props: ProjectSlideProps) {
  const { project, height } = props;

  const header = (display: 'flex md:hidden' | 'hidden md:flex') => (
    <header className={`${display} gap-4 items-center`}>
      <img src={project.icon} className="size-14 rounded-sm" />
      <h2 className="h2-project">{project.title}</h2>
    </header>
  );

  return (
    // More styles for this slides at Carousel.module.css
    <article
      className="proj-slide flex flex-col"
      style={{ minHeight: `${height}px` }}
    >
      <div className="proj-loaded-content flex-1 flex flex-col w-full md:flex-row gap-page-gutter overflow-x-clip min-h-0">
        {/* Left/Top Panel */}
        <div className="proj-img-panel md:sticky flex-1 top-header-height flex flex-col gap-12 min-w-0 h-full">
          {header('flex md:hidden')}
          <div className="sticky-wrapper flex flex-col">
            <ImageCarousel projectImages={project.images} />
          </div>
          <div className="project-stack min-w-0 flex flex-col gap-4 items-center">
            <TitleDivider botMargin={0}>Stack</TitleDivider>
            <StackIcons techStackItems={project.stack} />
          </div>
        </div>

        {/* Right/Bottom Panel */}
        <div className="proj-info-panel flex-1 flex flex-col gap-12 min-w-0">
          <div className="text-container min-w-0 flex flex-col gap-6">
            {header('hidden md:flex')}
            <div className="project-text-links flex items-center justify-evenly gap-4">
              <a href="" target="_blank" rel="noopener" className="">
                Live Link
              </a>
              <a href="" target="_blank" rel="noopener">
                Github Repo
              </a>
            </div>
            <div className="project-text-body w-full space-y-6">
              {project.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
