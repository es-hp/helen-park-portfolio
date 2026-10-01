import { AnimatePresence, motion } from 'framer-motion';

import { AboutPhoto } from '@/components/about/AboutPhoto';
import { Nav } from '@/components/home/navigation/Nav';
import { Spinner } from '@/components/ui/LoadingSpinner';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useSiteContent } from '@/hooks/useSiteContent';
import { wispyFadeVariants, wispyStaggerVariants } from '@/motion';
import { getCSSVariableValue } from '@/utils';

const MARGIN_PX: number = (() => {
  const { value, unit } = getCSSVariableValue('--spacing-section');
  if (typeof value !== 'number' || (unit !== 'rem' && unit !== 'px')) {
    console.warn('--spacing-section must be a numeric rem or px value.');
    return 0;
  }

  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  return unit === 'rem' ? value * rootFontSize : value;
})();

console.log(MARGIN_PX);

export function Home({ path }: { path: '/' | '/about' }) {
  const isAboutOpen = path === '/about';
  const currentPage = isAboutOpen ? 'onAbout' : 'onHome';

  const { data: aboutText, isPending, error } = useSiteContent('about');

  return (
    <motion.main className="flex-c-centered">
      <motion.div className="flex flex-col items-center justify-start">
        <motion.header
          id="landing-header"
          className="flex flex-col items-center justify-start"
        >
          <motion.h1
            initial={false}
            animate={{
              fontSize: isAboutOpen ? '4rem' : '6rem',
            }}
            transition={{ duration: 1 }}
            className="leading-tight text-center"
          >
            Name Here
          </motion.h1>
          <motion.p className="h1-sub">Software Engineer</motion.p>
        </motion.header>
        <AnimatePresence>
          {isAboutOpen && (
            <motion.div
              id="about-photo"
              variants={wispyFadeVariants}
              custom={{ topMarginPx: MARGIN_PX }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              <AboutPhoto />
            </motion.div>
          )}
        </AnimatePresence>

        <StatusBadge currentStatus="available" className="my-section-gap" />
      </motion.div>

      <AnimatePresence>
        {isAboutOpen && (
          <motion.div
            variants={wispyStaggerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden text-pretty max-w-3xl h-auto"
          >
            {isPending ? (
              <Spinner />
            ) : error ? (
              ''
            ) : (
              aboutText?.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={wispyFadeVariants}
                  custom={i === 0 && { topMarginPx: 0 }}
                  className="overflow-hidden"
                >
                  {paragraph}
                </motion.p>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Nav
        currentPage={currentPage}
        className={
          isAboutOpen
            ? 'mt-section-gap transition-[margin-top] duration-500 ease-out'
            : 'transition-[margin-top] duration-100 ease-in'
        }
      />
    </motion.main>
  );
}
