import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section className="routeMessagePage">
      <div className="routeMessageCard">
        <span className="routeStatusCode">404</span>

        <h1>Page not found</h1>

        <p>
          The page you requested does not exist or may have
          been moved.
        </p>

        <Link
          className="routePrimaryLink"
          to="/dashboard"
        >
          Return to dashboard
        </Link>
      </div>
    </section>
  );
}