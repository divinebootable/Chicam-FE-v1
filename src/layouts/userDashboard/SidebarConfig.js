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
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon(pieChart2Fill)
  // },
  // {
  //   title: 'Manager Categories and Brands ...',
  //   icon: getIcon(fileTextFill),
  //   children: [
  //     {
  //       title: 'Manage product categories',
  //       path: '/dashboard/category',
  //       icon: getIcon(shoppingBagFill)
  //     },
  //     {
  //       title: 'Manage Brands',
  //       path: '/dashboard/brand',
  //       icon: getIcon(shoppingBagFill)
  //     }
  //     {
  //       title: 'Manage Profiles',
  //       path: '/dashboard/profile',
  //       icon: getIcon(shoppingBagFill)
  //     },
  //     {
  //       title: 'Manage Vehicle',
  //       path: '/dashboard/vehicle',
  //       icon: getIcon(shoppingBagFill)
  //     }
  //   ]
  // },
  // {
  //   title: 'Manage Product',
  //   icon: getIcon(shoppingBagFill),
  //   children: [
  //     { title: 'add products', path: '/dashboard/addproducts', icon: getIcon(shoppingBagFill) },
  //     {
  //       title: 'product',
  //       path: '/dashboard/products',
  //       icon: getIcon(shoppingBagFill)
  //     }
  //   ]
  // },
  {
    title: 'Sales',
    path: '/dashboard/addsales',
    icon: getIcon(fileTextFill),
    children: [
      { title: 'Add Sales', path: '/dashboard/addsales', icon: getIcon(shoppingBagFill) },
      {
        title: 'Sales',
        path: '/dashboard/warehousesales',
        icon: getIcon(shoppingBagFill)
      }
    ]
  },
  {
    title: 'manage expenses',
    path: '/dashboard/expense',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'manage transfer',
    icon: getIcon(fileTextFill),
    children: [
      {
        title: 'Incoming transfer',
        path: '/dashboard/transferin',
        icon: getIcon(fileTextFill)
      },
      {
        title: 'Outgoing transfer',
        path: '/dashboard/transferout',
        icon: getIcon(fileTextFill)
      }
    ]
  },
  {
    title: 'Payments',
    icon: getIcon(fileTextFill),
    children: [
      {
        title: 'Add Payments',
        path: '/dashboard/addpayments',
        icon: getIcon(lockFill)
      },
      {
        title: 'Payments',
        path: '/dashboard/payments',
        icon: getIcon(lockFill)
      }
    ]
  }
  // {  payments
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  //{
  // title: 'Not found',
  // path: '/404',
  // icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
