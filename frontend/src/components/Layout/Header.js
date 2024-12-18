import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navList = user ? (
    <ul className="nav-list">
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile">Profile</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>
      </li>
    </ul>
  ) : (
    <ul className="nav-list">
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} to="/register">Register</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">CeC</Link>
      </div>
      <nav className="nav">
        {navList}
      </nav>
    </header>
  );
};

export default Header;
