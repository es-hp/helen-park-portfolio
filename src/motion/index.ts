import { type Transition, type Variants } from 'framer-motion';

export * from './home.motion';
export * from './motion-components';
export * from './tokens.motion';

/* Global page's <main> & footer mount/unmount animations */
const pageEnterTransition: Transition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

const pageExitTransition: Transition = {
  duration: 0.2,
  ease: [0.4, 0, 1, 1],
};

export const makeFadeTransition = (duration = 1): Transition => ({
  duration,
  ease: [0.05, 0.7, 0.1, 1],
});

export const fadeVariants: Variants = {
  hidden: { opacity: 0, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: pageEnterTransition,
  },
  exit: {
    opacity: 0,
    scale: 1,
    transition: pageExitTransition,
  },
};

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

export const fadeInYVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { opacity: makeFadeTransition(1.6), y: makeFadeTransition() },
  },
};

export const fadeInXVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { opacity: makeFadeTransition(1.6), y: makeFadeTransition() },
  },
};

export const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

export const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};
