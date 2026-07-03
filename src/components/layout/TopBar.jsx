import { PanelLeftClose } from 'lucide-react';
import '../../styles/layout.css'


function TopBar({title="Dashboard"}) {
  return (

      <div className="topBarInner">
          <div className="topBarPageInfo">
            {/* <div className='topbar-logo'>My logo</div> */}
            <button className='topBarToggle'>
              <PanelLeftClose size={14} />
            </button>
            <h2 className="topBarTitle">{title}</h2>
          </div>
          
          
          <div className="topBarActions">
            <button
              type="button"
              className="themeButton"
              aria-label="Change theme"
            >
              Dark mode
            </button>

            <div className="topBarProfile">
              <div className="topBarUserInfo">
                <strong>Menura</strong>
                <span>Student</span>
              </div>
            </div>
          </div>
      </div>    
  )
}

export default TopBar