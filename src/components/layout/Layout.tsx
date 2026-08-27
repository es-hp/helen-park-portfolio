import { Outlet } from 'react-router-dom';

import clsx from 'clsx';

import { Footer } from './Footer';
import styles from './Layout.module.css';

type AppLayoutProps = {
  horizPadding?: boolean;
  topPadding?: boolean;
  botPadding?: boolean;
  footer?: boolean;
};

export function AppLayout(props: AppLayoutProps) {
  const {
    horizPadding = false,
    topPadding = false,
    botPadding = false,
    footer = true,
  } = props;
  return (
    <div
      className={clsx(
        styles.appLayout,
        horizPadding && styles['appLayout--h-padding'],
        topPadding && styles['appLayout--top-padding'],
        botPadding && styles['appLayout--bot-padding']
      )}
    >
      <Outlet />
      {footer && <Footer />}
    </div>
  );
}
