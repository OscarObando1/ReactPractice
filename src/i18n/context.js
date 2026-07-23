import { createContext, useContext } from "react";

export const I18nContext = createContext(null);

/**
 * Access the current language, `setLanguage`, the `t` translator and the list
 * of available languages. Must be used within an `<I18nProvider>`.
 */
export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within an <I18nProvider>");
  }
  return ctx;
}
