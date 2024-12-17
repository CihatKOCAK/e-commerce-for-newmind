import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import routes from './routes/routeConfig';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            if (route.isPrivate) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute roles={route.roles}>{route.element}</PrivateRoute>
                  }
                />
              );
            }
            return <Route key={index} path={route.path} element={route.element} />;
          })}
          {/* Geçersiz URL için */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
