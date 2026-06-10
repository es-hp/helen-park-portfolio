// import clsx from "clsx";
import { useState } from 'react';

import { motion, useAnimate } from 'framer-motion';

import { AboutPhoto } from '@/components/about/AboutPhoto';
import { Nav } from '@/components/layout/PrimaryNav/Nav';
import { StatusBadge } from '@/components/ui/StatusBadge';

import styles from './Home.module.css';
import { aboutPhotoVariants } from './motionHome';

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [photoAnimate, setPhotoAnimate] = useState<'onHome' | 'onAbout'>(
    'onHome'
  );
  const [navAnimate, setNavAnimate] = useState<'onHome' | 'onAbout'>('onHome');
  const [scope, animate] = useAnimate();

  const showAbout = () => {
    setIsAboutOpen(true);
    animate(
      '#main-header',
      { scale: 0.875, marginBottom: 32 },
      {
        duration: 1,
        ease: 'easeInOut',
      }
    );
    setPhotoAnimate('onAbout');
    setNavAnimate('onAbout');
  };

  const hideAbout = () => {
    setNavAnimate('onHome');
    setPhotoAnimate('onHome');
    animate(
      '#main-header',
      { scale: 1, marginBottom: 64 },
      {
        duration: 1.5,
        ease: 'easeInOut',
      }
    );
    setIsAboutOpen(false);
  };

  return (
    <motion.main ref={scope} className={styles.main}>
      <motion.header
        id="main-header"
        className="flex flex-col text-center origin-top"
      >
        <h1 className="self-center -mt-6">{'{ Helen Park }'}</h1>
        <p className="h1-sub self-center">Software Engineer</p>
      </motion.header>
      <motion.div
        variants={aboutPhotoVariants}
        initial="onHome"
        animate={photoAnimate}
        id="about-photo"
        className="overflow-hidden"
      >
        <AboutPhoto />
      </motion.div>
      <StatusBadge />
      <Nav
        animateState={navAnimate}
        showAbout={showAbout}
        hideAbout={hideAbout}
      />
    </motion.main>
  );
}
