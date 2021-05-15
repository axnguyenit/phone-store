import React from 'react';
import Banner from './Banner';
import NavBar from './NavBar';

import '../../css/aos.css';
import '../../css/glide.css';
import '../../css/glidetheme.css';
import '../../css/styles.css';

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
