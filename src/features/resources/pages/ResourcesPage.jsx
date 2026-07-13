import { useEffect, useState } from 'react';
import './resources.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function ResourcesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadResources() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch resources.');
        }

        const users = await response.json();

        if (!ignore) {
          setData(users);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Something went wrong.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadResources();

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  function handleRetry() {
    setReloadKey((currentKey) => currentKey + 1);
  }

  return (
    <div className="resourcesPage">
      <section className="resourcesHeader">
        <div>
          <p className="resourcesEyebrow">Resources</p>
          <h1 className="resourcesTitle">Public API resource directory</h1>
          <p className="resourcesSubtitle">
            This page fetches demo users from a public API and renders loading,
            error, and success states using useEffect.
          </p>
        </div>

        <button className="resourcesRefreshButton" type="button" onClick={handleRetry}>
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
          <button type="button" onClick={handleRetry}>
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