import clsx from 'clsx';

import type { Project } from '@/types/types';

import { StackIcons } from '../ui/StackIcons';
import { TitleDivider } from '../ui/TitleDivider';
import { ImageCarousel } from './ImageCarousel';

type ProjectSlideProps = {
  project: Project;
  index: number;
  isLoaded: boolean;
};

export function ProjectSlide(props: ProjectSlideProps) {
  const { project, isLoaded } = props;

  const projPanelBase = clsx('flex flex-col md:flex-1 gap-10 min-w-0');

  return (
    <article className="proj-slide">
      {isLoaded && (
        <div className="proj-loaded-content flex flex-col md:flex-row p-(--app-layout-padding) gap-(--app-layout-padding) overflow-x-clip">
          {/* Left/Top Panel */}
          <div
            className={clsx(
              'proj-img-panel',
              projPanelBase,
              'border border-purple-300'
            )}
          >
            <div className="img-carousel-wrapper flex flex-col gap-10 md:sticky md:top-(--height-header) overflow-x-hidden border border-green-400">
              <ImageCarousel projectImages={project.images} />
            </div>
          </div>

          {/* Right/Bottom Panel */}
          <div
            className={clsx(
              'proj-info-panel',
              projPanelBase,
              'justify-between'
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
      )}
    </article>
  );
}
