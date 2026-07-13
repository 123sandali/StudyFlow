import { Link } from 'react-router';

function formatDueDate(dueDate) {
  if (!dueDate) {
    return 'No due date';
  }

  const date = new Date(
    `${dueDate}T00:00:00`,
  );

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(date);
}

function getPriorityClass(priority) {
  switch (priority) {
    case 'high':
      return 'taskPriorityHigh';

    case 'low':
      return 'taskPriorityLow';

    default:
      return 'taskPriorityMedium';
  }
}

export default function TaskCard({
  task,
  onToggle,
  onDelete,
}) {
  return (
    <article
      className={`taskManagementCard ${
        task.completed
          ? 'taskManagementCardCompleted'
          : ''
      }`}
    >
      <div className="taskManagementMain">
        <input
          className="taskCheckbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={
            task.completed
              ? `Mark ${task.title} as active`
              : `Mark ${task.title} as completed`
          }
        />

        <div className="taskManagementContent">
          <h3
            className={`taskManagementTitle ${
              task.completed
                ? 'taskManagementTitleCompleted'
                : ''
            }`}
          >
            <Link
              className="taskTitleLink"
              to={`/tasks/${task.id}`}
            >
              {task.title}
            </Link>
          </h3>

          <div className="taskManagementMeta">
            <span
              className={`taskPriorityBadge ${getPriorityClass(
                task.priority,
              )}`}
            >
              {task.priority}
            </span>

            <span>
              {formatDueDate(task.dueDate)}
            </span>

            <span>
              {task.completed
                ? 'Completed'
                : 'Active'}
            </span>
          </div>
        </div>
      </div>

      <div className="taskCardActions">
        <Link
          className="taskViewLink"
          to={`/tasks/${task.id}`}
        >
          View
        </Link>

        <button
          className="taskDeleteButton"
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}