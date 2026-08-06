import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useEmblaCarousel from 'embla-carousel-react';

import { usePrevNextButtons } from '@/components/carousel/usePrevNextButtons';
import {
  NextProjectBtn,
  PrevProjectBtn,
} from '@/components/projects/ProjectsCarouselArrows';
import { ProjectSlide } from '@/components/projects/ProjectSlide';
import { projects } from '@/content/project-data';

import styles from './ProjectComponents.module.css';

type ProjectCarouselProps = {
  activeProject?: string;
};

export function ProjectsCarousel({ activeProject }: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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

    if (index !== -1) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi, activeProject]);

  // When user swipes, URL updates
  useEffect(() => {
    if (!emblaApi) return;

    const updateRoute = () => {
      const index = emblaApi.selectedScrollSnap();

      const project = projects[index];

      if (!project) return;

      if (project.id !== activeProject) {
        void navigate(`/projects/${project.id}`);
      }
    };

    emblaApi.on('select', updateRoute);

    return () => {
      emblaApi.off('select', updateRoute);
    };
  }, [emblaApi, navigate, activeProject]);

  return (
    <>
      <div className={styles.carouselViewport} ref={emblaRef}>
        <div className={styles.carouselContainer}>
          {projects.map((project) => (
            <ProjectSlide project={project} key={project.id} />
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
