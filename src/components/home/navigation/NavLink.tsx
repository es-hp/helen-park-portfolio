import { useState } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { motion, type Variants } from 'framer-motion';

import { LinkHoverBrackets } from './LinkHoverBrackets';
import { slideDownInVariants, slideDownOutVariants } from './motionNav';
import type { NavItem } from './Nav';
import styles from './Nav.module.css';

export type NavLinkSize = 'lg' | 'xl' | '2xl';

type NavLinkProps = {
  navItem: NavItem;
  size?: NavLinkSize;
};

export function NavLink({ navItem, size = '2xl' }: NavLinkProps) {
  const variantsMap: Record<string, Variants | undefined> = {
    onHome: slideDownOutVariants,
    always: undefined,
    onAbout: slideDownInVariants,
  };
  const variants: Variants | undefined = variantsMap[navItem.showLink];

  const [hovered, setHovered] = useState<boolean>(false);

  const textSize =
    size === 'lg' ? 'text-lg' : size === 'xl' ? 'text-xl' : 'text-2xl';

  const content =
    navItem.type === 'route' ? (
      <Link
        to={navItem.to}
        className={clsx(styles.navLink, textSize)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {navItem.label}
      </Link>
    ) : (
      <button
        onClick={() => navItem.onClick()}
        className={clsx(styles.navLink, textSize)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {navItem.label}
      </button>
    );

  return (
    <motion.div variants={variants} className={styles.navGroup}>
      <LinkHoverBrackets hovered={hovered} textSize={textSize}>
        {content}
      </LinkHoverBrackets>
    </motion.div>
  );
}
