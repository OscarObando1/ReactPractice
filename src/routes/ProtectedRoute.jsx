import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/context";
import { PATHS } from "./paths";

/**
 * Route guard: renders its nested routes only for authenticated users.
 * Unauthenticated visitors are redirected to /login, remembering where they
 * came from (location.state.from) so login can send them back afterwards.
 *
 * Used as a pathless layout route wrapping the private routes, which keeps the
 * guard logic in one place instead of repeating a check inside every page.
 */
function ProtectedRoute() {
  const { authenticated } = useAuth();
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to={PATHS.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
