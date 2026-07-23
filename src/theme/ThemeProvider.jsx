import { useMemo, useState } from "react";
import { ThemeContext } from "./context";

/**
 * Owns the night-mode flag so App/layout stay presentational.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.defaultNight=false]
 */
export function ThemeProvider({ children, defaultNight = false }) {
  const [nightMode, setNightMode] = useState(defaultNight);

  const value = useMemo(
    () => ({ nightMode, setNightMode, toggleNight: () => setNightMode((v) => !v) }),
    [nightMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
