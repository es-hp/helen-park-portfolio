import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { motion, useAnimate } from 'framer-motion';

import { AboutPhoto } from '@/components/about/AboutPhoto';
import { Nav } from '@/components/layout/PrimaryNav/Nav';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { about } from '@/content/about';
import { EASE } from '@/motion/motion';
import { clamp } from '@/utils/utils';

import styles from './Home.module.css';
import { aboutVariants } from './motionHome';

export default function Home() {
  const [, setIsAboutOpen] = useState<boolean>(false);
  const [photoAnimate, setPhotoAnimate] = useState<'onHome' | 'onAbout'>(
    'onHome'
  );
  const [aboutTextAnimate, setAboutTextAnimate] = useState<
    'onHome' | 'onAbout'
  >('onHome');
  const [navAnimate, setNavAnimate] = useState<'onHome' | 'onAbout'>('onHome');
  const [scope, animate] = useAnimate();

  const getMarginBot = () => clamp(2 * 16, window.innerHeight * 0.0657, 4 * 16);
  const [marginBot, setMarginBot] = useState(getMarginBot());

  useEffect(() => {
    const update = () => {
      setMarginBot(getMarginBot());
    };

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const showAbout = () => {
    setIsAboutOpen(true);
    animate(
      '#main-header',
      { scale: 0.75, marginBottom: 24 },
      {
        duration: 1,
        ease: EASE,
      }
    );
    setPhotoAnimate('onAbout');
    setAboutTextAnimate('onAbout');
    setNavAnimate('onAbout');
  };

  const hideAbout = () => {
    setNavAnimate('onHome');
    setAboutTextAnimate('onHome');
    setPhotoAnimate('onHome');
    animate(
      '#main-header',
      { scale: 1, marginBottom: marginBot },
      {
        duration: 1.5,
        ease: EASE,
      }
    );
    setIsAboutOpen(false);
  };

  return (
    <motion.main className={clsx(styles.main, 'p-4', 'sm:p-8')}>
      <motion.section ref={scope} className={styles.homeSection}>
        <motion.header
          id="main-header"
          className="flex flex-col text-center origin-top"
        >
          <h1 className="self-center -mt-6">{'{ Helen Park }'}</h1>
          <p className="h1-sub self-center">Software Engineer</p>
        </motion.header>
        <motion.div
          variants={aboutVariants}
          custom={16}
          initial="onHome"
          animate={photoAnimate}
          id="about-photo"
          className="overflow-hidden"
        >
          <AboutPhoto />
        </motion.div>
        <StatusBadge />
        <motion.div
          variants={aboutVariants}
          custom={64}
          initial="onHome"
          animate={aboutTextAnimate}
          id="about-content"
          className="overflow-hidden text-center text-pretty mx-[10%] max-w-3xl mb-9"
        >
          {about}
        </motion.div>
        <Nav
          animateState={navAnimate}
          showAbout={showAbout}
          hideAbout={hideAbout}
        />
      </motion.section>
    </motion.main>
  );
}
