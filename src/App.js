import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import commerce from './lib/commerce';

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
const CodeVerification = React.lazy(() => import('./components/Account/codeVerification'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading...</div>
  </div>
)

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async() => {
    const res = await commerce.products.list();
    setProducts((res && res.data) || []);
  }

  // setTimeout((fetchProducts()),1000)
  const saveProducts = () => {
    localStorage.setItem('products', JSON.stringify(products));
  }

  useEffect(() => {
    fetchProducts();
    saveProducts();
  }, []);
  return (
    <BrowserRouter>
        <React.Suspense fallback={loading}>
            <Switch >
                { /* add routes with layouts */ } 
                { /* <Route path="/admin" component={Admin} /> */ }
                { /* <Route path="/auth" component={Auth} /> */ }
                { /* add routes without layouts */ } 
                <Route path = "/sign-in" exact component = { SignIn }/> 
                <Route path = "/sign-up" exact component = { SignUp }/>
                <Route path = "/reset-password" exact component = { ResetPassword }/>
                <Route path = "/forgot-password" exact component = { ForgotPassword }/>
                <Route path = "/code-verification" exact component = { CodeVerification }/>
                <Route path = "/profile" exact component = { ViewProfile }/> 
                <Route path = "/detail/:id/:slug" exact component = { ProductDetail } />
                <Route path = "/checkout" exact component = { Checkout } />
                <Route path = "/basket" exact component = { Basket } />
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