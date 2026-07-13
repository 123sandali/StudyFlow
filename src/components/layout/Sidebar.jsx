// import '../../styles/layout.css'

// function Sidebar() {
//   const navigationlinks =[
//     {label: 'Dashboard', href: '#dashboard'},
//     {label: 'Tasks', href: '#tasks'},
//     {label: 'Courses', href: '#courses'},
//     {label: 'Focus', href: '#focus'},
//     {label: 'Notes', href: '#notes'},
//     {label: 'Resources', href: '#resources'},
//     {label: 'Profiles', href: '#profiles'},
//     {label: 'Settings', href: '#settings'},
//     {label: 'Practical Lab', href: '#practical-lab'}
//   ];
//   return (
//     <>
//       <div className = "sidebarBrand">
//         <div className="sidebarLogo">S</div>
//       <div>
//         <h1>StudyFlow</h1>
//         <p>Student Productivity</p>
//       </div>
//       </div>

//       <div>
//         <nav className="sidebarNav">
//             <ul className="sidebarLinks">
//               {navigationlinks.map(({label,href}) => (<li key={href}><a href={href}>{label}</a></li>))}
//             </ul>
//         </nav>
//      </div>


//       <div className='sidebarUser'>
//         <div className="sidebarAvatar">
//           <img 
//           src="https://i.pinimg.com/736x/96/4a/2e/964a2ee6f112314e886c1ac47a7621c2.jpg" 
//           alt="Profile" 
//           className='profileImage'
//         />
//         </div>

//         <div>
//           <strong>Shela</strong>
//           <span>Computer Science</span>
//         </div>
//       </div>
//     </>
    
//   )
// }

// export default Sidebar

import { NavLink } from 'react-router';

import { useUser } from '../../hooks/useUser';

const navigationItems = [
  {
    label: 'Dashboard',
    to: '/dashboard',
  },
  {
    label: 'Tasks',
    to: '/tasks',
  },
  {
    label: 'Courses',
    to: '/courses',
  },
  {
    label: 'Focus',
    to: '/focus',
  },
  {
    label: 'Notes',
    to: '/notes',
  },
  {
    label: 'Resources',
    to: '/resources',
  },
  {
    label: 'Profile',
    to: '/profile',
  },
  {
    label: 'Settings',
    to: '/settings',
  },
  {
    label: 'Practice Lab',
    to: '/practice-lab',
  },
];

function getInitials(name) {
  if (!name) {
    return 'SF';
  }

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export default function Sidebar() {
  const { user } = useUser();

  return (
    <>
      <div className="sidebarBrand">
        <div className="sidebarLogo">
          S
        </div>

        <div>
          <strong>StudyFlow</strong>
          <span>Student Productivity</span>
        </div>
      </div>

      <nav
        className="sidebarNavigation"
        aria-label="Main navigation"
      >
        <ul className="sidebarLinks">
          {navigationItems.map((item) => (
            <li key={item.to}>
              <NavLink
                className={({ isActive }) =>
                  `sidebarLink ${
                    isActive
                      ? 'sidebarLinkActive'
                      : ''
                  }`
                }
                to={item.to}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebarUser">
        <div className="sidebarAvatar">
          {getInitials(user.displayName)}
        </div>

        <div>
          <strong>
            {user.displayName ||
              'StudyFlow User'}
          </strong>

          <span>
            {user.programme ||
              'Local profile'}
          </span>
        </div>
      </div>
    </>
  );
}