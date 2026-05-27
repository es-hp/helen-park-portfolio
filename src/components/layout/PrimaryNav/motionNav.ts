import { type Variants } from "framer-motion";

export const NAV_BOT_MARGIN_REM = "1rem";

const NAV_STAGGER_DURATION = 1;

const NAV_ANIMATION_DURATION = 2;

const NAV_OPACITY_DURATION = 0.1;

const NAV_HEIGHT_DURATION = 4;

export const navContainerVariants: Variants = {
  onHome: {
    transition: {
      staggerChildren: NAV_STAGGER_DURATION,
      staggerDirection: -1,
    },
  },
  onAbout: {
    transition: {
      staggerChildren: NAV_STAGGER_DURATION,
      staggerDirection: 1,
    },
  },
};

export const linksVariants: Variants = {
  onHome: {
    opacity: 1,
    height: "auto",
    marginBottom: NAV_BOT_MARGIN_REM,
    pointerEvents: "auto",
    transition: {
      opacity: { duration: NAV_OPACITY_DURATION, ease: "easeIn" },
      height: { duration: NAV_HEIGHT_DURATION, ease: "easeIn" },
      marginBottom: { duration: NAV_ANIMATION_DURATION, ease: "easeIn" },
    },
  },
  onAbout: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    pointerEvents: "none",
    transition: {
      opacity: { duration: NAV_OPACITY_DURATION, ease: "easeIn" },
      height: { duration: NAV_HEIGHT_DURATION, ease: "easeIn" },
      marginBottom: { duration: NAV_ANIMATION_DURATION, ease: "easeIn" },
    },
  },
};

export const resumeLinkVariants: Variants = {
  onHome: {
    opacity: 1,
    height: "auto",
    marginBottom: 0,
    pointerEvents: "auto",
    transition: {
      opacity: { duration: NAV_OPACITY_DURATION, ease: "easeIn" },
      height: { duration: NAV_HEIGHT_DURATION, ease: "easeIn" },
      marginBottom: { duration: NAV_ANIMATION_DURATION, ease: "easeIn" },
    },
  },
  onAbout: {
    opacity: 1,
    height: "auto",
    marginBottom: NAV_BOT_MARGIN_REM,
    pointerEvents: "auto",
    transition: {
      opacity: { duration: NAV_OPACITY_DURATION, ease: "easeIn" },
      height: { duration: NAV_HEIGHT_DURATION, ease: "easeIn" },
      marginBottom: { duration: NAV_ANIMATION_DURATION, ease: "easeIn" },
    },
  },
};

export const backLinkVariants: Variants = {
  onHome: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    pointerEvents: "none",
    transition: {
      opacity: { duration: NAV_OPACITY_DURATION, ease: "easeIn" },
      height: { duration: NAV_HEIGHT_DURATION, ease: "easeIn" },
      marginBottom: { duration: NAV_ANIMATION_DURATION, ease: "easeIn" },
    },
  },
  onAbout: {
    opacity: 1,
    height: "auto",
    marginBottom: 0,
    pointerEvents: "auto",
    transition: {
      opacity: { duration: NAV_OPACITY_DURATION, ease: "easeIn" },
      height: { duration: NAV_HEIGHT_DURATION, ease: "easeIn" },
      marginBottom: { duration: NAV_ANIMATION_DURATION, ease: "easeIn" },
    },
  },
};
