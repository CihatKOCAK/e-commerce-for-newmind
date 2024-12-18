import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import routes from './routes/routeConfig';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout'; // Layout bileşenini ekleyin

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
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
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
