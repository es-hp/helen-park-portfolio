import styles from "./Nav.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";
import type { NavItem } from "./Nav";

type NavLinkProps = {
  navItem: NavItem;
};

export function NavLink({ navItem }: NavLinkProps) {
  const navLinkClass = styles.navLink;

  const navContent = (
    <div className={styles.navGroup}>
      <span className={clsx(styles.bracket, styles.left)}>{"<"}</span>
      {navItem.label}
      <span className={clsx(styles.bracket, styles.right)}>{">"}</span>
    </div>
  );

  if (navItem.type === "route") {
    return (
      <Link to={navItem.to} className={navLinkClass}>
        {navContent}
      </Link>
    );
  }

  return (
    <button onClick={() => navItem.onClick()} className={navLinkClass}>
      {navContent}
    </button>
  );
}
