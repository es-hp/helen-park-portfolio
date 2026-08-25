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

  const mainOptions: EmblaOptionsType = { loop: true };

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

  return (
    <div className="flex flex-col gap-8">
      <Carousel
        carouselContent={mainContent}
        options={mainOptions}
        emblaWrapperClass={styles.mainImageWrapper}
        onSlideSettled={onSelect}
        selectedIndex={selectedIndex}
        showControls={true}
      />
      <div className={styles.thumbWrapper}>
        {projectImages.map((image, index) => (
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
        ))}
      </div>
    </div>
  );
}
