function TaskCard({title, course, dueDate, priority}) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Course: {course}</p>
      <p>Due Date: {dueDate}</p>
      <p>Priority: {priority}</p>
    </div>
  )
}

export default TaskCard