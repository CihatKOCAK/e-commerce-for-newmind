// /routes/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Kullanıcı rolü uygun değilse ana sayfaya yönlendir
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
