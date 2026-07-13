export const TASK_ACTIONS = Object.freeze({
  ADD: 'ADD_TASK',
  TOGGLE: 'TOGGLE_TASK',
  DELETE: 'DELETE_TASK',
  EDIT: 'EDIT_TASK',
});

export function taskReducer(state, action) {
  switch (action.type) {
    case TASK_ACTIONS.ADD: {
      return [...state, action.payload];
    }

    case TASK_ACTIONS.TOGGLE: {
      const { id, timestamp } = action.payload;

      return state.map((task) => {
        if (task.id !== id) {
          return task;
        }

        const completed = !task.completed;

        return {
          ...task,
          completed,
          status: completed ? 'completed' : 'todo',
          completedAt: completed ? timestamp : null,
          updatedAt: timestamp,
        };
      });
    }

    case TASK_ACTIONS.DELETE: {
      return state.filter(
        (task) => task.id !== action.payload,
      );
    }

    case TASK_ACTIONS.EDIT: {
      const { id, changes } = action.payload;

      return state.map((task) =>
        task.id === id
          ? {
              ...task,
              ...changes,
              updatedAt:
                changes.updatedAt ??
                new Date().toISOString(),
            }
          : task,
      );
    }

    default: {
      return state;
    }
  }
}