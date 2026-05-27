import styles from "./Nav.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";
import type { NavItem } from "./Nav";

type NavLinkProps = {
  navItem: NavItem;
  className?: string;
};

export function NavLink({ navItem, className }: NavLinkProps) {
  const navLinkClass = clsx(styles.navLink, className);

  const navContent = (
    <div className={styles.navGroup}>
      <span className={clsx(styles.bracket, styles.left)}>{"<"}</span>
      <div className="flex justify-center items-center">{navItem.label}</div>
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
