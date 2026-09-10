import { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import clsx from 'clsx';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from 'framer-motion';

import { Footer, FOOTER_HEIGHT_REM } from './Footer';
import styles from './Layout.module.css';

type AppLayoutProps = {
  hasHorizPadding?: boolean;
  hasTopPadding?: boolean;
  hasBotPadding?: boolean;
  hasFooter?: boolean;
  footerIsAlwaysVisible?: boolean;
};

const SCROLL_THRESHOLD_DN_PX = 200;
const TOP_THRESHHOLD_PX = FOOTER_HEIGHT_REM * 16;
const BOTTOM_THRESHOLD_PX = FOOTER_HEIGHT_REM * 16 + SCROLL_THRESHOLD_DN_PX;
const HIDDEN_Y = 'calc(100% + 16px)';

const footerVariants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.75, 1.1, 0.95, 1],
    },
  },
  hidden: {
    y: HIDDEN_Y,
    opacity: 0,
    transition: {
      duration: 1,
      ease: [0.75, 1.1, 0.95, 1],
    },
  },
};

export function AppLayout(props: AppLayoutProps) {
  const {
    hasHorizPadding = false,
    hasTopPadding = false,
    hasBotPadding = false,
    hasFooter = true,
    footerIsAlwaysVisible = false,
  } = props;

  /* Footer visibility and animation */
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef<number>(0);
  const scrollDistance = useRef<number>(0);
  const prevDirection = useRef<null | 'down' | 'up'>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const shouldHide = footerIsAlwaysVisible ? false : hidden;

  const isInlineFooterVisible = footerIsAlwaysVisible || isAtBottom;

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = lastY.current;
    const distance = current - previous;

    lastY.current = current;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const distFromBot = Math.max(0, maxScroll - current);

    setIsAtBottom(distFromBot <= BOTTOM_THRESHOLD_PX);

    if (isAtBottom) {
      setHidden(true);
      scrollDistance.current = 0;
      prevDirection.current = null;
      return;
    }

    // Always show at top of the page
    if (current <= TOP_THRESHHOLD_PX) {
      setHidden(false);
      scrollDistance.current = 0;
      prevDirection.current = null;
      return;
    }

    if (distance === 0) return;

    // Reset scroll distance on direction change
    const direction = distance > 0 ? 'down' : 'up';

    if (direction !== prevDirection.current) {
      scrollDistance.current = 0;
      prevDirection.current = direction;
    }

    // Increment scroll distance
    if (direction === 'down') {
      scrollDistance.current += Math.abs(distance);

      if (scrollDistance.current >= SCROLL_THRESHOLD_DN_PX) {
        setHidden(true);
        scrollDistance.current = 0;
      }
    }
  });

  return (
    <div
      className={clsx(
        'app-layout',
        styles.appLayout,
        hasHorizPadding && styles['appLayout--h-padding'],
        hasTopPadding && styles['appLayout--top-padding'],
        hasBotPadding && !hasFooter && styles['appLayout--bot-padding']
      )}
    >
      <Outlet />
      {hasFooter && (
        <>
          <div
            className="flex-c-centered w-full -z-50"
            style={{ height: `${FOOTER_HEIGHT_REM}rem` }}
          >
            {isInlineFooterVisible && <Footer heightRem={FOOTER_HEIGHT_REM} />}
          </div>
          {!footerIsAlwaysVisible && (
            <AnimatePresence>
              {!isAtBottom && (
                <motion.div
                  className="fixed bottom-0 inset-x-0 flex-c-centered w-full z-50 bg-background"
                  variants={footerVariants}
                  initial={false}
                  animate={shouldHide ? 'hidden' : 'visible'}
                  exit="hidden"
                >
                  <Footer heightRem={FOOTER_HEIGHT_REM} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </>
      )}
    </div>
  );
}
