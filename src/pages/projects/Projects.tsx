import { useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import StackIcon from 'tech-stack-icons';

import { ProjectCard } from '@/components/projects/ProjectCard';
import { Spinner } from '@/components/ui/LoadingSpinner';
import { ToggleButton } from '@/components/ui/ToggleButton';
import { useProjects } from '@/hooks/useProjects';
import { useTechStacks } from '@/hooks/useTechStacks';
import {
  containerVariants,
  fadeInXVariants,
  listVariants,
  makeFadeTransition,
  MotionLink,
  staticVariants,
} from '@/motion';

const slowFadeTransition = makeFadeTransition();

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
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="projects flex flex-col min-h-0 items-center justify-start"
    >
      <motion.header
        variants={staticVariants}
        className="flex items-center justify-between w-full gap-6"
      >
        <MotionLink
          layoutId="projects-left-link"
          transition={slowFadeTransition}
          to="/"
          className="hover:shadow-[inset_0_-1px_0_currentColor]"
        >
          Home
        </MotionLink>
        <motion.h1
          layoutId="projects-h1"
          transition={slowFadeTransition}
          className="text-4xl"
        >
          Projects
        </motion.h1>
        <MotionLink
          layoutId="projects-right-link"
          transition={slowFadeTransition}
          to="/Resume"
          className="hover:shadow-[inset_0_-1px_0_currentColor]"
        >
          Resume
        </MotionLink>
      </motion.header>
      <motion.div
        variants={fadeInXVariants}
        className="flex flex-1 flex-col-reverse justify-center md:flex-row items-start w-full max-w-3xl min-h-0 gap-16 pt-16 md:py-32"
      >
        <motion.div
          variants={listVariants}
          className="projects-list flex-1 flex flex-col gap-6 self-stretch overflow-y-auto scrollbar-gutter-stable"
        >
          {isPending ? (
            <Spinner />
          ) : isError ? (
            <motion.div>Error loading projects.</motion.div>
          ) : (
            filteredProjects?.map((project, index) => (
              <ProjectCard project={project} index={index} />
            ))
          )}
        </motion.div>
        <motion.div className="projects-filter-container flex flex-col w-full items-center gap-12 md:w-48 md:min-h-82">
          <h2 className="text-2xl text-center border-b pb-5">
            Filter Projects
          </h2>
          <ToggleButton handleClick={() => setSelectedTechs([])}>
            All projects
          </ToggleButton>
          <motion.div
            role="group"
            aria-label="Filter by technology"
            className="tech-filter flex flex-wrap gap-3 items-center justify-center w-full"
          >
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
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
