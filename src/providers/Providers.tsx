import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from './theme/ThemeProvider';

export type ProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>{children}</ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
