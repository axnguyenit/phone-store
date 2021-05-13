import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { SignIn } from "./components/Account/signIn";
import { SignUp } from "./components/Account/signUp";
import { ResetPassword } from "./components/Account/resetPassword";

// views without layouts

import Home from "./Views/Home";
import ProductDetail from "./Views/Home/ProductDetail";
import { ForgotPassword } from "./components/Account/forgotPassword";
import { ErrorPage } from "./components/Account/404";
import Checkout from "./components/Checkout";
import { Basket } from "./Views/Home/Basket";
import ViewProfile from './Views/Home/ViewProfile';

ReactDOM.render( 
    <BrowserRouter>
        <Switch >
            { /* add routes with layouts */ } 
            { /* <Route path="/admin" component={Admin} /> */ }
            { /* <Route path="/auth" component={Auth} /> */ }
            { /* add routes without layouts */ } 
            <Route path = "/sign-in" exact component = { SignIn }/> 
            <Route path = "/sign-up" exact component = { SignUp }/>
            <Route path = "/reset-password" exact component = { ResetPassword }/>
            <Route path = "/forgot-password" exact component = { ForgotPassword }/> 
            <Route path = "/profile" exact component = { ViewProfile }/> 
            <Route path = "/detail/:id/:slug" exact component = { ProductDetail } />
            <Route path = "/checkout" exact component = { Checkout } />
            <Route path = "/basket" exact component = { Basket } />
            <Route path = "/" exact component = { Home } /> 
            <Route path = "" exact component = { ErrorPage }/> 
            { /* add redirect for first page */ } 
            <Redirect from = "*" to = "/" / >
        </Switch> 
    </BrowserRouter>,
    document.getElementById("root")
);