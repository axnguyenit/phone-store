import React from 'react';
const Logout = React.lazy(() => import('./views/pages/logout/Logout'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/users/Users'));
const Orders = React.lazy(() => import('./views/orders/orders'));
const Order = React.lazy(() => import('./views/orders/order'));
const Products = React.lazy(() => import('./views/products/products'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Orders, exact: true },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/orders/:id', name: 'Order', component: Order },
  { path: '/products', name: 'Products', component: Products },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/logout', exact: true,  name: 'Users', component: Logout },
];

export default routes;