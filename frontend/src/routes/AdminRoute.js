// /routes/AdminRoute.js
import React from 'react';
import PrivateRoute from './PrivateRoute';

const AdminRoute = ({ children }) => {
  return <PrivateRoute roles={['admin']}>{children}</PrivateRoute>;
};

export default AdminRoute;
