import React from 'react';

const Login = React.lazy(() => import('./components/Account/login'));
const Register = React.lazy(() => import('./components/Account/register'));
const ForgotPassword = React.lazy(() => import('./components/Account/forgotPassword'));
const ResetPassword = React.lazy(() => import('./components/Account/resetPassword'));
const Home = React.lazy(() => import('./Views'));
const ProductDetail = React.lazy(() => import('./Views/ProductDetail'));
const Checkout = React.lazy(() => import('./components/Checkout'));
const Basket = React.lazy(() => import('./Views/Basket'));
const ViewProfile = React.lazy(() => import('./Views/ViewProfile'));
const CodeVerification = React.lazy(() => import('./components/Account/codeVerification'));
const Wishlist = React.lazy(() => import('./Views/Wishlist'));
const Orders = React.lazy(() => import('./Views/Orders'));
const Order = React.lazy(() => import('./Views/Order'));
const Admin = React.lazy(() => import('./components/Admin/App'));

const routes = [
  {path: "/admin", exact: true, main:() => <Admin/>},
  {path: "/login", exact: true, main:() => <Login/>},
  {path: "/register", exact: true, main:() => <Register/>},
  {path: "/reset-password", exact: true, main:() => <ResetPassword/>},
  {path: "/forgot-password", exact: true, main:() => <ForgotPassword/>},
  {path: "/code-verification", exact: true, main:() => <CodeVerification/>},
  {path: "/profile", exact: true, main:() => <ViewProfile/>},
  {path: "/detail/:id/:slug", exact: true, main:() => <ProductDetail/>},
  {path: "/checkout", exact: true, main:() => <Checkout/>},
  {path: "/basket", exact: true, main:() => <Basket/>},
  {path: "/wishlist", exact: true, main:() => <Wishlist/>},
  {path: "/orders", exact: true, main:() => <Orders/>},
  {path: "/orders/:id", exact: true, main:() => <Order/>},
  {path: "/", exact: true, main:() => <Home/>}
];

export default routes;