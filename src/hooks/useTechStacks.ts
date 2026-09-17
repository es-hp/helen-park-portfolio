import { useMemo } from 'react';

import { useProjects } from '@/hooks/useProjects';
import type { TechStack } from '@/types';

export function useTechStacks(): TechStack[] {
  const { data: projects = [] } = useProjects();

  return useMemo(() => {
    const techByName = new Map<
      string,
      {
        tech: TechStack;
        projectCount: number;
      }
    >();

    const usedTechNames = new Set<string>();

    for (const project of projects) {
      for (const tech of project.stack) {
        const key = tech.name.toLocaleLowerCase();

        if (!usedTechNames.has(key)) {
          usedTechNames.add(key);
          techByName.set(key, {
            tech,
            projectCount: 1,
          });
        } else {
          const existing = techByName.get(key);
          if (existing) existing.projectCount += 1;
        }
      }
    }

    return Array.from(techByName.values())
      .sort(
        (a, b) =>
          b.projectCount - a.projectCount ||
          a.tech.name.localeCompare(b.tech.name)
      )
      .map(({ tech }) => tech);
  }, [projects]);
}
