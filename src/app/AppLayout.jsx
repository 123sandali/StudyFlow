import { useEffect } from 'react';
import {
  Outlet,
  useLocation,
} from 'react-router';

import AppShell from '../components/layout/AppShell';

function getPageTitle(pathname) {
  if (pathname.startsWith('/tasks')) {
    return 'Tasks';
  }

  if (pathname.startsWith('/courses')) {
    return 'Courses';
  }

  if (pathname.startsWith('/focus')) {
    return 'Focus';
  }

  if (pathname.startsWith('/notes')) {
    return 'Notes';
  }

  if (pathname.startsWith('/resources')) {
    return 'Resources';
  }

  if (pathname.startsWith('/profile')) {
    return 'Profile';
  }

  if (pathname.startsWith('/settings')) {
    return 'Settings';
  }

  if (pathname.startsWith('/practice-lab')) {
    return 'Practice Lab';
  }

  return 'Dashboard';
}

export default function AppLayout() {
  const { pathname } = useLocation();

  const title = getPageTitle(pathname);

  useEffect(() => {
    document.title = `${title} | StudyFlow`;
  }, [title]);

  return (
    <AppShell title={title}>
      <Outlet />
    </AppShell>
  );
}