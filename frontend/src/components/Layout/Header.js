import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBasket } from '../../context/BasketContext';
import { FaShoppingCart } from 'react-icons/fa'; // Sepet ikonu için
import './layout.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { basket, clearBasket } = useBasket(); // Sepet verisini al
  const location = useLocation();

  const logoutUser = () => {
    logout();
    clearBasket();
    
  }

  const navList = user ? (
    <ul className="nav-list">
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile">Profile</Link>
      </li>
     { user.role === 'admin' &&
      <li className="nav-item">
        <Link className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`} to="/admin/dashboard">Dashboard</Link>
      </li>
      }
      <li className="nav-item">
        <Link className="nav-link" to="/logout" onClick={logoutUser}>Logout</Link>
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
      <div className="basket-icon">
        <Link to="/basket" className="basket-link">
          <FaShoppingCart size={24} />
          {basket.length > 0 && <span className="basket-count">{basket.length}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
