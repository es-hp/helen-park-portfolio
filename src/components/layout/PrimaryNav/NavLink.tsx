import { useState } from 'react';
import { Link } from 'react-router-dom';

import { motion, type Variants } from 'framer-motion';

import LinkHoverBrackets from '@/components/ui/LinkHoverBrackets';

import { slideDownInVariants, slideDownOutVariants } from './motionNav';
import type { NavItem } from './Nav';
import styles from './Nav.module.css';

type NavLinkProps = {
  navItem: NavItem;
};

export function NavLink({ navItem }: NavLinkProps) {
  const variantsMap: Record<string, Variants | undefined> = {
    onHome: slideDownOutVariants,
    always: undefined,
    onAbout: slideDownInVariants,
  };
  const variants: Variants | undefined = variantsMap[navItem.showLink];

  const [hovered, setHovered] = useState<boolean>(false);

  const content =
    navItem.type === 'route' ? (
      <Link
        to={navItem.to}
        className={styles.navLink}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {navItem.label}
      </Link>
    ) : (
      <button
        onClick={() => navItem.onClick()}
        className={styles.navLink}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {navItem.label}
      </button>
    );

  return (
    <motion.div variants={variants} className={styles.navGroup}>
      <LinkHoverBrackets hovered={hovered}>{content}</LinkHoverBrackets>
    </motion.div>
  );
}
