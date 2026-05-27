import { motion, type Variants } from "framer-motion";
import { NavLink } from "./NavLink";
import {
  navContainerVariants,
  linksVariants,
  resumeLinkVariants,
  backLinkVariants,
} from "@/components/layout/PrimaryNav/motionNav";
import styles from "./Nav.module.css";

type NavRoute = {
  type: "route";
  label: string;
  to: string;
  variants?: Variants;
};

type NavAction = {
  type: "action";
  label: string;
  onClick: () => void;
  variants?: Variants;
};

export type NavItem = NavRoute | NavAction;

type NavProps = {
  isAboutOpen: boolean;
  showAbout: () => void;
  hideAbout: () => void;
};

export function Nav({ isAboutOpen, showAbout, hideAbout }: NavProps) {
  const links: Record<string, NavItem> = {
    about: {
      type: "action",
      label: "about",
      onClick: showAbout,
      variants: linksVariants,
    },
    skills: {
      type: "route",
      label: "skills",
      to: "/skills",
      variants: linksVariants,
    },
    projects: {
      type: "route",
      label: "projects",
      to: "/projects",
      variants: linksVariants,
    },
    contact: {
      type: "route",
      label: "contact",
      to: "/contact",
      variants: linksVariants,
    },
    resume: {
      type: "route",
      label: "resume",
      to: "/resume",
      variants: resumeLinkVariants,
    },
    back: {
      type: "action",
      label: "back",
      onClick: hideAbout,
      variants: backLinkVariants,
    },
  };

  return (
    <nav className={styles.mainNav}>
      <motion.ul
        variants={navContainerVariants}
        initial="onHome"
        animate={isAboutOpen ? "onAbout" : "onHome"}
        className="flex flex-col justify-start border border-b-blue-800"
      >
        {Object.entries(links).map(([key, item]) => {
          return (
            <motion.li key={key} variants={item.variants}>
              <NavLink navItem={item} />
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
