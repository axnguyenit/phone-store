import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import "./css/styles.css";

const Login = React.lazy(() => import('./components/Account/login'));
const Register = React.lazy(() => import('./components/Account/register'));
const ForgotPassword = React.lazy(() => import('./components/Account/forgotPassword'));
const ResetPassword = React.lazy(() => import('./components/Account/resetPassword'));
const Home = React.lazy(() => import('./Views/Home'));
const ProductDetail = React.lazy(() => import('./Views/Home/ProductDetail'));
const Checkout = React.lazy(() => import('./components/Checkout'));
const Basket = React.lazy(() => import('./Views/Home/Basket'));
const ViewProfile = React.lazy(() => import('./Views/Home/ViewProfile'));
// const ViewProfile = React.lazy(() => import('./components/Account/Profile'));
const CodeVerification = React.lazy(() => import('./components/Account/codeVerification'));
const Wishlist = React.lazy(() => import('./Views/Home/Wishlist'));
const Orders = React.lazy(() => import('./Views/Home/Orders'));
const Order = React.lazy(() => import('./Views/Home/Order'));
const Admin = React.lazy(() => import('./components/Admin/App'));
// const SearchBar = React.lazy(() => import('./components/Header/searchBar'));
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading...</div>
  </div>
)

function App() {
  
  // render={props => <Login {...props}
  return (
    <BrowserRouter>
        <React.Suspense fallback={loading}>
            <Switch >
                <Route path = "/admin" exact component = { Admin }/> 
                <Route path = "/login" exact component = { Login }/>
                <Route path = "/register" exact component = { Register }/>
                <Route path = "/reset-password" exact component = { ResetPassword }/>
                <Route path = "/forgot-password" exact component = { ForgotPassword }/>
                <Route path = "/code-verification" exact component = { CodeVerification }/>
                <Route path = "/profile" exact component = { ViewProfile }/> 
                <Route path = "/detail/:id/:slug" exact component = { ProductDetail } />
                <Route path = "/checkout" exact component = { Checkout } />
                <Route path = "/basket" exact component = { Basket } />
                <Route path = "/wishlist" exact component = { Wishlist } />
                <Route path = "/orders" exact component = { Orders } />
                <Route path = "/orders/:id" exact component = { Order } />
                {/* <Route path = "/search-bar" exact component = { SearchBar } /> */}

                <Route path = "/" exact component = { Home } />
                <Redirect from = "*" to = "/" />
            </Switch> 
        </React.Suspense> 
    </BrowserRouter>
  );
}

export default App;