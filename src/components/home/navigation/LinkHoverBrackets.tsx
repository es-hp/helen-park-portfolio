import type { ReactNode } from 'react';

import clsx from 'clsx';
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion';

import styles from './Nav.module.css';
import type { NavLinkSize } from './NavLink';

type LinkHoverBracketsProps = {
  children: ReactNode;
  hovered: boolean;
  textSize?: `text-${NavLinkSize}`;
};

const bracketVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

const bracketTransition: Transition = {
  opacity: { duration: 0.1 },
  scale: {
    type: 'spring',
    stiffness: 600,
    damping: 50,
  },
};

export function LinkHoverBrackets({
  children,
  hovered,
  textSize = 'text-2xl',
}: LinkHoverBracketsProps) {
  const bracket = (side: 'left' | 'right') => (
    <AnimatePresence initial={false}>
      {hovered && ( //hovered
        <motion.div
          key={side}
          className={clsx(styles.bracket, styles[side], textSize)}
          variants={bracketVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={bracketTransition}
          style={{
            originX: side === 'left' ? 1 : 0,
          }}
        >
          {side === 'left' ? '<' : '>'}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {bracket('left')}
      {children}
      {bracket('right')}
    </>
  );
}
