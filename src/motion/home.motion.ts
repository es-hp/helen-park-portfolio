import { easeIn, stagger, type Variants } from 'framer-motion';

import { DURATION_WISPY_FADE, STRONG_EASE_OUT } from './tokens.motion';

type wispyFadeHiddenOptions = { y?: number | string };
type wispyFadeVisibleOptions = { topMarginPx?: number };
type wispyFadeOptions = wispyFadeHiddenOptions & wispyFadeVisibleOptions;

export const wispyFadeVariants = {
  hidden: ({ y = 0 }: wispyFadeOptions) => ({
    y,
    height: 0,
    pointerEvents: 'none',
    opacity: 0,
    scale: 0.99,
    filter: 'blur(3px)',
    marginTop: 0,
    transition: {
      duration: DURATION_WISPY_FADE,
      ease: easeIn,
    },
  }),

  visible: ({ topMarginPx = 24 }: wispyFadeOptions) => ({
    y: 0,
    height: 'auto',
    pointerEvents: 'auto',
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    ...(topMarginPx !== undefined && { marginTop: topMarginPx }),
    transition: {
      duration: DURATION_WISPY_FADE,
      ease: STRONG_EASE_OUT,
    },
  }),

  exit: {
    y: '-0.35rem',
    height: 0,
    pointerEvents: 'none',
    opacity: 0,
    scale: 1.01,
    filter: 'blur(3px)',
    marginTop: 0,
    transition: {
      duration: DURATION_WISPY_FADE,
      ease: easeIn,
    },
  },
} satisfies Variants;

export const wispyStaggerVariants = {
  hidden: {
    transition: {
      delayChildren: stagger(DURATION_WISPY_FADE, { from: 'last' }),
    },
  },
  visible: {
    transition: {
      delayChildren: stagger(DURATION_WISPY_FADE, { from: 'first' }),
    },
  },
} satisfies Variants;

// type MarginOptions =
//   | {
//       topMarginPx?: never;
//       botMarginPx?: never;
//       marginDuration?: never;
//     }
//   | {
//       topMarginPx: number;
//       botMarginPx?: number;
//       marginDuration?: number;
//     }
//   | {
//       topMarginPx?: number;
//       botMarginPx: number;
//       marginDuration?: number;
//     };

// type staggerYVisibleOptions = MarginOptions & {
//   staggerDelay?: number;
// };

// type staggerYHiddenOptions =
//   | {
//       staggerExit?: false;
//       isReversed?: never;
//       staggerExitDelay?: never;
//     }
//   | {
//       staggerExit: true;
//       isReversed?: boolean;
//       staggerExitDelay?: number;
//     };

// export const staggerYVariants = {
//   hidden: ({
//     staggerExit = false,
//     isReversed = true,
//     staggerExitDelay = 0.5,
//   }: staggerYHiddenOptions = {}) => ({
//     marginTop: 0,
//     marginBottom: 0,
//     transition: {
//       delayChildren:
//         staggerExit !== undefined
//           ? stagger(staggerExitDelay, { from: isReversed ? 'last' : 'first' })
//           : 0,
//       duration: 0.05,
//       ease: easeIn,
//     },
//   }),
//   visible: ({
//     staggerDelay = 0.5,
//     topMarginPx,
//     botMarginPx,
//     marginDuration = 0.5,
//   }: staggerYVisibleOptions = {}) => ({
//     ...(topMarginPx !== undefined ? { marginTop: topMarginPx } : {}),
//     ...(botMarginPx !== undefined ? { marginBottom: botMarginPx } : {}),
//     transition: {
//       marginTop: { duration: marginDuration, ease: easeOut },
//       marginBottom: { duration: marginDuration, ease: easeOut },
//       delayChildren: stagger(staggerDelay),
//     },
//   }),
// } satisfies Variants;
