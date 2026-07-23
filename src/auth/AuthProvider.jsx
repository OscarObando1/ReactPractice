import { useMemo, useState } from "react";
import { AuthContext } from "./context";
import { USER } from "@/data/demo";

/**
 * Owns authentication state and the current user, so screens can read/act on
 * auth without prop-drilling from App.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.defaultAuthenticated=true]
 */
export function AuthProvider({ children, defaultAuthenticated = true }) {
  const [authenticated, setAuthenticated] = useState(defaultAuthenticated);

  const value = useMemo(
    () => ({
      authenticated,
      user: authenticated ? USER : undefined,
      signIn: () => setAuthenticated(true),
      signOut: () => setAuthenticated(false),
      toggleAuth: () => setAuthenticated((v) => !v),
    }),
    [authenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
