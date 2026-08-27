import { useEffect } from 'react';
import { type ReactNode } from 'react';

import clsx from 'clsx';
import { type EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import styles from './Carousel.module.css';
import { NextButton, PrevButton } from './CarouselArrowButtons';

type CarouselButtonProps = {
  el: ReactNode;
  ariaLabel?: string;
};

type CarouselProps = {
  carouselContent: ReactNode;
  options?: EmblaOptionsType;
  emblaWrapperClass?: string;
  viewportClass?: string;
  containerClass?: string;
  selectedIndex?: number;
  onSlideChange?: (index: number) => void;
  onSlideSettled?: (index: number) => void;
  onSlidesInView?: (indexes: number[]) => void;
  showControls?: boolean;
  controlStyles?: string;
  prevButton?: CarouselButtonProps;
  nextButton?: CarouselButtonProps;
};

export function Carousel(props: CarouselProps) {
  const {
    carouselContent,
    options,
    emblaWrapperClass,
    viewportClass,
    containerClass,
    selectedIndex,
    onSlideChange,
    onSlideSettled,
    onSlidesInView,
    showControls = true,
    controlStyles,
    prevButton,
    nextButton,
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

    if (
      selectedIndex !== undefined &&
      emblaApi.selectedScrollSnap() !== selectedIndex
    ) {
      emblaApi.scrollTo(selectedIndex);
    }

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
  }, [emblaApi, selectedIndex, onSlideSettled, onSlideChange, onSlidesInView]);

  return (
    <div className={clsx(styles.emblaWrapper, emblaWrapperClass)}>
      <div
        className={clsx(styles.carouselViewport, viewportClass)}
        ref={emblaRef}
      >
        <div className={clsx(styles.carouselContainer, containerClass)}>
          {carouselContent}
        </div>
      </div>
      {showControls && (
        <div className={clsx(styles.carouselControls, controlStyles)}>
          <PrevButton
            onClick={() => emblaApi?.scrollPrev()}
            aria-label={prevButton?.ariaLabel ?? 'Previous'}
          >
            {prevButton?.el ?? '<'}
          </PrevButton>
          <NextButton
            onClick={() => emblaApi?.scrollNext()}
            aria-label={nextButton?.ariaLabel ?? 'Next'}
          >
            {nextButton?.el ?? '>'}
          </NextButton>
        </div>
      )}
    </div>
  );
}
