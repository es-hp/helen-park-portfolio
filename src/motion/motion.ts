import type { Transition, Variants } from 'framer-motion';
export const EASE = [0.4, 0, 0.2, 1] as const;

const pageEnterTransition: Transition = {
  duration: 0.2,
  ease: [0.16, 1, 0.3, 1],
};

const pageExitTransition: Transition = {
  duration: 0.12,
  ease: [0.4, 0, 1, 1],
};

export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: pageEnterTransition },
  exit: { opacity: 0, transition: pageExitTransition },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: pageEnterTransition },
};
