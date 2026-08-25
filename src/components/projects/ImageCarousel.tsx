import { useCallback, useState } from 'react';

import clsx from 'clsx';
import { type EmblaOptionsType } from 'embla-carousel';

import { type ProjectImage } from '@/types/types';

import { Carousel } from '../carousel/Carousel';
import styles from './ProjectComponents.module.css';

type ImageCarouselProps = {
  projectImages: ProjectImage[];
};

export function ImageCarousel({ projectImages }: ImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mainOptions: EmblaOptionsType = {};

  const thumbsOptions: EmblaOptionsType = {
    containScroll: 'keepSnaps',
    dragFree: true,
  };

  const onThumbClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const onSelect = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const mainContent = projectImages.map((image, index) => (
    <img
      key={index}
      src={image.src}
      alt={image.alt}
      className={clsx(styles.mainImageSlide)}
    />
  ));

  const thumbContent = projectImages.map((image, index) => (
    <img
      key={index}
      src={image.src}
      alt={image.alt}
      onClick={() => onThumbClick(index)}
      className={clsx(
        styles.thumbImageSlide,
        index === selectedIndex && styles.selectedImage
      )}
    />
  ));

  return (
    <div className="flex flex-col gap-8">
      <Carousel
        carouselContent={mainContent}
        options={mainOptions}
        emblaWrapperClass={styles.mainImageWrapper}
        onSlideSettled={onSelect}
        selectedIndex={selectedIndex}
        showControls={false}
      />
      <Carousel
        carouselContent={thumbContent}
        options={thumbsOptions}
        emblaWrapperClass={styles.thumbEmblaWrapper}
        selectedIndex={selectedIndex}
        showControls={false}
      />
    </div>
  );
}
