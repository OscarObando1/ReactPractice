import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header, Footer } from "@components";
import notify from "@components/Toaster/notify";
import { useAuth } from "@/auth/context";
import { useTheme } from "@/theme/context";
import "@/App.css";

/**
 * Shared chrome for every route: header, main outlet and footer. Reads auth and
 * theme from context and translates navigation intents into router actions, so
 * Header/Footer stay presentational.
 */
function RootLayout() {
  const { authenticated, user, signIn, signOut } = useAuth();
  const { nightMode, setNightMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const activeId = location.pathname.startsWith("/account") ? "account" : "blog";

  const handleNavigate = (id) => {
    if (id === "account") navigate("/account");
    else if (id === "home") navigate("/");
    notify.info(`Navigated to "${id}"`);
  };

  return (
    <div className="app-shell" data-night={nightMode ? "true" : "false"}>
      <Header
        authenticated={authenticated}
        user={user}
        activeId={activeId}
        onNavigate={handleNavigate}
        onSignIn={() => {
          signIn();
          notify.info("Sign in clicked");
        }}
        onJoinUs={() => notify.info("Join us clicked")}
        onSignOut={() => {
          signOut();
          notify.success("Signed out");
        }}
        nightMode={nightMode}
        onToggleNight={setNightMode}
      />

      <main className="app-main container">
        <Outlet />
      </main>

      <Footer
        onSubscribe={(email) => notify.success(`Subscribed: ${email}`)}
        onLanguageChange={(lang) => notify.info(`Language: ${lang}`)}
      />
    </div>
  );
}

export default RootLayout;
