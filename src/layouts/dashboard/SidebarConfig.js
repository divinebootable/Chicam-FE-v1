import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'warehouses',
    path: '/dashboard/accounts',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Manager Categories and Brands ...',
    icon: getIcon(fileTextFill),
    children: [
      {
        title: 'Manage product categories',
        path: '/dashboard/category',
        icon: getIcon(shoppingBagFill)
      },
      {
        title: 'Manage Brands',
        path: '/dashboard/brand',
        icon: getIcon(shoppingBagFill)
      },
      {
        title: 'Manage Profiles',
        path: '/dashboard/profile',
        icon: getIcon(shoppingBagFill)
      },
      {
        title: 'Manage Vehicle',
        path: '/dashboard/vehicle',
        icon: getIcon(shoppingBagFill)
      }
    ]
  },
  {
    title: 'Manage Product',
    icon: getIcon(shoppingBagFill),
    children: [
      { title: 'add products', path: '/dashboard/addproducts', icon: getIcon(shoppingBagFill) },
      {
        title: 'product',
        path: '/dashboard/products',
        icon: getIcon(shoppingBagFill)
      }
    ]
  },
  {
    title: 'view sales',
    path: '/dashboard/sales',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'manage expenses',
    icon: getIcon(fileTextFill),
    children: [
      {
        title: 'view expenses',
        path: '/dashboard/expenses',
        icon: getIcon(fileTextFill)
      }
      // {
      //   title: 'add expenses',
      //   path: '/dashboard/blog',
      //   icon: getIcon(fileTextFill)
      // }
    ]
  },
  {
    title: 'manage transfer',
    icon: getIcon(fileTextFill),
    children: [
      {
        title: 'transfer in',
        path: '/dashboard/blog',
        icon: getIcon(fileTextFill)
      },
      {
        title: 'transfer out',
        path: '/dashboard/blog',
        icon: getIcon(fileTextFill)
      }
    ]
  }
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // // {
  // //   title: 'register',
  // //   path: '/register',
  // //   icon: getIcon(personAddFill)
  // // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
