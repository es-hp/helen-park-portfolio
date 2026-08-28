import { useRef, useState } from 'react';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

type FooterProps = {
  forceShow?: boolean;
};

const SCROLL_THRESHOLD_DN = 80;
const SCROLL_THRESHOLD_UP = 360;

export function Footer({ forceShow = false }: FooterProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef<number>(0);
  const scrollDistance = useRef<number>(0);
  const prevDirection = useRef<'null' | 'down' | 'up'>(null);

  const shouldHide = forceShow ? false : hidden;

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = lastY.current;
    const distance = current - previous;
    lastY.current = current;

    if (current <= 0) {
      setHidden(false);
      scrollDistance.current = 0;
      prevDirection.current = null;
      return;
    }

    const direction = distance > 0 ? 'down' : 'up';

    if (direction !== prevDirection.current) {
      scrollDistance.current = 0;
      prevDirection.current = direction;
    }

    scrollDistance.current += Math.abs(distance);

    const scrollThreshold: number =
      prevDirection.current === 'down'
        ? SCROLL_THRESHOLD_DN
        : SCROLL_THRESHOLD_UP;

    if (scrollDistance.current >= scrollThreshold) {
      setHidden(direction === 'down');
      scrollDistance.current = 0;
    }
  });

  return (
    <motion.footer
      className="footer fixed bottom-0 inset-x-0  bg-cyan-200"
      animate={{ y: shouldHide ? '100%' : '0%' }}
      transition={{ duration: 3, ease: [0.35, 1, 0.25, 1] }}
    >
      {!shouldHide && (
        <motion.div
          className="flex items-center justify-between px-(--app-layout-padding) py-3"
          animate={{ y: shouldHide ? '100%' : '0%' }}
          transition={{ duration: 3, ease: [0.35, 1, 0.25, 1] }}
        >
          <span>(c) 2026</span>
          <span>Helen Park</span>
          <span>es.helenpark@gmail.com</span>
        </motion.div>
      )}
    </motion.footer>
  );
}
