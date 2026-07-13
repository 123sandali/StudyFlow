function isTaskCompleted(task) {
  return (
    Boolean(task.completed) ||
    task.status === 'completed'
  );
}

function parseDateInput(dateValue) {
  if (!dateValue) {
    return null;
  }

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function getStartOfToday(referenceDate = new Date()) {
  const today = new Date(referenceDate);

  today.setHours(0, 0, 0, 0);

  return today;
}

export function getCompletedCount(tasks) {
  return tasks.filter(isTaskCompleted).length;
}

export function getTasksByCourse(tasks, courseId) {
  if (!courseId) {
    return [];
  }

  return tasks.filter(
    (task) => task.courseId === courseId,
  );
}

export function getOverdueTasks(
  tasks,
  referenceDate = new Date(),
) {
  const today = getStartOfToday(referenceDate);

  return tasks.filter((task) => {
    if (isTaskCompleted(task)) {
      return false;
    }

    const dueDate = parseDateInput(task.dueDate);

    if (!dueDate) {
      return false;
    }

    return dueDate < today;
  });
}

export function getFilteredTasks(
  tasks,
  activeFilter = 'all',
  searchTerm = '',
) {
  const normalizedSearchTerm = searchTerm
    .trim()
    .toLowerCase();

  return tasks.filter((task) => {
    const completed = isTaskCompleted(task);

    let matchesFilter = true;

    if (activeFilter === 'active') {
      matchesFilter = !completed;
    }

    if (activeFilter === 'completed') {
      matchesFilter = completed;
    }

    if (activeFilter === 'overdue') {
      matchesFilter = getOverdueTasks([task]).length > 0;
    }

    if (!matchesFilter) {
      return false;
    }

    if (!normalizedSearchTerm) {
      return true;
    }

    return task.title
      .toLowerCase()
      .includes(normalizedSearchTerm);
  });
}