import React from 'react';

// import NavBar from '../../components/Header/NavBar';
// import {Cart} from '../../components/Cart';
// import {Facility} from '../../components/Facility';
// import {Footer} from '../../components/Footer';

const NavBar = React.lazy(() => import('../../components/Header/NavBar'));
const Cart = React.lazy(() => import('../../components/Cart'));
const Facility = React.lazy(() => import('../../components/Facility'));
const Footer = React.lazy(() => import('../../components/Footer'));

const Basket = () => {
    return (
        <>
            <header id="header" className="header">
                <NavBar/>
            </header>
            <main id="main">
                <Cart/>
                <Facility/>
            </ main>
            <Footer/>
        </>
    )
}

export default Basket;