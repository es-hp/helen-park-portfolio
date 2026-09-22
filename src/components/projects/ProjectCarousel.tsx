import { useCallback, useMemo, useRef, useState } from 'react';

import type { EmblaOptionsType } from 'embla-carousel';

import {
  NextButton,
  PrevButton,
} from '@/components/carousel/CarouselArrowButtons';
import { ProjectGalleryFooter } from '@/components/projects/ProjectGalleryFooter';
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
  const matchedIndex = projects.findIndex(
    (project) => project.id === activeProjectId
  );
  const startIndex = matchedIndex >= 0 ? matchedIndex : 0;
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(
    () => new Set([startIndex])
  );

  const carouselRef = useRef<CarouselHandle | null>(null);

  const options = useMemo<EmblaOptionsType>(
    () => ({
      loop: true,
      startIndex,
      watchResize: false,
      watchDrag: () => window.matchMedia('(any-pointer: coarse)').matches,
      duration: 30,
      breakpoints: {
        '(prefers-reduced-motion: reduce)': {
          duration: 0,
        },
      },
    }),
    [startIndex]
  );

  const handleSelect = useCallback(
    (index: number) => {
      setSelectedIndex(index);

      setVisibleIndices((prev) => {
        if (prev.has(index)) return prev;
        return new Set(prev).add(index);
      });

      const project = projects[index];

      if (!project) return;

      // Update route
      window.history.replaceState(window.history.state, '', project.id);
    },
    [projects]
  );

  const handleSettle = useCallback(
    (index: number) => setVisibleIndices(new Set([index])),
    []
  );

  const slides = projects.map((project, i) => (
    <ProjectSlide
      key={project.id}
      project={project}
      index={i}
      isSelected={visibleIndices.has(i)}
      height={maxViewportHeight}
    />
  ));

  const controlsStyle =
    maxViewportHeight === undefined ? undefined : { height: maxViewportHeight };

  return (
    <>
      <div
        className="project-carousel-controls fixed inset-x-0 flex justify-between pointer-events-none z-60"
        aria-hidden="true"
        style={controlsStyle}
      >
        <PrevButton
          onClick={() => carouselRef.current?.scrollPrev()}
          aria-label="Previous project"
          className={styles.projCarouselBtn}
        >
          {'<'}
        </PrevButton>
        <NextButton
          onClick={() => carouselRef.current?.scrollNext()}
          aria-label="Next project"
          className={styles.projCarouselBtn}
        >
          {'>'}
        </NextButton>
      </div>

      <Carousel
        ref={carouselRef}
        carouselContent={slides}
        options={options}
        setAutoHeight={true}
        viewportClass="overflow-y-clip"
        onSlideChange={handleSelect}
        onSlideSettled={handleSettle}
        showControls={false}
        emblaWrapperClass={styles.projCarouselWrapper}
      />

      <ProjectGalleryFooter
        projects={projects}
        selectedIndex={selectedIndex}
        handleScrollTo={(index) => carouselRef.current?.scrollTo(index, true)}
      />
    </>
  );
}
