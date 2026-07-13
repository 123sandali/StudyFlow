import {
  Link,
  useLoaderData,
} from 'react-router';

function formatDate(dateValue) {
  if (!dateValue) {
    return 'No due date';
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
  }).format(
    new Date(`${dateValue}T00:00:00`),
  );
}

export default function TaskDetailPage() {
  const task = useLoaderData();

  return (
    <section className="taskRoutePage">
      <div className="taskRouteHeader">
        <div>
          <span className="taskRouteEyebrow">
            Task details
          </span>

          <h1>{task.title}</h1>
        </div>

        <Link
          className="taskRouteBackLink"
          to="/tasks"
        >
          Back to tasks
        </Link>
      </div>

      <article className="taskDetailCard">
        <div className="taskDetailRow">
          <span>Priority</span>
          <strong>{task.priority}</strong>
        </div>

        <div className="taskDetailRow">
          <span>Status</span>
          <strong>
            {task.completed
              ? 'Completed'
              : task.status || 'To do'}
          </strong>
        </div>

        <div className="taskDetailRow">
          <span>Due date</span>
          <strong>
            {formatDate(task.dueDate)}
          </strong>
        </div>

        <div className="taskDetailRow">
          <span>Created</span>
          <strong>
            {new Date(
              task.createdAt,
            ).toLocaleString()}
          </strong>
        </div>
      </article>
    </section>
  );
}