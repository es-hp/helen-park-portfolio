import { useCallback, useRef } from 'react';

import {
  NextButton,
  PrevButton,
} from '@/components/carousel/CarouselArrowButtons';
import { ProjectSlide } from '@/components/projects/ProjectSlide';
import { type Project } from '@/types';

import type { CarouselHandle } from '../carousel/Carousel';
import { Carousel } from '../carousel/Carousel';
import styles from './ProjectComponents.module.css';

type ProjectCarouselProps = {
  projects: Project[];
  activeProjectId?: string;
  maxViewportHeight?: number;
};

export function ProjectCarousel({
  projects,
  activeProjectId,
  maxViewportHeight,
}: ProjectCarouselProps) {
  const index = projects.findIndex((project) => project.id === activeProjectId);

  const carouselRef = useRef<CarouselHandle>(null);

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

  const slides = projects.map((project, i) => (
    <ProjectSlide
      key={project.id}
      project={project}
      index={i}
      height={maxViewportHeight}
    />
  ));

  return (
    <>
      <div
        className="project-carousel-controls fixed inset-x-0 flex justify-between pointer-events-none z-60"
        aria-hidden="true"
        style={{ height: `${maxViewportHeight}px` }}
      >
        <PrevButton
          onClick={() => carouselRef.current?.scrollPrev()}
          aria-label="Previous"
          className={styles.projCarouselBtn}
        >
          {'<'}
        </PrevButton>
        <NextButton
          onClick={() => carouselRef.current?.scrollNext()}
          aria-label="Next"
          className={styles.projCarouselBtn}
        >
          {'>'}
        </NextButton>
      </div>
      <Carousel
        carouselContent={slides}
        options={options}
        setAutoHeight={true}
        viewportClass="overflow-y-clip"
        onSlideChange={updateRoute}
        ref={carouselRef}
      />
    </>
  );
}
