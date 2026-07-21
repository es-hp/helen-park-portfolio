/* PROJECT TYPES */

interface Skill {
  skill: string;
  icon: string;
}

interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  info: string;
  link: string;
  repo: string;
  stack: Skill[];
  images: ProjectImage[];
}
