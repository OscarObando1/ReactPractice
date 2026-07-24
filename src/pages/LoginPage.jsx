import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "@components";
import notify from "@components/Toaster/notify";
import { useAuth } from "@/auth/context";
import { PATHS } from "@/routes/paths";

/**
 * Login route. On success it authenticates and returns the user to the page
 * they were trying to reach (set by <ProtectedRoute>), defaulting to home.
 */
function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? PATHS.home;

  const handleSubmit = async () => {
    await new Promise((res) => setTimeout(res, 800));
    signIn();
    notify.success("Logged in!");
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-page">
      <LoginForm
        onSubmit={handleSubmit}
        onSignUp={() => navigate(PATHS.registration)}
      />
    </div>
  );
}

export default LoginPage;
