import { render } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../css/styles.css';
// import '../../../public/js/index';

const NavBar = () =>{
    const [quantityOfBasket, setQuantityOfBasket] = useState(0);
    const [isSignIn, setIsSignIn] = useState(true);

    const fetchBaskets = () => {
        if(localStorage.getItem('basket')) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            let quantity = basket.length;
            setQuantityOfBasket(quantity);
        }
    }

    useEffect(() => {
        fetchBaskets();
    })

    return (
        <>
            <div className="navigation">
                <div className="container">
                    <nav className="nav">
                        {/* <a className="nav__hamburger" onClick={setNavMenu}>
                            <svg>
                                <use xlinkHref="./images/sprite.svg#icon-menu" />
                            </svg>
                        </a> */}
                        <div className="nav__logo">
                            <Link to="/" className="scroll-link">
                                PHONE
                            </Link>
                        </div>
                        <div className="nav__menu" >
                            <div className="menu__top">
                                <span className="nav__category">PHONE</span>
                                <a href="#" className="close__toggle">
                                <svg>
                                    <use xlinkHref="./images/sprite.svg#icon-cross" />
                                </svg>
                                </a>
                            </div>
                            {/* <ul className="nav__list">
                                <li className="nav__item">
                                <Link to="/" className="nav__link scroll-link">Home</Link>
                                </li>
                                <li className="nav__item">
                                <a href="#category" className="nav__link scroll-link">Category</a>
                                </li>
                                <li className="nav__item">
                                <a href="#news" className="nav__link scroll-link">Blog</a>
                                </li>
                                <li className="nav__item">
                                <a href="#contact" className="nav__link scroll-link">Contact</a>
                                </li>
                            </ul> */}
                        </div>
                        <div className="nav__icons">
                        <Link to={isSignIn ? "/profile" : "/sign-in"} className="icon__item">
                            <svg className="icon__user">
                            <use xlinkHref="./images/sprite.svg#icon-user" />
                            </svg>
                        </Link>
                        {/* <Link to="/" className="icon__item">
                            <svg className="icon__search">
                            <use xlinkHref="./images/sprite.svg#icon-search" />
                            </svg>
                        </Link> */}
                        <Link to="/basket" className="icon__item">
                            <svg className="icon__cart">
                            <use xlinkHref="./images/sprite.svg#icon-shopping-basket" />
                            </svg>
                            <span id="cart__total">{quantityOfBasket}</span>
                        </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default NavBar;