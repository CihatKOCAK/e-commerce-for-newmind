import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // useNavigate kullanıyoruz

const IndexPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // useHistory yerine useNavigate

  return (
    <div>
      <h2>Welcome, {user ? user.name : 'Guest'}</h2>
      {
        user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
          <button onClick={() => navigate('/login')}>Login</button> 
          <button onClick={() => navigate('/register')}>Register</button>
          
          </>
        )
      }
    </div>
  );
};

export default IndexPage;
