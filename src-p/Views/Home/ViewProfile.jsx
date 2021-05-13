import React from 'react';
import Profile from '../../components/Account/Profile';
import { Cart } from '../../components/Cart';
import { Facility } from "../../components/Facility";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/Header/NavBar";

const ViewProfile = () => {
    return (
        <>
            <header id="header" className="header">
                <NavBar/>
            </header>
            <main id="main">
                <Profile />
                <Facility/>
            </ main>
            <Footer/>
        </>
    )
}

export default ViewProfile;
