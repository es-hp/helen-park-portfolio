import { type Variants } from 'framer-motion';

export const aboutPhotoVariants: Variants = {
  onHome: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    pointerEvents: 'none',
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
  onAbout: {
    opacity: 1,
    height: 'auto',
    marginBottom: 16,
    pointerEvents: 'auto',
    transition: {
      duration: 1,
      ease: 'easeIn',
    },
  },
};
