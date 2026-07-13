import AppShell from './components/layout/AppShell';

import DashboardPage from './features/dashboard/pages/DashboardPage';
import NotesPage from './features/notes/pages/NotesPage';
import PracticePage from './practice/pages/PracticePage';
import ProfilePage from './features/profile/pages/ProfilePage';
import ResourcesPage from './features/resources/pages/ResourcesPage';
import SettingsPage from './features/settings/pages/SettingsPage';
import TasksPage from './features/tasks/pages/TaskPage';
import FocusPage from './features/focus/pages/FocusPage';

const CURRENT_PAGE = 'tasks';

const PAGE_CONFIG = {
  dashboard: {
    title: 'Dashboard',
    Component: DashboardPage,
  },

  tasks: {
    title: 'Tasks',
    Component: TasksPage,
  },

  focus: {
    title: 'Focus',
    Component: FocusPage,
  },

  notes: {
    title: 'Notes',
    Component: NotesPage,
  },

  resources: {
    title: 'Resources',
    Component: ResourcesPage,
  },

  profile: {
    title: 'Profile',
    Component: ProfilePage,
  },

  settings: {
    title: 'Settings',
    Component: SettingsPage,
  },

  practice: {
    title: 'Practice Lab',
    Component: PracticePage,
  },
};

export default function App() {
  const selectedPage =
    PAGE_CONFIG[CURRENT_PAGE] ??
    PAGE_CONFIG.dashboard;

  const {
    title,
    Component,
  } = selectedPage;

  return (
    <AppShell title={title}>
      <Component />
    </AppShell>
  );
}