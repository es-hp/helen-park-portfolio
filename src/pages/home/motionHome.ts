export const aboutPhotoRevealVar = {
  hide: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    pointerEvents: "none",
  },
  show: {
    opacity: 1,
    height: "auto",
    marginBottom: 16,
    pointerEvents: "auto",
  },
} as const;

export const revealTransition = {
  duration: 1,
  ease: "easeInOut",
} as const;
