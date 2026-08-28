import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProjectSlide } from '@/components/projects/ProjectSlide';
import { type Project } from '@/types/types';

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

  const [loadedSlides, setLoadedSlides] = useState<number[]>([index]);

  const options = {
    loop: true,
    watchDrag: () => {
      return window.matchMedia('(any-pointer: coarse)').matches;
    },
    startIndex: index,
    watchResize: false,
  };

  const navigate = useNavigate();

  // When user swipes, URL updates
  const updateRoute = useCallback(
    (index: number) => {
      const project = projects[index];
      if (!project || project.id === activeProject) return;
      void navigate(`/projects/${project.id}`, { replace: true });
    },
    [activeProject, navigate, projects]
  );

  // Lazy Loading Slides
  const markSlidesAsLoaded = useCallback((indexes: number[]) => {
    setLoadedSlides((loadedSlides) => [
      ...new Set([...loadedSlides, ...indexes]),
    ]);
  }, []);

  const slides = projects.map((project, i) => (
    <ProjectSlide
      project={project}
      key={project.id}
      index={i}
      isLoaded={loadedSlides.includes(i)}
    />
  ));

  return (
    <Carousel
      carouselContent={slides}
      options={options}
      setAutoHeight={true}
      emblaWrapperClass=""
      viewportClass="overflow-y-clip"
      containerClass="items-start"
      onSlideSettled={updateRoute}
      onSlidesInView={markSlidesAsLoaded}
      controlStyles="[--controls-inset:var(--app-layout-padding)]"
      nextButton={{ el: <NextProjectBtn />, ariaLabel: 'Next project' }}
      prevButton={{ el: <PrevProjectBtn />, ariaLabel: 'Previous project' }}
    />
  );
}
