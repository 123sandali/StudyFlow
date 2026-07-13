import {
  isRouteErrorResponse,
  Link,
  useRouteError,
} from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();

  let status = 500;
  let title = 'Something went wrong';
  let message =
    'StudyFlow could not complete this request.';

  if (isRouteErrorResponse(error)) {
    status = error.status;

    title =
      error.status === 404
        ? 'Requested record not found'
        : error.statusText || title;

    message =
      typeof error.data === 'string'
        ? error.data
        : message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="routeMessagePage">
      <div className="routeMessageCard">
        <span className="routeStatusCode">
          {status}
        </span>

        <h1>{title}</h1>

        <p>{message}</p>

        <Link
          className="routePrimaryLink"
          to="/dashboard"
        >
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}