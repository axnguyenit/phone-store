import React from 'react';
import Profile from '../../components/Account/Profile';
import { Cart } from '../../components/Cart';
import { Facility } from "../../components/Facility";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/Header/NavBar";

export const Basket = () => {
    return (
        <>
            <header id="header" className="header">
                <NavBar/>
            </header>
            <main id="main">
                <Cart />
                <Facility/>
            </ main>
            <Footer/>
        </>
    )
}


