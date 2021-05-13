import React from 'react';
import { Link } from 'react-router-dom';


export const NavBar = () => {
    return (
        <>
            <div className="navigation">
                <div className="container">
                    <nav className="nav">
                        <div className="nav__hamburger">
                        <svg>
                            <use xlinkHref="./images/sprite.svg#icon-menu" />
                        </svg>
                        </div>
                        <div className="nav__logo">
                        <Link to="/" className="scroll-link">
                            PHONE
                        </Link>
                        </div>
                        <div className="nav__menu">
                        <div className="menu__top">
                            <span className="nav__category">PHONE</span>
                            <a href="#" className="close__toggle">
                            <svg>
                                <use xlinkHref="./images/sprite.svg#icon-cross" />
                            </svg>
                            </a>
                        </div>
                        <ul className="nav__list">
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
                        </ul>
                        </div>
                        <div className="nav__icons">
                        <Link to="/profile" className="icon__item">
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
                            <span id="cart__total">0</span>
                        </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
