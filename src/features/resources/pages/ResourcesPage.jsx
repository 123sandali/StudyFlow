import { useFetch } from '../../../hooks/useFetch';
import './resources.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function ResourcesPage() {
  const {
    data = [],
    loading,
    error,
    refetch,
  } = useFetch(API_URL, {
    initialData: [],
  });

  return (
    <div className="resourcesPage">
      <section className="resourcesHeader">
        <div>
          <p className="resourcesEyebrow">Resources</p>
          <h1 className="resourcesTitle">Public API resource directory</h1>
          <p className="resourcesSubtitle">
            This page now uses a reusable useFetch custom hook instead of
            writing loading, error, and fetch logic directly inside the page.
          </p>
        </div>

        <button
          className="resourcesRefreshButton"
          type="button"
          onClick={refetch}
        >
          Refresh
        </button>
      </section>

      {loading && (
        <section className="resourcesGrid">
          <div className="resourceSkeleton card" />
          <div className="resourceSkeleton card" />
          <div className="resourceSkeleton card" />
        </section>
      )}

      {!loading && error && (
        <section className="resourcesError card">
          <h2>Could not load resources</h2>
          <p>{error}</p>
          <button type="button" onClick={refetch}>
            Try again
          </button>
        </section>
      )}

      {!loading && !error && data.length === 0 && (
        <section className="resourcesEmpty card">
          <h2>No resources found</h2>
          <p>The API returned an empty list.</p>
        </section>
      )}

      {!loading && !error && data.length > 0 && (
        <section className="resourcesGrid">
          {data.map((user) => (
            <article className="resourceCard card" key={user.id}>
              <div className="resourceAvatar">
                {user.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)}
              </div>

              <div>
                <p className="resourceType">Demo API user</p>
                <h2 className="resourceName">{user.name}</h2>
                <p className="resourceMeta">@{user.username}</p>
                <p className="resourceMeta">{user.email}</p>
                <p className="resourceCompany">{user.company?.name}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}