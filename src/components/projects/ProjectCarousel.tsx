import { useCallback } from 'react';

import { ProjectSlide } from '@/components/projects/ProjectSlide';
import { useAppLayoutRefs } from '@/hooks/useAppLayoutRefs';
import { useAvailableViewportHeight } from '@/hooks/useAvailableViewportHeight';
import { type Project } from '@/types';

import { Carousel } from '../carousel/Carousel';
import { NextProjectBtn, PrevProjectBtn } from './ProjectCarouselArrows';

type ProjectCarouselProps = {
  projects: Project[];
  activeProjectId?: string;
};

export function ProjectCarousel({
  projects,
  activeProjectId,
}: ProjectCarouselProps) {
  const index = projects.findIndex((project) => project.id === activeProjectId);

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
      if (!project) return;
      window.history.replaceState(window.history.state, '', project.id);
    },
    [projects]
  );

  const { headerRef, footerRef } = useAppLayoutRefs();

  const availableHeightPx = useAvailableViewportHeight({
    headerRef,
    footerRef,
  });

  const slides = projects.map((project, i) => (
    <ProjectSlide
      key={project.id}
      project={project}
      index={i}
      height={availableHeightPx}
    />
  ));

  return (
    <Carousel
      carouselContent={slides}
      options={options}
      setAutoHeight={true}
      viewportClass="overflow-y-clip"
      onSlideChange={updateRoute}
      controlStyles="[--controls-inset:var(--app-layout-padding)]"
      nextButton={{ el: <NextProjectBtn />, ariaLabel: 'Next project' }}
      prevButton={{ el: <PrevProjectBtn />, ariaLabel: 'Previous project' }}
    />
  );
}
