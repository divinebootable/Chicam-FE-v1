import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/admin/products/products';
import Blog from './pages/Blog';
import User from './pages/User';
import Brand from './pages/productInfo/brand/brand';
import Category from './pages/productInfo/categories/category';
import Profile from './pages/productInfo/profiles/profiles';
import Vehicle from './pages/productInfo/vehicle/vehicle';
import AddProduct from './pages/admin/products/addproducts';
import Expense from './pages/admin/expenses/expenses';
import Sales from './pages/admin/sales/sales';
import NotFound from './pages/Page404';
import Accounts from './pages/admin/warehouse/account';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'category', element: <Category /> },
        { path: 'brand', element: <Brand /> },
        { path: 'profile', element: <Profile /> },
        { path: 'vehicle', element: <Vehicle /> },
        { path: 'products', element: <Products /> },
        { path: 'accounts', element: <Accounts /> },
        { path: 'expenses', element: <Expense /> },
        { path: 'sales', element: <Sales /> },
        { path: 'addproducts', element: <AddProduct /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
