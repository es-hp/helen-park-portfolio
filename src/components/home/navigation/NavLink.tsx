import { useState } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import { listVariants } from '@/motion';

import { LinkHoverBrackets } from './LinkHoverBrackets';
import type { NavItem } from './Nav';
// import styles from './NavLink.module.css';

export type NavLinkSize = 'lg' | 'xl' | '2xl';

type NavLinkProps = {
  navItem: NavItem;
  size?: NavLinkSize;
};

export function NavLink({ navItem, size = '2xl' }: NavLinkProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  const textSize =
    size === 'lg' ? 'text-lg' : size === 'xl' ? 'text-xl' : 'text-2xl';

  const content =
    navItem.type === 'link' ? (
      <Link
        to={navItem.to}
        className={clsx('navLink', textSize)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {navItem.label}
      </Link>
    ) : navItem.type === 'action' ? (
      <button
        onClick={() => navItem.onClick()}
        className={clsx('navLink', textSize)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {navItem.label}
      </button>
    ) : null;

  return (
    <motion.div
      variants={listVariants}
      className="flex justify-center items-center gap-2"
    >
      <LinkHoverBrackets hovered={hovered} textSize={textSize}>
        {content}
      </LinkHoverBrackets>
    </motion.div>
  );
}
