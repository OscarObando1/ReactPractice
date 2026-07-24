import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import RegistrationVerificationPage from "@/pages/RegistrationVerificationPage";
import JoinUsPage from "@/pages/JoinUsPage";
import TrainingPage from "@/pages/TrainingPage";
import MyAccountPage from "@/pages/MyAccountPage";
import ChangePasswordPage from "@/pages/ChangePasswordPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import { PATHS } from "./paths";

/**
 * Central route configuration: the single map of paths to components.
 *
 * - RootLayout is the shared chrome; its `handle.crumb` anchors every trail at
 *   "Home", and each child adds its own crumb → nested breadcrumbs for free.
 * - Private pages sit under <ProtectedRoute>, a pathless guard route.
 * - The wildcard "*" renders the 404 page; the index route is the default view.
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    handle: { crumb: "Home" },
    children: [
      { index: true, element: <HomePage /> },
      {
        path: PATHS.login.slice(1),
        element: <LoginPage />,
        handle: { crumb: "Login" },
      },
      {
        path: PATHS.registration.slice(1),
        element: <RegistrationPage />,
        handle: { crumb: "Registration" },
      },
      {
        path: PATHS.registrationVerification.slice(1),
        element: <RegistrationVerificationPage />,
        handle: { crumb: "Verification" },
      },
      {
        path: PATHS.joinUs.slice(1),
        element: <JoinUsPage />,
        handle: { crumb: "Join Us" },
      },
      {
        path: PATHS.training.slice(1),
        element: <TrainingPage />,
        handle: { crumb: "Training" },
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: PATHS.myAccount.slice(1),
            element: <MyAccountPage />,
            handle: { crumb: "My Account" },
          },
          {
            path: PATHS.changePassword.slice(1),
            element: <ChangePasswordPage />,
            handle: { crumb: "Change Password" },
          },
        ],
      },
      { path: "*", element: <NotFoundPage />, handle: { crumb: "Not Found" } },
    ],
  },
]);
