import { Outlet } from 'react-router-dom';

import clsx from 'clsx';

import { Footer, FOOTER_HEIGHT_REM } from './Footer';
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
    hasFooter = true,
  } = props;

  return (
    <>
      <div
        className={clsx(
          styles.appLayout,
          hasHorizPadding && styles['appLayout--h-padding'],
          hasTopPadding && styles['appLayout--top-padding'],
          hasBotPadding && !hasFooter && styles['appLayout--bot-padding']
        )}
      >
        <Outlet />
      </div>
      {hasFooter && (
        <div className="bottom-0 inset-x-0 flex-c-centered w-full z-50 ">
          <Footer heightRem={FOOTER_HEIGHT_REM} />
        </div>
      )}
    </>
  );
}
