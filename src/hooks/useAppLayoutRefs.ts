import { createContext } from 'react';

import { useCustomContext } from '@/hooks/useCustomContext';

type ElementRef = {
  readonly current: HTMLElement | null;
};

export type AppLayoutRefs = {
  headerRef: ElementRef;
  footerRef: ElementRef;
};

export const AppLayoutRefsContext = createContext<AppLayoutRefs | undefined>(
  undefined
);

export function useAppLayoutRefs(): AppLayoutRefs {
  return useCustomContext(AppLayoutRefsContext, 'useAppLayoutRefs');
}
