import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="nav-menu">
      <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        HOME
      </NavLink>
      <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        DASHBOARD
      </NavLink>
      <NavLink to="/stealth" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        STEALTH
      </NavLink>
      <NavLink to="/activity" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        ACTIVITY
      </NavLink>
      <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
        ADMIN
      </NavLink>
    </nav>
  );
};
