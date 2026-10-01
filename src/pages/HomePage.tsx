import { AnimatePresence, motion } from 'framer-motion';

import { AboutPhoto } from '@/components/about/AboutPhoto';
import { Nav } from '@/components/home/navigation/Nav';
import { Spinner } from '@/components/ui/LoadingSpinner';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useSiteContent } from '@/hooks/useSiteContent';

const MARGIN_PX: number = 3 * 16;

import {
  staggerYVariants,
  wispyFadeVariants,
  wispyStaggerVariants,
} from '@/motion';

export function Home({ path }: { path: '/' | '/about' }) {
  const isAboutOpen = path === '/about';
  const currentPage = isAboutOpen ? 'onAbout' : 'onHome';

  const { data: aboutText, isPending, error } = useSiteContent('about');

  return (
    <motion.main className="flex-c-centered">
      <motion.div
        variants={staggerYVariants}
        initial={false}
        animate="visible"
        exit="hidden"
        className="flex flex-col items-center justify-start"
      >
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
              custom={{ hasNoTopMargin: false, marginPx: MARGIN_PX }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
            >
              <AboutPhoto />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{
            marginTop: `${MARGIN_PX}px`,
            marginBottom: `${MARGIN_PX}px`,
          }}
        >
          <StatusBadge currentStatus="available" />
        </motion.div>
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
                  custom={{ hasNoTopMargin: i === 0 }}
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
        variants={staggerYVariants}
        initial={false}
        animate={isAboutOpen ? 'visible' : 'hidden'}
        custom={isAboutOpen ? { staggerDelay: 0, topMarginPx: MARGIN_PX } : {}}
      />
    </motion.main>
  );
}
