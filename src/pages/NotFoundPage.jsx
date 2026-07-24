import { Link } from "react-router-dom";
import { Button } from "@components";
import { PATHS } from "@/routes/paths";

/** Wildcard (*) route: shown when no other route matches the URL. */
function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">Page not found</h1>
      <p className="not-found__text">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link to={PATHS.home}>
        <Button variant="prime">Back to home</Button>
      </Link>
    </section>
  );
}

export default NotFoundPage;
