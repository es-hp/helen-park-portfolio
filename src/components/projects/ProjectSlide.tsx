import { memo } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import { StackIcons } from '@/components/ui/StackIcons';
import { TitleDivider } from '@/components/ui/TitleDivider';
import { containerVariants, fadeInYVariants, listVariants } from '@/motion';
import type { Project } from '@/types';

import { ImageCarousel } from './ImageCarousel';

type ProjectSlideProps = {
  project: Project;
  index: number;
  isSelected: boolean;
  height?: number;
};

export const ProjectSlide = memo(function ProjectSlide({
  project,
  index,
  isSelected,
  height,
}: ProjectSlideProps) {
  const header = (display: 'flex md:hidden' | 'hidden md:flex') => (
    <motion.header
      variants={fadeInYVariants}
      className={`${display} gap-4 items-center`}
    >
      <img src={project.icon} className="size-14 rounded-sm" />
      <h2 className="h2-project">{project.title}</h2>
    </motion.header>
  );

  return (
    // More styles for this slides at Carousel.module.css
    <motion.article
      id={`project-slide-${index}`}
      aria-hidden={!isSelected}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={clsx('proj-slide flex flex-col', !isSelected && 'invisible')}
      style={{ minHeight: height }}
    >
      <div className="proj-loaded-content flex-1 flex flex-col w-full md:flex-row gap-page-gutter overflow-x-clip min-h-0">
        {/* Left/Top Panel */}
        <motion.div
          variants={listVariants}
          className="proj-img-panel md:sticky flex-1 top-header-height flex flex-col gap-12 min-w-0 h-full"
        >
          {header('flex md:hidden')}
          <motion.div
            variants={fadeInYVariants}
            className="sticky-wrapper flex flex-col"
          >
            <ImageCarousel projectImages={project.images} />
          </motion.div>
          <motion.div
            variants={fadeInYVariants}
            className="project-stack min-w-0 flex flex-col gap-4 items-center"
          >
            <TitleDivider botMargin={0}>Stack</TitleDivider>
            <StackIcons techStackItems={project.stack} />
          </motion.div>
        </motion.div>

        {/* Right/Bottom Panel */}
        <motion.div
          variants={listVariants}
          className="proj-info-panel flex-1 flex flex-col gap-6 min-w-0"
        >
          {header('hidden md:flex')}
          <motion.div
            variants={fadeInYVariants}
            className="project-text-links flex items-center justify-evenly gap-4"
          >
            <a href="" target="_blank" rel="noopener" className="">
              Live Link
            </a>
            <a href="" target="_blank" rel="noopener">
              Github Repo
            </a>
          </motion.div>
          <motion.div
            variants={listVariants}
            className="project-text-body w-full space-y-6"
          >
            {project.description.map((p, i) => (
              <motion.p variants={fadeInYVariants} key={i}>
                {p}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
});
