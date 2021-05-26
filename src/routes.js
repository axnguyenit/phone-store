import React from 'react';

const SignIn = React.lazy(() => import('./components/Account/signIn'));
const SignUp = React.lazy(() => import('./components/Account/signUp'));
const ResetPassword = React.lazy(() => import('./components/Account/resetPassword'));
const Home = React.lazy(() => import('./Views/Home'));
const ProductDetail = React.lazy(() => import('./Views/Home/ProductDetail'));
const ForgotPassword = React.lazy(() => import('./components/Account/forgotPassword'));
const ErrorPage = React.lazy(() => import('./components/Account/404'));
const Checkout = React.lazy(() => import('./components/Checkout'));
const Basket = React.lazy(() => import('./Views/Home/Basket'));
const ViewProfile = React.lazy(() => import('./Views/Home/ViewProfile'));

const routes = [
  { path: '/', exact: true, component: Home},
  { path: '/login', exact: true, component: SignIn },
  { path: '/register', exact: true, component: SignUp },
  { path: '/reset-password', exact: true, component: ResetPassword },
  { path: '/forgot-password', exact: true, component: ForgotPassword },
  { path: '/profile',  exact: true, component: ViewProfile },
  { path: '/detail/:id/:slug', exact: true, component: ProductDetail },
  { path: '/basket', exact: true, component: Basket },
  { path: '/checkout', exact: true, component: Checkout },
  { path: '', exact: true, component: ErrorPage },
  
];

export default routes;