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
  const matchedIndex: number = projects.findIndex(
    (project) => project.id === activeProjectId
  );

  const startIndex = matchedIndex >= 0 ? matchedIndex : 0;

  const carouselRef = useRef<CarouselHandle>(null);

  const options = {
    loop: true,
    watchDrag: () => {
      return window.matchMedia('(any-pointer: coarse)').matches;
    },
    startIndex,
    watchResize: false,
  };

  const slides = projects.map((project, i) => {
    const isSelected = project.id === activeProjectId;
    return (
      <ProjectSlide
        key={project.id}
        project={project}
        index={i}
        isSelected={isSelected}
        height={maxViewportHeight}
      />
    );
  });

  const handleSelect = useCallback(
    (index: number) => {
      // Change slide visibility
      const selectedSlide = document.getElementById(`project-slide-${index}`);

      const unselectedSlides: HTMLElement[] = Array.from(
        document.querySelectorAll<HTMLElement>('.proj-slide')
      ).filter((slide) => slide !== selectedSlide);

      selectedSlide?.classList.remove('invisible');

      for (const slide of unselectedSlides) {
        slide?.classList.add('invisible');
      }

      // Update route
      const project = projects[index];
      if (!project) return;
      window.history.replaceState(window.history.state, '', project.id);
    },
    [projects]
  );

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
        onSlideChange={handleSelect}
        ref={carouselRef}
        showControls={false}
      />
    </>
  );
}
