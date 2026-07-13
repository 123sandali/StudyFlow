export default function TaskCard({ task, onToggle, onDelete }) {
  const statusText = task.completed ? 'Done' : 'In progress';

  return (
    <article className={`taskManagerCard card ${task.completed ? 'isDone' : ''}`}>
      <div className="taskManagerMain">
        <button
          className={`taskCheckButton ${task.completed ? 'checked' : ''}`}
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={`Mark ${task.title} as ${
            task.completed ? 'not completed' : 'completed'
          }`}
        >
          {task.completed ? '✓' : ''}
        </button>

        <div>
          <h3 className="taskManagerTitle">{task.title}</h3>

          <div className="taskManagerMeta">
            <span className={`taskManagerPriority priority-${task.priority}`}>
              {task.priority}
            </span>

            <span>{task.dueDate || 'No due date'}</span>
            <span>{statusText}</span>
          </div>
        </div>
      </div>

      <button
        className="taskDeleteButton"
        type="button"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </article>
  );
}