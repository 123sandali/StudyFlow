import '../dashboard.css'

function TaskCard({title, course, dueDate, priority}) {
  return (
    <article className="taskCard">
      <div className="taskCardInfo">
        <h3 className="taskCardTitle">{title}</h3>
        <p className="taskCardMeta">
          Course: {course} • Due: {dueDate}
        </p>
      </div>

      <span className={`taskPriority priority${priority}`}>{priority}</span>
    </article>
  )
}

export default TaskCard