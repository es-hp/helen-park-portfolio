import { type Variants } from 'framer-motion';

import { EASE } from '@/motion/motion';

export const NAV_BOT_MARGIN_REM = '1rem';

const HEIGHT_DURATION = 0.25;

const SLIDE_DURATION = HEIGHT_DURATION / 2;

const MARGIN_DURATION = HEIGHT_DURATION * 2;

export const STAGGER_DURATION = (HEIGHT_DURATION + SLIDE_DURATION) / 2 - 0.1;

const OPACITY_DURATION = HEIGHT_DURATION;

export const navContainerVariants: Variants = {
  onHome: {
    transition: {
      staggerChildren: STAGGER_DURATION,
      staggerDirection: -1,
    },
  },
  onAbout: {
    transition: {
      staggerChildren: STAGGER_DURATION,
      staggerDirection: 1,
    },
  },
};

export const linksVariants: Variants = {
  onHome: {
    opacity: 1,
    height: 'auto',
    marginBottom: NAV_BOT_MARGIN_REM,
    pointerEvents: 'auto',
    transition: {
      ease: EASE,
      opacity: { duration: OPACITY_DURATION },
      height: { duration: HEIGHT_DURATION },
      marginBottom: { duration: MARGIN_DURATION },
    },
  },
  onAbout: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    pointerEvents: 'none',
    transition: {
      ease: EASE,
      opacity: { duration: OPACITY_DURATION },
      height: { duration: HEIGHT_DURATION },
      marginBottom: { duration: MARGIN_DURATION },
    },
  },
};

export const resumeLinksVariants: Variants = {
  onHome: {
    marginBottom: 0,
    transition: {
      duration: MARGIN_DURATION,
      ease: EASE,
    },
  },
  onAbout: {
    marginBottom: NAV_BOT_MARGIN_REM,
    transition: {
      duration: MARGIN_DURATION,
      ease: EASE,
    },
  },
};

export const backLinkVariants: Variants = {
  onHome: {
    opacity: 0,
    height: 0,
    pointerEvents: 'none',
    transition: {
      ease: EASE,
      opacity: { duration: OPACITY_DURATION },
      height: { duration: HEIGHT_DURATION },
    },
  },
  onAbout: {
    opacity: 1,
    height: 'auto',
    pointerEvents: 'auto',
    transition: {
      ease: EASE,
      opacity: { duration: OPACITY_DURATION },
      height: { duration: HEIGHT_DURATION },
    },
  },
};

export const slideDownOutVariants: Variants = {
  onHome: {
    y: '0%',
    transition: { duration: SLIDE_DURATION, ease: EASE },
  },
  onAbout: {
    y: '100%',
    transition: { duration: SLIDE_DURATION, ease: EASE },
  },
};

export const slideDownInVariants: Variants = {
  onHome: {
    y: '-100%',
    transition: { duration: SLIDE_DURATION, ease: EASE },
  },
  onAbout: {
    y: '0%',
    transition: { duration: SLIDE_DURATION, ease: EASE },
  },
};
