// import styles from "./Nav.module.css";
import { NavLink } from "./NavLink";
import { useNavigate } from "react-router-dom";

type NavRoute = {
  type: "route";
  label: string;
  to: string;
};

type NavAction = {
  type: "action";
  label: string;
  onClick: () => void;
};

export type NavItem = NavRoute | NavAction;

type NavProps = {
  isAboutOpen: boolean;
};

export function Nav({ isAboutOpen }: NavProps) {
  const navigate = useNavigate();

  const homeLinks: Record<string, NavItem> = {
    about: { type: "route", label: "about", to: "/about-me" },
    skills: { type: "route", label: "skills", to: "/skills" },
    projects: { type: "route", label: "projects", to: "/projects" },
    contact: { type: "route", label: "contact", to: "/contact" },
    resume: { type: "route", label: "resume", to: "/resume" },
  };

  const aboutNavLinks: Record<string, NavItem> = {
    resume: { type: "route", label: "resume", to: "/resume" },
    back: {
      type: "action",
      label: "back",
      onClick: () => void navigate(-1),
    },
  };

  const links = isAboutOpen ? aboutNavLinks : homeLinks;

  return (
    <nav>
      <ul className="flex flex-col content-center gap-2">
        {Object.entries(links).map(([key, item]) => (
          <li
            key={key}
            className="text-center self-center bg-amber-500 border border-black"
          >
            <NavLink navItem={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
