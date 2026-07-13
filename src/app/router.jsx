import {
  createBrowserRouter,
  Navigate,
} from 'react-router';

import AppLayout from './AppLayout';

import ErrorPage from '../components/feedback/ErrorPage';
import NotFoundPage from '../components/feedback/NotFoundPage';

import DashboardPage from '../features/dashboard/pages/DashboardPage';
import FocusPage from '../features/focus/pages/FocusPage';
import NotesPage from '../features/notes/pages/NotesPage';
import ProfilePage from '../features/profile/pages/ProfilePage';
import ResourcesPage from '../features/resources/pages/ResourcesPage';
import SettingsPage from '../features/settings/pages/SettingsPage';

import TaskPage from '../features/tasks/pages/TaskPage';
import NewTaskPage from '../features/tasks/pages/NewTaskPage';
import TaskDetailPage from '../features/tasks/pages/TaskDetailPage';

import {
  createTaskAction,
  taskLoader,
} from '../features/tasks/taskRouteData';

import CoursesPage from '../features/courses/pages/CoursesPage';
import CourseLayout from '../features/courses/components/CourseLayout';
import CourseOverviewPage from '../features/courses/pages/CourseOverviewPage';
import CourseTasksPage from '../features/courses/pages/CourseTasksPage';
import CourseNotesPage from '../features/courses/pages/CourseNotesPage';

import PracticePage from '../practice/pages/PracticePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: (
          <Navigate
            replace
            to="/dashboard"
          />
        ),
      },

      {
        path: 'dashboard',
        element: <DashboardPage />,
      },

      {
        path: 'tasks',
        element: <TaskPage />,
      },

      {
        path: 'tasks/new',
        element: <NewTaskPage />,
        action: createTaskAction,
      },

      {
        path: 'tasks/:taskId',
        element: <TaskDetailPage />,
        loader: taskLoader,
      },

      {
        path: 'courses',
        element: <CoursesPage />,
      },

      {
        path: 'courses/:courseId',
        element: <CourseLayout />,

        children: [
          {
            index: true,
            element: (
              <Navigate
                replace
                to="overview"
              />
            ),
          },

          {
            path: 'overview',
            element: <CourseOverviewPage />,
          },

          {
            path: 'tasks',
            element: <CourseTasksPage />,
          },

          {
            path: 'notes',
            element: <CourseNotesPage />,
          },
        ],
      },

      {
        path: 'focus',
        element: <FocusPage />,
      },

      {
        path: 'notes',
        element: <NotesPage />,
      },

      {
        path: 'resources',
        element: <ResourcesPage />,
      },

      {
        path: 'profile',
        element: <ProfilePage />,
      },

      {
        path: 'settings',
        element: <SettingsPage />,
      },

      {
        path: 'practice-lab',
        element: <PracticePage />,
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);