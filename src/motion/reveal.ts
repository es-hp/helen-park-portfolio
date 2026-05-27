export const vertRevealContainerVar = {
  hide: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    pointerEvents: "none",
  },
  show: (addBotMargin: boolean) => ({
    opacity: 1,
    height: "auto",
    marginBottom: addBotMargin ? 16 : 0,
    pointerEvents: "auto",
  }),
} as const;

export const revealTransition = {
  duration: 1,
  ease: "easeInOut",
} as const;

export const profilePhotoRevealVar = {
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
