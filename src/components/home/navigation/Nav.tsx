import { AnimatePresence, type HTMLMotionProps, motion } from 'framer-motion';

import { useGoBack } from '@/hooks/useGoBack';
import { type ItemCustom, revealItemVariants } from '@/motion/nav.motion';

import { NavLink } from './NavLink';

type PageContext = 'onHome' | 'onAbout';

export type NavItem = {
  label: string;
  showLink: PageContext | 'always';
} & ({ type: 'link'; to: string } | { type: 'action'; onClick: () => void });

type NavProps = HTMLMotionProps<'nav'> & {
  currentPage: PageContext;
  className?: string;
};

const STAGGER = 0.1;

export function Nav({ currentPage, className, ...motionProps }: NavProps) {
  const goBack = useGoBack();

  const links: Record<string, NavItem> = {
    about: {
      label: 'about',
      type: 'link',
      to: '/about',
      showLink: 'onHome',
    },
    skills: {
      label: 'skills',
      type: 'link',
      to: '/skills',
      showLink: 'onHome',
    },
    projects: {
      label: 'projects',
      type: 'link',
      to: '/projects',
      showLink: 'onHome',
    },
    contact: {
      label: 'contact',
      type: 'link',
      to: '/contact',
      showLink: 'onHome',
    },
    resume: {
      label: 'resume',
      type: 'link',
      to: '/resume',
      showLink: 'always',
    },
    back: {
      label: 'back',
      type: 'action',
      onClick: goBack,
      showLink: 'onAbout',
    },
  };

  const getDelay = (
    entries: [string, NavItem][],
    key: string,
    destination: PageContext
  ) => {
    const sequence = entries
      .filter(([, item]) => item.showLink !== 'always')
      .map(([k]) => k);

    if (destination === 'onHome') sequence.reverse();

    return sequence.indexOf(key) * STAGGER;
  };

  const entries = Object.entries(links);

  return (
    <motion.nav {...motionProps} className={className}>
      <ul>
        <AnimatePresence>
          {entries.map(([key, item]) => {
            if (item.showLink !== 'always' && item.showLink !== currentPage) {
              return null;
            }
            const isAlways = item.showLink === 'always';
            const otherPage: PageContext =
              item.showLink === 'onHome' ? 'onAbout' : 'onHome';

            const custom: ItemCustom = isAlways
              ? { entryDelay: 0, exitDelay: 0 }
              : {
                  entryDelay: getDelay(
                    entries,
                    key,
                    item.showLink as PageContext
                  ),
                  exitDelay: getDelay(entries, key, otherPage),
                };

            return (
              <motion.li
                key={key}
                variants={revealItemVariants}
                custom={custom}
                initial={isAlways ? false : 'hidden'}
                animate="visible"
                exit="hidden"
                className="self-center text-center overflow-hidden"
              >
                <NavLink navItem={item} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </motion.nav>
  );
}
