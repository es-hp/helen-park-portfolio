import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "./NavLink";
import { vertRevealContainerVar, revealTransition } from "@/motion/reveal";

type NavRoute = {
  type: "route";
  label: string;
  to: string;
  show: boolean;
};

type NavAction = {
  type: "action";
  label: string;
  onClick: () => void;
  show: boolean;
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
      show: !isAboutOpen,
    },
    skills: {
      type: "route",
      label: "skills",
      to: "/skills",
      show: !isAboutOpen,
    },
    projects: {
      type: "route",
      label: "projects",
      to: "/projects",
      show: !isAboutOpen,
    },
    contact: {
      type: "route",
      label: "contact",
      to: "/contact",
      show: !isAboutOpen,
    },
    resume: { type: "route", label: "resume", to: "/resume", show: true },
    back: {
      type: "action",
      label: "back",
      onClick: hideAbout,
      show: isAboutOpen,
    },
  };

  const visibleKeys = Object.entries(links)
    .filter(([, item]) => item.show)
    .map(([key]) => key);

  return (
    <nav>
      <ul className="flex flex-col justify-start border border-b-blue-800">
        <AnimatePresence>
          {Object.entries(links).map(([key, item]) => {
            const visibleIndex = visibleKeys.indexOf(key);
            const needsBotMargin =
              item.show && visibleIndex !== visibleKeys.length - 1;
            return (
              <motion.li
                key={key}
                variants={vertRevealContainerVar}
                custom={needsBotMargin}
                initial="hide"
                animate={item.show ? "show" : "hide"}
                exit="hide"
                transition={revealTransition}
                className="text-center self-center"
              >
                <NavLink navItem={item} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </nav>
  );
}
