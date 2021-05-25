import React, { lazy } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import "./css/styles.css";

const SignIn = React.lazy(() => import('./components/Account/signIn'));
const SignUp = React.lazy(() => import('./components/Account/signUp'));
const ForgotPassword = React.lazy(() => import('./components/Account/forgotPassword'));
const ResetPassword = React.lazy(() => import('./components/Account/resetPassword'));
const Home = React.lazy(() => import('./Views/Home'));
const ProductDetail = React.lazy(() => import('./Views/Home/ProductDetail'));
const ErrorPage = React.lazy(() => import('./components/Account/404'));
const Checkout = React.lazy(() => import('./components/Checkout'));
const Basket = React.lazy(() => import('./Views/Home/Basket'));
const ViewProfile = React.lazy(() => import('./Views/Home/ViewProfile'));
// const ViewProfile = React.lazy(() => import('./components/Account/Profile'));
const CodeVerification = React.lazy(() => import('./components/Account/codeVerification'));
const WishList = React.lazy(() => import('./Views/Home/WishList'));
const OrderHistory = React.lazy(() => import('./Views/Home/OrderHistoty'));
const Admin = React.lazy(() => import('./components/Admin/App'));
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
                { /* add routes with layouts */ } 
                { /* <Route path="/admin" component={Admin} /> */ }
                { /* <Route path="/auth" component={Auth} /> */ }
                { /* add routes without layouts */ }

                <Route path = "/admin" exact component = { Admin }/> 
                <Route path = "/sign-in" exact component = { SignIn }/>
                <Route path = "/sign-up" exact component = { SignUp }/>
                <Route path = "/reset-password" exact component = { ResetPassword }/>
                <Route path = "/forgot-password" exact component = { ForgotPassword }/>
                <Route path = "/code-verification" exact component = { CodeVerification }/>
                <Route path = "/profile" exact component = { ViewProfile }/> 
                <Route path = "/detail/:id/:slug" exact component = { ProductDetail } />
                <Route path = "/checkout" exact component = { Checkout } />
                <Route path = "/basket" exact component = { Basket } />
                <Route path = "/wish-list" exact component = { WishList } />
                <Route path = "/order-history" exact component = { OrderHistory } />
                <Route path = "/" exact component = { Home } /> 
                <Route path = "" exact component = { ErrorPage }/> 
                { /* add redirect for first page */ } 
                <Redirect from = "*" to = "/" />
            </Switch> 
        </React.Suspense> 
    </BrowserRouter>
  );
}

export default App;