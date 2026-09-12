import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppLayoutRefsProvider } from './AppLayoutRefsProvider';
import { ThemeProvider } from './theme/ThemeProvider';

export type ProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AppLayoutRefsProvider>{children}</AppLayoutRefsProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
