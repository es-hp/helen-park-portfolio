import { motion } from 'framer-motion';

import { useAppLayoutRefs } from '@/hooks/useAppLayoutRefs';
import {
  makeFadeTransition,
  MotionBackButton,
  MotionLink,
  staticVariants,
} from '@/motion';

import styles from './ProjectComponents.module.css';

const slowFadeTransition = makeFadeTransition();

export function ProjectGalleryHeader() {
  const { headerRef } = useAppLayoutRefs();
  return (
    <motion.header
      variants={staticVariants}
      ref={headerRef}
      className={styles.carouselHeader}
    >
      <MotionBackButton
        layoutId="projects-left-link"
        transition={slowFadeTransition}
      />
      <MotionLink to="/Projects">
        <motion.h1 layoutId="projects-h1" transition={slowFadeTransition}>
          Projects
        </motion.h1>
      </MotionLink>
      <MotionLink
        layoutId="projects-right-link"
        transition={slowFadeTransition}
        to="/Resume"
        className="hover:shadow-[inset_0_-1px_0_currentColor]"
      >
        Resume
      </MotionLink>
    </motion.header>
  );
}
