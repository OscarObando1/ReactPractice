import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header, Footer } from "@components";
import notify from "@components/Toaster/notify";
import RouteBreadcrumbs from "@/routes/RouteBreadcrumbs";
import { useAuth } from "@/auth/context";
import { useTheme } from "@/theme/context";
import { PATHS } from "@/routes/paths";
import "@/App.css";

const NAV_ITEMS = [
  { id: PATHS.home, label: "Home" },
  { id: PATHS.training, label: "Training" },
  { id: PATHS.joinUs, label: "Join Us" },
];

/** Resolve which nav item matches the current URL for active highlighting. */
function getActiveId(pathname) {
  if (pathname.startsWith(PATHS.myAccount)) return PATHS.myAccount;
  const match = NAV_ITEMS.find((item) =>
    item.id === PATHS.home
      ? pathname === PATHS.home
      : pathname.startsWith(item.id)
  );
  return match?.id;
}

/**
 * Shared chrome for every route: header, breadcrumbs, main outlet and footer.
 * Reads auth and theme from context and translates navigation intents into
 * router actions, so Header/Footer stay presentational.
 */
function RootLayout() {
  const { authenticated, user, signOut } = useAuth();
  const { nightMode, setNightMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-shell" data-night={nightMode ? "true" : "false"}>
      <Header
        authenticated={authenticated}
        user={user}
        items={NAV_ITEMS}
        activeId={getActiveId(location.pathname)}
        onNavigate={(path) => navigate(path)}
        onSignIn={() => navigate(PATHS.login)}
        onJoinUs={() => navigate(PATHS.joinUs)}
        onSignOut={() => {
          signOut();
          notify.success("Signed out");
          navigate(PATHS.home);
        }}
        nightMode={nightMode}
        onToggleNight={setNightMode}
      />

      <main className="app-main container">
        <RouteBreadcrumbs />
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
