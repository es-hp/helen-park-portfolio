import useEmblaCarousel from 'embla-carousel-react';

import { type ProjectImage } from '@/types/types';

type ImageCarouselProps = {
  projectImages: ProjectImage[];
};

export function ImageCarousel({ projectImages }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: () => {
      return window.matchMedia('(any-pointer: coarse)').matches;
    },
  });

  return (
    <div ref={emblaRef} className="carousel-viewport">
      <div className="carousel-container">
        {projectImages.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
