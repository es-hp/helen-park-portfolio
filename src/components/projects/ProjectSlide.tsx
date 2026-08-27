import clsx from 'clsx';

import type { Project } from '@/types/types';

import { StackIcons } from '../ui/StackIcons';
import { TitleDivider } from '../ui/TitleDivider';
import { ImageCarousel } from './ImageCarousel';
import styles from './ProjectComponents.module.css';

type ProjectSlideProps = {
  project: Project;
  index: number;
  isLoaded: boolean;
};

export function ProjectSlide(props: ProjectSlideProps) {
  const { project, isLoaded } = props;

  const projPanelBase = clsx('flex md:flex-1 self-start gap-10 min-w-0');

  return (
    <article className="proj-slide border border-blue-500">
      {isLoaded && (
        <div
          className={clsx(
            styles.ProjLoadedContent,
            'flex flex-col md:flex-row w-full overflow-x-hidden border border-amber-400'
          )}
        >
          {/* Left/Top Panel */}
          <div
            className={clsx(
              styles.projImgPanel,
              projPanelBase,
              'flex flex-col gap-10 md:sticky md:top-0 border border-orange-500'
            )}
          >
            <ImageCarousel projectImages={project.images} />
          </div>

          {/* Right/Bottom Panel */}
          <div
            className={clsx(
              styles.projInfoPanel,
              projPanelBase,
              'flex-col justify-between border border-green-500'
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
