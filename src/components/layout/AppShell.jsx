import '../../styles/layout.css'
import Sidebar from './Sidebar'
import TopBar from './TopBar'


function AppShell({children}) {
  return (
    <div className="appShell">
    <aside className="sideBar">
        <Sidebar />
    </aside>
    <div className="mainContent">
    <header className="topBar">
      <TopBar />
    </header>
    <main className="pageContent">{children}</main>    </div>
    </div>
  )
}

export default AppShell