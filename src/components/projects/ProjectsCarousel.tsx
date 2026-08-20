import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import { type EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import { usePrevNextButtons } from '@/components/carousel/usePrevNextButtons';
import {
  NextProjectBtn,
  PrevProjectBtn,
} from '@/components/projects/ProjectsCarouselArrows';
import { ProjectSlide } from '@/components/projects/ProjectSlide';
import { type Project } from '@/types/types';

import styles from './ProjectComponents.module.css';

type ProjectCarouselProps = {
  projects: Project[];
  activeProject?: string;
};

export function ProjectsCarousel({
  projects,
  activeProject,
}: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [loadedSlides, setLoadedSlides] = useState<number[]>([]);

  const navigate = useNavigate();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  // When entering route directly, move to active slide
  useEffect(() => {
    if (!emblaApi || !activeProject) return;

    const index = projects.findIndex((project) => project.id === activeProject);

    if (index === -1) return;
    if (emblaApi.selectedScrollSnap() === index) return;

    emblaApi.scrollTo(index);
  }, [emblaApi, projects, activeProject]);

  // When user swipes, URL updates
  useEffect(() => {
    if (!emblaApi) return;

    const updateRoute = () => {
      const index = emblaApi.selectedScrollSnap();
      const project = projects[index];
      if (!project || project.id === activeProject) return;
      void navigate(`/projects/${project.id}`, { replace: true });
    };

    emblaApi.on('settle', updateRoute);

    return () => {
      emblaApi.off('settle', updateRoute);
    };
  }, [emblaApi, navigate, projects, activeProject]);

  // Lazy Loading Slides
  const markSlidesAsLoaded = useCallback((emblaApi: EmblaCarouselType) => {
    console.log('Slides in view:', emblaApi.slidesInView());

    setLoadedSlides((loadedSlides) => [
      ...new Set([...loadedSlides, ...emblaApi.slidesInView()]),
    ]);
  }, []);

  useEffect(() => {
    console.log('Loaded slides:', loadedSlides);
  }, [loadedSlides]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('slidesInView', markSlidesAsLoaded);
    emblaApi.on('reInit', markSlidesAsLoaded);

    return () => {
      emblaApi.off('slidesInView', markSlidesAsLoaded);
      emblaApi.off('reInit', markSlidesAsLoaded);
    };
  }, [emblaApi, markSlidesAsLoaded]);

  return (
    <>
      <div
        className="carousel-viewport w-full h-full overflow-hidden"
        ref={emblaRef}
      >
        <div className={clsx(styles.carouselContainer, 'flex h-full')}>
          {projects.map((project, index) => (
            <ProjectSlide
              project={project}
              key={project.id}
              index={index}
              isLoaded={loadedSlides.includes(index)}
            />
          ))}
        </div>
      </div>
      <div className={styles.carouselControls}>
        <PrevProjectBtn
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <NextProjectBtn
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
    </>
  );
}
