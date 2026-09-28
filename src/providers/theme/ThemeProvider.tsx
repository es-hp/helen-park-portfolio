import { useEffect, useState } from 'react';

import type { ProviderProps } from '../Providers';
import { type Theme, ThemeContext } from './theme.context';

type ThemePreference = Theme | 'system';

export function ThemeProvider({ children }: ProviderProps) {
  const [preference, setPreference] = useState<ThemePreference>('system');
  const [systemTheme, setSystemTheme] = useState<Theme>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme:dark)');
    const update = () => setSystemTheme(media.matches ? 'dark' : 'light');

    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const theme = preference === 'system' ? systemTheme : preference;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setPreference(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
