import React from 'react';
const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));

const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const Buttons = React.lazy(() => import('./views/buttons'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Users = React.lazy(() => import('./views/users/Users'));
const Orders = React.lazy(() => import('./views/orders/orders'));
const Products = React.lazy(() => import('./views/products/products'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Orders, exact: true },
  { path: '/orders', name: 'Orders', component: Orders },
  // { path: '/orders/:id', name: 'Orders', component: Order },
  { path: '/products', name: 'Products', component: Products },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons },
  { path: '/notifications', name: 'Notifications', component: Modals, exact: true },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/users', exact: true,  name: 'Users', component: Users },
];

export default routes;