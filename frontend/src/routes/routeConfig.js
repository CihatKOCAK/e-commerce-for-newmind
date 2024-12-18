import IndexPage from '../pages/public/IndexPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import ProfilePage from '../pages/private/user/ProfilePage';
import DashboardPage from '../pages/private/admin/DashboardPage';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

const routes = [
  {
    path: '/',
    element: <IndexPage />,
    isPrivate: false,
  },
  {
    path: '/login',
    element: <LoginPage />,
    isPrivate: false,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    isPrivate: false,
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute roles={['user', 'admin']}>
        <ProfilePage />
      </PrivateRoute>
    ),
    isPrivate: true,
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminRoute>
        <DashboardPage />
      </AdminRoute>
    ),
    isPrivate: true,
  },
];

export default routes;