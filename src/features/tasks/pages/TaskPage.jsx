import { useMemo } from 'react';
import { useArray } from '../../../hooks/useArray';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
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
  const taskStorage = useLocalStorage('studyflow_tasks', initialTasks);

  const {
    array: tasks,
    push,
    remove,
    update,
  } = useArray(initialTasks, taskStorage);

  function addTask(newTask) {
    push({
      id: Date.now(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString(),
    });
  }

  function toggleTask(id) {
    const selectedTask = tasks.find((task) => task.id === id);

    if (!selectedTask) {
      return;
    }

    update(id, {
      completed: !selectedTask.completed,
      completedAt: selectedTask.completed ? null : new Date().toISOString(),
    });
  }

  function deleteTask(id) {
    remove(id);
  }

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  const activeTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks]
  );

  const totalTasks = tasks.length;

  return (
    <div className="tasksPage">
      <section className="tasksHeader">
        <div>
          <p className="tasksEyebrow">Task manager</p>
          <h1 className="tasksTitle">Plan your study work</h1>
          <p className="tasksSubtitle">
            This page now uses custom hooks: useArray for immutable task
            operations and useLocalStorage for browser persistence.
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
          <strong>{activeTasks.length}</strong>
        </div>

        <div className="taskSummaryCard card">
          <span>Completed</span>
          <strong>{completedTasks.length}</strong>
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