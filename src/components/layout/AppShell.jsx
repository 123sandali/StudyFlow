import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppShell({
  children,
  title = 'Dashboard',
}) {
  return (
    <div className="appShell">
      <aside className="sideBar">
        <Sidebar />
      </aside>

      <div className="mainContent">
        <header className="topBar">
          <TopBar title={title} />
        </header>

        <main className="pageContent">{children}</main>
      </div>
    </div>
  );
}