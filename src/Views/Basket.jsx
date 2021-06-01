import React, {useState, useEffect} from 'react';
import NavBar from "../components/Header/NavBar";
import Contact from "../components/Contact";
import Facility from '../components/Facility';
import Footer from '../components/Footer';
import Cart from '../components/Cart';


const Basket = () => {
    return (
        <>
            <NavBar/>
            <Cart/>
            <Facility/>
            <Contact/>
            <Footer/>
        </>
    )
}

export default Basket;