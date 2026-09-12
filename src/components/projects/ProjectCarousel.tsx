import { useCallback } from 'react';

import { ProjectSlide } from '@/components/projects/ProjectSlide';
import { useAppLayoutRefs } from '@/hooks/useAppLayoutRefs';
import { useAvailableViewportHeight } from '@/hooks/useAvailableViewportHeight';
import { type Project } from '@/types';

import { Carousel } from '../carousel/Carousel';
import { NextProjectBtn, PrevProjectBtn } from './ProjectCarouselArrows';

type ProjectCarouselProps = {
  projects: Project[];
  activeProject?: string;
};

export function ProjectCarousel({
  projects,
  activeProject,
}: ProjectCarouselProps) {
  const index = projects.findIndex((project) => project.id === activeProject);

  const options = {
    loop: true,
    watchDrag: () => {
      return window.matchMedia('(any-pointer: coarse)').matches;
    },
    startIndex: index,
    watchResize: false,
  };

  // When user swipes, URL updates
  const updateRoute = useCallback(
    (index: number) => {
      const project = projects[index];
      if (!project || project.id === activeProject) return;
      window.history.replaceState(window.history.state, '', project.id);
    },
    [activeProject, projects]
  );

  const { headerRef, footerRef } = useAppLayoutRefs();

  const availableHeightPx = useAvailableViewportHeight({
    headerRef,
    footerRef,
  });

  const slides = projects.map((project, i) => (
    <ProjectSlide
      project={project}
      key={project.id}
      index={i}
      height={availableHeightPx}
    />
  ));

  return (
    <Carousel
      carouselContent={slides}
      options={options}
      setAutoHeight={true}
      emblaWrapperClass=""
      viewportClass="overflow-y-clip"
      onSlideChange={updateRoute}
      controlStyles="[--controls-inset:var(--app-layout-padding)]"
      nextButton={{ el: <NextProjectBtn />, ariaLabel: 'Next project' }}
      prevButton={{ el: <PrevProjectBtn />, ariaLabel: 'Previous project' }}
    />
  );
}
