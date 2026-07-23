import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { I18nProvider } from "@i18n/I18nProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { AuthProvider } from "@/auth/AuthProvider";

/**
 * Single composition point for cross-cutting providers (i18n, theme, auth) plus
 * the global toast outlet. Keeps App focused on routing/coordination.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function AppProviders({ children }) {
  return (
    <I18nProvider>
      <ThemeProvider>
        <AuthProvider>
          {children}
          <ToastContainer position="top-right" autoClose={2500} newestOnTop />
        </AuthProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}
