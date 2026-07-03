import '../../styles/layout.css'

function Sidebar() {
  const navigationlinks =[
    {label: 'Dashboard', href: '#dashboard'},
    {label: 'Tasks', href: '#tasks'},
    {label: 'Courses', href: '#courses'},
    {label: 'Focus', href: '#focus'},
    {label: 'Notes', href: '#notes'},
    {label: 'Resources', href: '#resources'},
    {label: 'Profiles', href: '#profiles'},
    {label: 'Settings', href: '#settings'},
    {label: 'Practical Lab', href: '#practical-lab'}
  ];
  return (
    <>
      <div className = "sidebarBrand">
        <div className="sidebarLogo">S</div>
      <div>
        <h1>StudyFlow</h1>
        <p>Student Productivity</p>
      </div>
      </div>

      <div>
        <nav className="sidebarNav">
            <ul className="sidebarLinks">
              {navigationlinks.map(({label,href}) => (<li key={href}><a href={href}>{label}</a></li>))}
            </ul>
        </nav>
     </div>


      <div className='sidebarUser'>
        <div className="sidebarAvatar">
          <img 
          src="https://i.pinimg.com/736x/96/4a/2e/964a2ee6f112314e886c1ac47a7621c2.jpg" 
          alt="Profile" 
          className='profileImage'
        />
        </div>

        <div>
          <strong>Shela</strong>
          <span>Computer Science</span>
        </div>
      </div>
    </>
    
  )
}

export default Sidebar