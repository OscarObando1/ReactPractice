import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

/** Access the current auth state and actions (signIn / signOut / toggle). */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
