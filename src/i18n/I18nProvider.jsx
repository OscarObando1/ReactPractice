import { useCallback, useMemo, useState } from "react";
import { I18nContext } from "./context";
import { DEFAULT_LANGUAGE, LANGUAGES, translations } from "./translations";

/** Resolve a dotted key path (e.g. "footer.subscribe") against a dictionary. */
function resolve(dict, key) {
  return key.split(".").reduce((acc, part) => acc?.[part], dict);
}

/**
 * Provides the current language and a `t` translator to the tree.
 * Lookup falls back to the default language, then to the raw key.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.defaultLanguage]
 */
export function I18nProvider({ children, defaultLanguage = DEFAULT_LANGUAGE }) {
  const [language, setLanguage] = useState(defaultLanguage);

  const t = useCallback(
    (key) =>
      resolve(translations[language], key) ??
      resolve(translations[DEFAULT_LANGUAGE], key) ??
      key,
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t, languages: LANGUAGES }),
    [language, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
