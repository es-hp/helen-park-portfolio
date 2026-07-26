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
  icon: string;
  title: string;
  description: string[];
  link: string;
  repo: string;
  stack: Skill[];
  images: ProjectImage[];
}
