import { useMatches, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@components";

/**
 * Router-aware breadcrumb trail. Derives the trail from the matched route
 * hierarchy: every route that declares a `handle.crumb` contributes one item,
 * so nested routes automatically produce nested breadcrumbs (e.g.
 * Home / Training) with no per-page wiring.
 *
 * Presentation stays in the shared <Breadcrumbs>; this container only maps
 * router matches to its item shape and turns clicks into navigation.
 */
function RouteBreadcrumbs() {
  const matches = useMatches();
  const navigate = useNavigate();

  const items = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => ({ id: match.pathname, label: match.handle.crumb }));

  // Hide the trail on top-level pages (only "Home" would show).
  if (items.length <= 1) return null;

  return <Breadcrumbs items={items} onNavigate={(path) => navigate(path)} />;
}

export default RouteBreadcrumbs;
