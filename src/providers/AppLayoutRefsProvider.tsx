import { type ReactNode, useRef } from 'react';

import {
  type AppLayoutRefs,
  AppLayoutRefsContext,
} from '@/hooks/useAppLayoutRefs';

export function AppLayoutRefsProvider({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const value: AppLayoutRefs = { headerRef, footerRef };

  return (
    <AppLayoutRefsContext.Provider value={value}>
      {children}
    </AppLayoutRefsContext.Provider>
  );
}
