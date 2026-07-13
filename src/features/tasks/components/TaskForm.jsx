import { useState } from 'react';

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title is required.');
      return;
    }

    onSubmit({
      title: trimmedTitle,
      priority,
      dueDate,
      completed: false,
    });

    setTitle('');
    setPriority('medium');
    setDueDate('');
    setError('');
    
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <div className="taskFormHeader">
        <div>
          <span className="taskFormBadge">New Task</span>
          <h2>Add a study task</h2>
        </div>
      </div>

      <div className="taskFormGrid">
        <div className="taskField taskFieldLarge">
          <label htmlFor="taskTitle">Task title</label>
          <input
            id="taskTitle"
            type="text"
            value={title}
            placeholder="Example: Complete React useState exercise"
            onChange={(event) => setTitle(event.target.value)}
          />
          {error && <p className="taskError">{error}</p>}
        </div>

        <div className="taskField">
          <label htmlFor="taskPriority">Priority</label>
          <select
            id="taskPriority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="taskField">
          <label htmlFor="taskDueDate">Due date</label>
          <input
            id="taskDueDate"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="taskSubmitButton">
        Add task
      </button>
    </form>
  );
}