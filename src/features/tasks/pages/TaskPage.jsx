import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import './tasks.css';

const initialTasks = [
  {
    id: 1,
    title: 'Review React props and components',
    priority: 'high',
    dueDate: '2026-07-10',
    completed: false,
  },
  {
    id: 2,
    title: 'Create StudyFlow task form',
    priority: 'medium',
    dueDate: '2026-07-11',
    completed: false,
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

  function addTask(newTask) {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now(),
        ...newTask,
        completed: false,
      },
    ]);
  }

  function toggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="tasksPage">
      <section className="tasksHeader">
        <div>
          <p className="tasksEyebrow">Task manager</p>
          <h1 className="tasksTitle">Plan your study work</h1>
          <p className="tasksSubtitle">
            This page uses array state, controlled forms, props, map, filter,
            and conditional rendering.
          </p>
        </div>
      </section>

      <section className="taskSummaryGrid">
        <div className="taskSummaryCard card">
          <span>Total</span>
          <strong>{totalTasks}</strong>
        </div>

        <div className="taskSummaryCard card">
          <span>Active</span>
          <strong>{activeTasks}</strong>
        </div>

        <div className="taskSummaryCard card">
          <span>Completed</span>
          <strong>{completedTasks}</strong>
        </div>
      </section>

      <TaskForm onSubmit={addTask} />

      <section className="taskListSection">
        <div className="taskListHeader">
          <h2>Current tasks</h2>
          <span>{totalTasks} tasks</span>
        </div>

        {tasks.length === 0 ? (
          <div className="emptyTasks card">
            <h3>No tasks yet</h3>
            <p>Add your first study task using the form above.</p>
          </div>
        ) : (
          <div className="taskManagerList">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}