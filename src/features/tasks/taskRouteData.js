import { redirect } from 'react-router';

import {
  validateDate,
  validateMaxLength,
  validateRequired,
} from '../../utils/validation';

const TASK_STORAGE_KEY = 'studyflow-tasks';

function readStoredTasks() {
  try {
    const storedTasks = localStorage.getItem(
      TASK_STORAGE_KEY,
    );

    if (!storedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(storedTasks);

    return Array.isArray(parsedTasks)
      ? parsedTasks
      : [];
  } catch (error) {
    console.error(
      'Unable to read routed tasks:',
      error,
    );

    return [];
  }
}

function writeStoredTasks(tasks) {
  localStorage.setItem(
    TASK_STORAGE_KEY,
    JSON.stringify(tasks),
  );
}

function createTaskId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

export async function taskLoader({ params }) {
  const tasks = readStoredTasks();

  const task = tasks.find(
    (item) => item.id === params.taskId,
  );

  if (!task) {
    throw new Response('The requested task was not found.', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return task;
}

export async function createTaskAction({
  request,
}) {
  const formData = await request.formData();

  const values = {
    title: String(
      formData.get('title') ?? '',
    ),
    priority: String(
      formData.get('priority') ?? 'medium',
    ),
    dueDate: String(
      formData.get('dueDate') ?? '',
    ),
  };

  const errors = {};

  const titleError =
    validateRequired(values.title, 'Title') ??
    validateMaxLength(
      values.title,
      100,
      'Title',
    );

  const dueDateError = validateDate(
    values.dueDate,
  );

  if (titleError) {
    errors.title = titleError;
  }

  if (dueDateError) {
    errors.dueDate = dueDateError;
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values,
    };
  }

  const timestamp = new Date().toISOString();

  const newTask = {
    id: createTaskId(),
    userId: 'local-user',
    courseId: null,

    title: values.title.trim(),
    description: '',
    priority: values.priority,
    dueDate: values.dueDate,

    status: 'todo',
    completed: false,

    createdAt: timestamp,
    updatedAt: timestamp,
    completedAt: null,
  };

  const tasks = readStoredTasks();

  writeStoredTasks([
    ...tasks,
    newTask,
  ]);

  return redirect('/tasks');
}