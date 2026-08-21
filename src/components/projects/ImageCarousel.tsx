import { type ProjectImage } from '@/types/types';

import { Carousel } from '../carousel/Carousel';

type ImageCarouselProps = {
  projectImages: ProjectImage[];
};

export function ImageCarousel({ projectImages }: ImageCarouselProps) {
  const content = projectImages.map((image, index) => (
    <div key={index}>
      <img src={image.src} alt={image.alt} />
    </div>
  ));

  const options = {};

  return (
    <>
      <Carousel carouselContent={content} options={options} />
    </>
  );
}
