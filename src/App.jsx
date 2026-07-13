import AppShell from "./components/layout/AppShell";
import FocusPage from "./features/focus/pages/FocusPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import TasksPage from "./features/tasks/pages/TaskPage";
import ClassCounter from "./practice/ClassCounter";
import { useState } from "react";
import ResourcesPage from "./features/resources/pages/ResourcesPage";


function App() {

  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard : {
      title:"dashboard",
      element : <DashboardPage/>
    },
    focus : {
      title:"focus",
      element : <FocusPage/>
    },
    tasks: {
    title: 'tasks',
    element: <TasksPage />,
    },
    practice: {
      title: 'PracticeLab',
      element: <ClassCounter />,
    },
    resource: {
      title: 'PracticeLab',
      element: <ResourcesPage />,
    },
  }

  return (
    <>
      <AppShell title={pages[activePage].title}>
        {pages[activePage].element}
      </AppShell>
    </>
  )
}

export default App
