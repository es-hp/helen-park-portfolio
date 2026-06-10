import { motion, type Variants } from 'framer-motion';

import {
  backLinkVariants,
  linksVariants,
  navContainerVariants,
  resumeLinksVariants,
} from '@/components/layout/PrimaryNav/motionNav';

import styles from './Nav.module.css';
import { NavLink } from './NavLink';

type NavRoute = {
  type: 'route';
  label: string;
  to: string;
  showLink: 'onHome' | 'always' | 'onAbout';
};

type NavAction = {
  type: 'action';
  label: string;
  onClick: () => void;
  showLink: 'onHome' | 'always' | 'onAbout';
};

export type NavItem = NavRoute | NavAction;

type NavProps = {
  animateState: 'onHome' | 'onAbout';
  showAbout: () => void;
  hideAbout: () => void;
};

export function Nav({ animateState, showAbout, hideAbout }: NavProps) {
  const variantsMap: Record<string, Variants | undefined> = {
    onHome: linksVariants,
    always: resumeLinksVariants,
    onAbout: backLinkVariants,
  };

  const links: Record<string, NavItem> = {
    about: {
      type: 'action',
      label: 'about',
      onClick: () => showAbout(),
      showLink: 'onHome',
    },
    skills: {
      type: 'route',
      label: 'skills',
      to: '/skills',
      showLink: 'onHome',
    },
    projects: {
      type: 'route',
      label: 'projects',
      to: '/projects',
      showLink: 'onHome',
    },
    contact: {
      type: 'route',
      label: 'contact',
      to: '/contact',
      showLink: 'onHome',
    },
    resume: {
      type: 'route',
      label: 'resume',
      to: '/resume',
      showLink: 'always',
    },
    back: {
      type: 'action',
      label: 'back',
      onClick: () => hideAbout(),
      showLink: 'onAbout',
    },
  };

  return (
    <motion.nav
      variants={{
        onHome: {},
        onAbout: {},
      }}
      className={styles.mainNav}
    >
      <motion.ul
        variants={navContainerVariants}
        animate={animateState}
        initial="onHome"
        className="flex flex-col justify-start"
      >
        {Object.entries(links).map(([key, item]) => {
          return (
            <motion.li key={key} variants={variantsMap[item.showLink]}>
              <NavLink navItem={item} />
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.nav>
  );
}
