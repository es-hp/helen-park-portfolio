import { useMemo, useState } from 'react';

import StackIcon from 'tech-stack-icons';

import { ProjectCard } from '@/components/projects/ProjectCard';
import { Spinner } from '@/components/ui/LoadingSpinner';
import { ToggleButton } from '@/components/ui/ToggleButton';
import { useProjects } from '@/hooks/useProjects';
import { useTechStacks } from '@/hooks/useTechStacks';

export function Projects() {
  const { data: projects, isPending, isError } = useProjects();
  const technologies = useTechStacks();

  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    if (selectedTechs.length === 0) return projects;

    return projects?.filter((project) =>
      selectedTechs.every((selectedTech) =>
        project.stack.some((tech) => tech.name === selectedTech)
      )
    );
  }, [projects, selectedTechs]);

  const toggleTech = (techName: string) => {
    setSelectedTechs((current) =>
      current.includes(techName)
        ? current.filter((name) => name !== techName)
        : [...current, techName]
    );
  };

  return (
    <main className="projects flex flex-col min-h-0 items-center justify-start overflow-clip border border-red-600">
      <header>
        <h1 className="text-4xl">Projects</h1>
      </header>
      <div className="flex flex-1 flex-col-reverse justify-center md:flex-row items-start w-full max-w-3xl min-h-0 gap-16 pt-16 md:py-32">
        <div className="projects-list flex-1 flex flex-col gap-6 self-stretch overflow-y-auto scrollbar-gutter-stable">
          {isPending ? (
            <Spinner />
          ) : isError ? (
            <div>Error loading projects.</div>
          ) : (
            filteredProjects?.map((project, index) => (
              <ProjectCard project={project} index={index} />
            ))
          )}
        </div>
        <div className="projects-filter-container flex flex-col w-full items-center gap-6 md:w-48 md:min-h-82 border border-green-300">
          <h2 className="text-xl text-center">Filter Projects</h2>
          <ToggleButton handleClick={() => setSelectedTechs([])}>
            All projects
          </ToggleButton>
          <div className="tech-filter flex flex-wrap gap-3 items-center justify-center w-full">
            {technologies.map((tech) => {
              const isSelected = selectedTechs.includes(tech.name);
              const variant = isSelected ? 'light' : 'grayscale';
              return (
                <button
                  key={tech.name}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleTech(tech.name)}
                  className="opacity-80 hover:opacity-100 transition-opactiy duration-100 ease-in-out cursor-pointer"
                >
                  <StackIcon
                    name={tech.icon}
                    variant={variant}
                    className="w-7"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
