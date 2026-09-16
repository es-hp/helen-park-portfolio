import { Outlet } from 'react-router-dom';

import clsx from 'clsx';

import { Footer } from './Footer';
import styles from './Layout.module.css';

type AppLayoutProps = {
  hasHorizPadding?: boolean;
  hasTopPadding?: boolean;
  hasBotPadding?: boolean;
  hasFooter?: boolean;
  footerIsAlwaysVisible?: boolean;
};

export function AppLayout(props: AppLayoutProps) {
  const {
    hasHorizPadding = false,
    hasTopPadding = false,
    hasBotPadding = false,
    hasFooter = false,
  } = props;

  return (
    <div
      className={clsx(
        styles.appLayout,
        hasHorizPadding && 'px-page-gutter',
        hasTopPadding && 'pt-page-gutter',
        hasBotPadding && !hasFooter && 'pb-page-gutter',
        'border border-green-500'
      )}
    >
      <Outlet />
      {hasFooter && <Footer />}
    </div>
  );
}
