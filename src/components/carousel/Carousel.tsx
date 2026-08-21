import { useEffect } from 'react';
import { type ReactNode } from 'react';

import clsx from 'clsx';
import { type EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import styles from './Carousel.module.css';
import { NextButton, PrevButton } from './CarouselArrowButtons';

type CarouselButtonProps = {
  children?: ReactNode;
};

type CarouselProps = {
  options?: EmblaOptionsType;
  carouselContent: ReactNode;
  prevButton?: CarouselButtonProps;
  nextButton?: CarouselButtonProps;
  onSlideChange?: (index: number) => void;
  onSlideSettled?: (index: number) => void;
  onSlidesInView?: (indexes: number[]) => void;
};

export function Carousel(props: CarouselProps) {
  const {
    options,
    carouselContent,
    prevButton,
    nextButton,
    onSlideChange,
    onSlideSettled,
    onSlidesInView,
  } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      onSlideChange?.(emblaApi.selectedScrollSnap());
    };

    const handleSettle = () => {
      onSlideSettled?.(emblaApi.selectedScrollSnap());
    };

    const handleSlidesInView = () => {
      onSlidesInView?.(emblaApi.slidesInView());
    };

    handleSlidesInView();

    emblaApi.on('select', handleSelect);
    emblaApi.on('settle', handleSettle);
    emblaApi.on('slidesInView', handleSlidesInView);
    emblaApi.on('reInit', handleSlidesInView);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('settle', handleSettle);
      emblaApi.off('slidesInView', handleSlidesInView);
      emblaApi.off('reInit', handleSlidesInView);
    };
  }, [emblaApi, onSlideSettled, onSlideChange, onSlidesInView]);

  return (
    <>
      <div
        className="carousel-viewport w-full h-full overflow-hidden"
        ref={emblaRef}
      >
        <div className={clsx(styles.carouselContainer, 'flex h-full')}>
          {carouselContent}
        </div>
      </div>
      <div className={styles.carouselControls}>
        <PrevButton onClick={() => emblaApi?.scrollPrev()}>
          {prevButton?.children ?? '<'}
        </PrevButton>
        <NextButton onClick={() => emblaApi?.scrollNext()}>
          {nextButton?.children ?? '>'}
        </NextButton>
      </div>
    </>
  );
}
