import { type Variants } from 'framer-motion';

import { EASE } from '@/motion/motion';

export const aboutVariants: Variants = {
  onHome: {
    opacity: 0,
    height: 0,
    pointerEvents: 'none',
    marginBottom: 0,
    transition: {
      duration: 1,
      ease: EASE,
    },
  },
  onAbout: (marginBottom: number) => ({
    opacity: 1,
    height: 'auto',
    pointerEvents: 'auto',
    marginBottom,
    transition: {
      duration: 1,
      ease: EASE,
    },
  }),
};
