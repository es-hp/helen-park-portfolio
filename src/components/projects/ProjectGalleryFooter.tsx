import clsx from 'clsx';

import type { Project } from '@/types';

type ProjectGalleryFooterProps = {
  projects: Project[];
  selectedIndex: number;
  handleScrollTo: (index: number) => void;
};

export function ProjectGalleryFooter({
  projects,
  selectedIndex,
  handleScrollTo,
}: ProjectGalleryFooterProps) {
  const projectIcons: string[] = projects.map((p) => p.icon);

  return (
    <div className="fixed bottom-0 inset-x-0 flex items-center justify-center gap-6 h-frame z-60">
      {projectIcons &&
        projectIcons.map((icon, i) => {
          const isSelectedIndex = selectedIndex === i;

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleScrollTo(i)}
              aria-label={`View ${projects[i].title}`}
              aria-current={isSelectedIndex ? 'true' : undefined}
            >
              <img
                src={icon}
                className={clsx(
                  'size-6 rounded-sm transition-opacity ease-in-out cursor-pointer hover:opacity-90',
                  isSelectedIndex ? 'opacity-100' : 'opacity-50'
                )}
                alt=""
                aria-hidden="true"
              />
            </button>
          );
        })}
    </div>
  );
}
