import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/userDashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/products/productsById';
import Blog from './pages/Blog';
import User from './pages/User';
import Brand from './pages/productInfo/brand/brand';
import Category from './pages/productInfo/categories/category';
import Profile from './pages/productInfo/profiles/profiles';
import Vehicle from './pages/productInfo/vehicle/vehicle';
import AddProduct from './pages/products/addProducts';
import Expense from './pages/expenses/expensesById';
import IncomingTransfers from './pages/transfers/incoming/transfer';
import OutgoingTransfers from './pages/transfers/outgoing/transfer';
import AddSales from './pages/sales/addSales';
import SalesById from './pages/sales/salesById';
import AddPayments from './pages/payments/addpayments';
import PaymentById from './pages/payments/paymentsById';

import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/category" replace /> },
        // { path: 'app', element: <DashboardApp /> },
        { path: 'category', element: <Category /> },
        { path: 'brand', element: <Brand /> },
        { path: 'profile', element: <Profile /> },
        { path: 'vehicle', element: <Vehicle /> },
        { path: 'products', element: <Products /> },
        { path: 'addproducts', element: <AddProduct /> },
        { path: 'addsales', element: <AddSales /> },
        { path: 'warehousesales', element: <SalesById /> },
        { path: 'expense', element: <Expense /> },
        { path: 'transferin', element: <IncomingTransfers /> },
        { path: 'transferout', element: <OutgoingTransfers /> },
        { path: 'addpayments', element: <AddPayments /> },
        { path: 'payments', element: <PaymentById /> },
        { path: 'user', element: <User /> },
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
