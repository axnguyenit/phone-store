import React from 'react';
import Banner from './Banner';
import NavBar from './NavBar';

import '../../css/glide.css';
import '../../css/styles.css';

const Header = () => {
    return (
        <header id="header" className="header">
            <NavBar/>
            <Banner/>
        </header>
    )
}

export default Header;