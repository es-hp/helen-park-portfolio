import type { Variants } from 'framer-motion';

import { STRONG_EASE_OUT } from './tokens.motion';

export type ItemCustom = { entryDelay: number; exitDelay: number };

export const revealItemVariants = {
  hidden: ({ exitDelay }: ItemCustom) => ({
    opacity: 0,
    height: 0,
    marginBottom: 0,
    pointerEvents: 'none',
    transition: {
      opacity: { duration: 0.5, delay: exitDelay },
      height: { duration: 1, ease: STRONG_EASE_OUT, delay: exitDelay },
      marginBottom: { duration: 1, ease: STRONG_EASE_OUT, delay: exitDelay },
    },
  }),
  visible: ({ entryDelay }: ItemCustom) => ({
    opacity: 1,
    height: 'auto',
    marginBottom: 16,
    pointerEvents: 'auto',
    transition: {
      opacity: { duration: 0.5, delay: entryDelay + 0.1 },
      height: { duration: 1, ease: STRONG_EASE_OUT, delay: entryDelay },
      marginBottom: { duration: 1, ease: STRONG_EASE_OUT, delay: entryDelay },
    },
  }),
} satisfies Variants;
