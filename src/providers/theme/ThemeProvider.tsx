import { useState, useEffect } from "react";
import { ThemeContext, type Theme } from "./theme.context";
import type { ProviderProps } from "../Providers";

export function ThemeProvider({ children }: ProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
