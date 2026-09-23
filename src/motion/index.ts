import type { Transition, Variants } from 'framer-motion';

export const EASE = [0.4, 0, 0.2, 1] as const;

/* Global page's <main> & footer mount/unmount animations */
const pageEnterTransition: Transition = {
  duration: 0.15,
  ease: [0.16, 1, 0.3, 1],
};

const pageExitTransition: Transition = {
  duration: 0.1,
  ease: [0.4, 0, 1, 1],
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.99 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: pageEnterTransition,
  },
  exit: {
    opacity: 0,
    scale: 1.005,
    transition: pageExitTransition,
  },
};

export const footerVariants: Variants = {
  ...fadeVariants,
  exit: {
    ...fadeVariants.exit,
    position: 'absolute',
  },
};
