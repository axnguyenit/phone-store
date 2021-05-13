import React from 'react';
import { Banner } from './Banner';
import { NavBar } from './NavBar';
// import './style.css';
// import './index';


export const Header = () => {
    return (
        <>
            <header id="header" className="header">
                <NavBar/>
                <Banner/>
            </header>
        </>
    )
}
