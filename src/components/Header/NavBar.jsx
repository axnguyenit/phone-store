import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../css/styles.css';

const API_BASKETS_URL = `http://localhost:4000/api/baskets`;
const API_USERS_URL = `http://localhost:4000/api/users`;

const NavBar = () =>{
    const history = useHistory();
    const [quantityOfBasket, setQuantityOfBasket] = useState(0);
    const [isSignIn, setIsSignIn] = useState(false);
    const [userID, setUserID] = useState();
    
    const [timeString, setTimeString] = useState();
    const intervalVal = useRef(null);

    const fetchQuantityOfBasket = () => {
        if(localStorage.getItem('basket')) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            setQuantityOfBasket(basket.length);
        }
        else {
            setQuantityOfBasket(0);
        }
        if(localStorage.getItem('userID')) {
            const userID = JSON.parse(localStorage.getItem('userID'));
            setUserID(userID);
            setIsSignIn(true);
        }
    };

    useEffect(() => {
        fetchQuantityOfBasket();
    });

    const logout = () => {
        if(localStorage.getItem('basket')) {
            const basket = JSON.parse(localStorage.getItem('basket'));
            let basketTerm = [];
            basket.map(itemBasket => {
                let item = {
                    id: itemBasket.id,
                    quantity: itemBasket.quantity,
                    isCheck: itemBasket.isCheck,
                }
                basketTerm.push(item);
            })

            axios.get(API_USERS_URL + '/' + userID + '/baskets').then( res => {
                let basket = res.data[0];
                basket.details = basketTerm;
    
                axios.put(API_BASKETS_URL + '/' + basket.id, basket).then( res => {
                    localStorage.removeItem('userID');
                    localStorage.removeItem('basket');
                    setIsSignIn(false);
                    history.replace('/login');
                })
            })
        }
        else {
            localStorage.removeItem('userID');
            setIsSignIn(false);
        }
    }

    return (
        <>
            <header id="header" className="header">
                <div className="navigation">
                    <div className="container">
                        <nav className="nav">
                            <div className="nav__logo">
                                <Link to="/" className="scroll-link">
                                    PHONE
                                </Link>
                            </div>
                            <div className="nav__logo">
                                <ul className="nav__list">
                                    {
                                        !isSignIn ? '' : 
                                            <li className="nav__item">
                                                <Link to="/profile" className="nav__link scroll-link">
                                                    Account
                                                </Link>
                                                <div className="underline" />
                                            </li>
                                    }
                                    <li className="nav__item">
                                        <Link to={isSignIn ? "/orders" : "/login"} className="nav__link scroll-link">
                                            {
                                                isSignIn ? "Orders" : "login"
                                            }
                                        </Link>
                                        <div className="underline" />
                                    </li>
                                        {
                                    <li className="nav__item">
                                            <Link to={isSignIn ? "/wishlist" : "/register"} className="nav__link scroll-link">
                                                { 
                                                    isSignIn ? "Wishlist" : "Register"
                                                }
                                            </Link>
                                            <div className="underline" />
                                    </li>
                                        }
                                    {
                                        !isSignIn ? '' : 
                                            <li className="nav__item">
                                                <Link className="nav__link scroll-link" onClick={() => logout()}>
                                                    Logout
                                                </Link>
                                                <div className="underline" />
                                            </li>
                                    }
                                    <li className="nav__item">
                                        <Link to="/basket" className="icon__item">
                                            <i className="fa fa-shopping-cart shopping-cart">
                                                <span id="cart__total">{quantityOfBasket}</span>
                                            </i>    
                                        </Link>
                                    </li>
                                </ul>
                                <div className="nav__bars">
                                    <label htmlFor="nav__mobile-check">
                                        <i class="fas fa-bars"/>
                                    </label>
                                </div>

                                <input type="checkbox" id="nav__mobile-check" hidden/>

                                <label htmlFor="nav__mobile-check" className="nav__overlay"></label>
                                <ul className="nav__mobile">
                                    <label htmlFor="nav__mobile-check" className="nav__mobile-close">
                                        <i class="fas fa-times"></i>
                                    </label>
                                
                                    {
                                        !isSignIn ? '' : 
                                            <li className="nav__item">
                                                <Link to="/profile" className="nav__link scroll-link">
                                                    Account
                                                </Link>
                                            </li>
                                    }
                                    <li className="nav__item">
                                            <Link to="/basket" className="nav__link scroll-link">
                                                Basket ({quantityOfBasket})
                                            </Link>
                                    </li>
                                    <li className="nav__item">
                                        <Link to={isSignIn ? "/orders" : "/login"} className="nav__link scroll-link">
                                            {
                                                isSignIn ? "Orders" : "login"
                                            }
                                        </Link>
                                    </li>
                                        {
                                    <li className="nav__item">
                                            <Link to={isSignIn ? "/wishlist" : "/register"} className="nav__link scroll-link">
                                                { 
                                                    isSignIn ? "Wishlist" : "Register"
                                                }
                                            </Link>
                                    </li>
                                        }
                                    {
                                        !isSignIn ? '' : 
                                            <li className="nav__item">
                                                <Link className="nav__link scroll-link" onClick={() => logout()}>
                                                    Logout
                                                </Link>
                                            </li>
                                    }
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default NavBar;