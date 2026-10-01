import { Outlet, useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

import { Footer } from './Footer';

type AppLayoutProps = {
  hasHorizPadding?: boolean;
  hasTopPadding?: boolean;
  hasBotPadding?: boolean;
  hasFooter?: boolean;
  hasFixedHeight?: boolean;
  animatePresence?: boolean;
};

export function AppLayout(props: AppLayoutProps) {
  const {
    hasHorizPadding = false,
    hasTopPadding = false,
    hasBotPadding = false,
    hasFooter = false,
    hasFixedHeight = false,
    animatePresence = false,
  } = props;

  const location = useLocation();

  const outletKey =
    location.pathname === '/' || location.pathname === '/about'
      ? 'landing'
      : location.pathname;

  return (
    <div
      className={clsx(
        'app-layout flex flex-col items-center justify-between min-h-viewport overflow-x-clip',
        hasHorizPadding && 'px-page-gutter',
        hasTopPadding && 'pt-page-gutter',
        hasBotPadding && !hasFooter && 'pb-page-gutter',
        hasFixedHeight && 'h-viewport overflow-y-clip'
      )}
    >
      {animatePresence ? (
        <AnimatePresence mode="sync">
          <Outlet key={outletKey} />
        </AnimatePresence>
      ) : (
        <Outlet key={outletKey} />
      )}
      <AnimatePresence>{hasFooter && <Footer key="footer" />}</AnimatePresence>
    </div>
  );
}
