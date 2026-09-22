import { Outlet } from 'react-router-dom';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

import { Footer } from './Footer';

type AppLayoutProps = {
  hasHorizPadding?: boolean;
  hasTopPadding?: boolean;
  hasBotPadding?: boolean;
  hasFooter?: boolean;
  hasFixedHeight?: boolean;
};

export function AppLayout(props: AppLayoutProps) {
  const {
    hasHorizPadding = false,
    hasTopPadding = false,
    hasBotPadding = false,
    hasFooter = false,
    hasFixedHeight = false,
  } = props;

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
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
      {hasFooter && <Footer />}
    </div>
  );
}
