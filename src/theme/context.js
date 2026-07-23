import { createContext, useContext } from "react";

export const ThemeContext = createContext(null);

/** Access the current night-mode flag and its setter. */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}
