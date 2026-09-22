import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { type ReactNode } from 'react';

import clsx from 'clsx';
import { type EmblaOptionsType } from 'embla-carousel';
import AutoHeight from 'embla-carousel-auto-height';
import useEmblaCarousel from 'embla-carousel-react';

import { useTweenOpacity } from '@/hooks/useTweenOpacity';

import styles from './Carousel.module.css';
import { NextButton, PrevButton } from './CarouselArrowButtons';

export type CarouselHandle = {
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number, jump?: boolean) => void;
};

type CarouselButtonProps = {
  el: ReactNode;
  ariaLabel?: string;
};

type CarouselProps = {
  carouselContent: ReactNode;
  options?: EmblaOptionsType;
  setAutoHeight?: boolean;
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

export const Carousel = forwardRef<CarouselHandle, CarouselProps>(
  function Carousel(props: CarouselProps, ref) {
    const {
      carouselContent,
      options,
      setAutoHeight = false,
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

    const [emblaRef, emblaApi] = useEmblaCarousel(
      options,
      setAutoHeight ? [AutoHeight()] : []
    );

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
    }, [
      emblaApi,
      selectedIndex,
      onSlideSettled,
      onSlideChange,
      onSlidesInView,
    ]);

    useEffect(() => {
      if (!emblaApi) return;

      let active = true;
      let animationFrameId: number | undefined;

      const scheduleReInit = () => {
        if (!active) return;

        if (animationFrameId !== undefined) {
          cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(() => {
          animationFrameId = undefined;

          if (active) {
            emblaApi.reInit();
          }
        });
      };

      void document.fonts.ready.then(scheduleReInit);

      const viewport = emblaApi.rootNode();
      let previousWidth = viewport.clientWidth;

      const resizeObserver = new ResizeObserver(() => {
        const currentWidth = viewport.clientWidth;

        if (currentWidth === previousWidth) return;

        previousWidth = currentWidth;
        scheduleReInit();
      });

      resizeObserver.observe(viewport);

      return () => {
        active = false;
        resizeObserver.disconnect();

        if (animationFrameId !== undefined) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }, [emblaApi]);

    useImperativeHandle(
      ref,
      function createCarouselHandle(): CarouselHandle {
        return {
          scrollPrev() {
            emblaApi?.scrollPrev();
          },
          scrollNext() {
            emblaApi?.scrollNext();
          },
          scrollTo(index, jump = false) {
            emblaApi?.scrollTo(index, jump);
          },
        };
      },
      [emblaApi]
    );

    useTweenOpacity(emblaApi);

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
);
