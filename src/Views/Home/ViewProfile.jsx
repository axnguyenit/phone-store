import React from 'react';
const NavBar = React.lazy(() => import('../../components/Header/NavBar'));
const Profile = React.lazy(() => import('../../components/Account/Profile'));
const Facility = React.lazy(() => import('../../components/Facility'));
const Footer = React.lazy(() => import('../../components/Footer'));

const ViewProfile = () => {
    return (
        <>
            <header id="header" className="header">
                <NavBar/>
            </header>
            {/* <main id="main"> */}
                <Profile />
                <Facility/>
            {/* </ main> */}
            <Footer/>
        </>
    )
}

export default ViewProfile;