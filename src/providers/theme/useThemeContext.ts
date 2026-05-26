import { ThemeContext } from "./theme.context";
import { useCustomContext } from "@/hooks/useCustomContext";

export const useThemeContext = () =>
  useCustomContext(ThemeContext, "useThemeContext");
