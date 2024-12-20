import IndexPage from '../pages/public/IndexPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import ProfilePage from '../pages/private/user/ProfilePage';
import DashboardPage from '../pages/private/admin/DashboardPage';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import ProductDetailPage from '../pages/public/ProductDetailPage/ProductDetailPage';
import BasketPage from '../pages/public/BasketPage/BasketPage';

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
    path: '/product/:id',
    element: <ProductDetailPage />,
    isPrivate: false,
  },
  {
    path:'/basket',
    element: <BasketPage />,
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
