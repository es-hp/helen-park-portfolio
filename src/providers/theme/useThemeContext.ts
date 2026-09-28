import { useCustomContext } from '@/hooks/useCustomContext';

import { ThemeContext } from './theme.context';

export const useThemeContext = () =>
  useCustomContext(ThemeContext, 'useThemeContext');
