import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import ShowcasePage from "@/pages/ShowcasePage";
import AccountPage from "@/pages/AccountPage";

/**
 * App is the coordinator: it wires the router and layout only. Cross-cutting
 * providers live in <AppProviders> (see main.jsx); page content lives in
 * ./pages. This keeps App thin and easy to reason about.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<ShowcasePage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
