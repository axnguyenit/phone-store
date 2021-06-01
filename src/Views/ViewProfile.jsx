import React from 'react';
import NavBar from '../components/Header/NavBar';
import Profile from '../components/Account/Profile';
import Contact from "../components/Contact";
import Facility from '../components/Facility';
import Footer from '../components/Footer';
const ViewProfile = () => {
    return (
        <>
            <NavBar/>
            <Profile/>
            <Facility/>
            <Contact/>
            <Footer/>
        </>
    )
}

export default ViewProfile;