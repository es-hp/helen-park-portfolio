/* PROJECT TYPES */

export interface TechStack {
  name: string;
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
  stack: TechStack[];
  images: ProjectImage[];
}
