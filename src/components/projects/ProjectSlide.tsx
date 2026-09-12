import clsx from 'clsx';

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

  const projPanelBase = clsx('flex flex-col md:flex-1 gap-10 min-w-0');

  return (
    // More styles for this slides at Carousel.module.css
    <article
      className={clsx('proj-slide flex flex-col')}
      style={{ minHeight: height }}
    >
      <div className="proj-loaded-content flex-1 flex flex-col md:flex-row p-(--app-layout-padding) gap-(--app-layout-padding) overflow-x-clip min-h-0">
        {/* Left/Top Panel */}
        <div className={clsx('proj-img-panel', projPanelBase)}>
          <div className="img-carousel-wrapper flex flex-col gap-10 md:sticky md:top-(--height-header) overflow-x-clip">
            <ImageCarousel projectImages={project.images} />
          </div>
        </div>

        {/* Right/Bottom Panel */}
        <div
          className={clsx(
            'proj-info-panel',
            projPanelBase,
            'justify-between pb-30'
          )}
        >
          <div className="text-container min-w-0 flex flex-col gap-6">
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
          <div className="project-stack min-w-0 flex flex-col gap-4 items-center">
            <TitleDivider botMargin={0}>Stack</TitleDivider>
            <StackIcons techStackItems={project.stack} />
          </div>
        </div>
      </div>
    </article>
  );
}
