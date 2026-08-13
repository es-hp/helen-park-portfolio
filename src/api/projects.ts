import { type Project } from '@/types/types';

export async function getProjects(): Promise<Project[]> {
  const response = await fetch('/content/project-data.json');

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return (await response.json()) as Project[];
}
