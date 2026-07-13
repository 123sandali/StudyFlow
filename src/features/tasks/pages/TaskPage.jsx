import {
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import { useLocalStorage } from '../../../hooks/useLocalStorage';

import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

import {
  TASK_ACTIONS,
  taskReducer,
} from '../taskReducer';

import {
  getCompletedCount,
  getFilteredTasks,
  getOverdueTasks,
} from '../taskSelectors';

import '../tasks.css';
import './tasks.css';

function createTaskId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

const TASK_FILTERS = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
  {
    value: 'overdue',
    label: 'Overdue',
  },
];

export default function TasksPage() {
  const [storedTasks, setStoredTasks] =
    useLocalStorage('studyflow-tasks', []);

  const [tasks, dispatch] = useReducer(
    taskReducer,
    storedTasks,
  );

  const [activeFilter, setActiveFilter] =
    useState('all');

  const [searchTerm, setSearchTerm] =
    useState('');

  /*
   * Temporary Phase 1 persistence bridge.
   * The next repository task will move persistence out of
   * this page.
   */
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  function addTask(taskInput) {
    const timestamp = new Date().toISOString();

    const newTask = {
      id: createTaskId(),
      userId: 'local-user',
      courseId: null,

      title: taskInput.title.trim(),
      description: '',
      priority: taskInput.priority,
      dueDate: taskInput.dueDate,

      status: 'todo',
      completed: false,

      createdAt: timestamp,
      updatedAt: timestamp,
      completedAt: null,
    };

    dispatch({
      type: TASK_ACTIONS.ADD,
      payload: newTask,
    });
  }

  function toggleTask(taskId) {
    dispatch({
      type: TASK_ACTIONS.TOGGLE,
      payload: {
        id: taskId,
        timestamp: new Date().toISOString(),
      },
    });
  }

  function deleteTask(taskId) {
    dispatch({
      type: TASK_ACTIONS.DELETE,
      payload: taskId,
    });
  }

  const completedCount = getCompletedCount(tasks);

  const activeCount =
    tasks.length - completedCount;

  const overdueCount =
    getOverdueTasks(tasks).length;

  const filteredTasks = useMemo(
    () =>
      getFilteredTasks(
        tasks,
        activeFilter,
        searchTerm,
      ),
    [tasks, activeFilter, searchTerm],
  );

  return (
    <section className="tasksPage">
      <div className="tasksPageIntro">
        <div>
          <h1 className="tasksPageTitle">
            Task management
          </h1>

          <p className="tasksPageDescription">
            Task operations are now managed by a reducer, while
            counts and filtered lists are derived from the
            source array.
          </p>
        </div>

        <div className="taskStats">
          <div className="taskStat">
            <strong className="taskStatValue">
              {activeCount}
            </strong>

            <span className="taskStatLabel">
              Active
            </span>
          </div>

          <div className="taskStat">
            <strong className="taskStatValue">
              {completedCount}
            </strong>

            <span className="taskStatLabel">
              Completed
            </span>
          </div>

          <div className="taskStat">
            <strong className="taskStatValue">
              {overdueCount}
            </strong>

            <span className="taskStatLabel">
              Overdue
            </span>
          </div>

          <div className="taskStat">
            <strong className="taskStatValue">
              {tasks.length}
            </strong>

            <span className="taskStatLabel">
              Total
            </span>
          </div>
        </div>
      </div>

      <div className="tasksPageLayout">
        <TaskForm onSubmit={addTask} />

        <div className="taskListPanel">
          <div className="taskListHeader">
            <div>
              <h2>Your tasks</h2>

              <p>
                Showing {filteredTasks.length} of{' '}
                {tasks.length} tasks.
              </p>
            </div>
          </div>

          <div className="taskFilterToolbar">
            <div
              className="taskFilterGroup"
              role="group"
              aria-label="Filter tasks by status"
            >
              {TASK_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  className={`taskFilterButton ${
                    activeFilter === filter.value
                      ? 'taskFilterButtonActive'
                      : ''
                  }`}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter.value)
                  }
                  aria-pressed={
                    activeFilter === filter.value
                  }
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <label
              className="taskSearchField"
              htmlFor="task-search"
            >
              <span className="visuallyHidden">
                Search tasks
              </span>

              <input
                id="task-search"
                className="taskSearchInput"
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search tasks..."
              />
            </label>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="taskEmptyState">
              <h3>No matching tasks</h3>

              <p>
                Try changing the filter, clearing the search,
                or adding a new task.
              </p>
            </div>
          ) : (
            <div className="taskManagementList">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}