
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../css/styles.css';
const API_BASKETS_URL = `http://localhost:4000/api/baskets`;
const API_USERS_URL = `http://localhost:4000/api/users`;


const NavBar = () =>{
    const history = useHistory();
    const [quantityOfBasket, setQuantityOfBasket] = useState(0);
    const [isSignIn, setIsSignIn] = useState(false);
    const [userID, setUserID] = useState();

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
        // fetchBasket();
        fetchQuantityOfBasket();
    });

    const signout = () => {
        if(localStorage.getItem('basket')) {
            const basket = JSON.parse(localStorage.getItem('basket'));
            let basketTerm = [];
            basket.map(itemBasket => {
                let item = {
                    id: itemBasket.id,
                    quantity: itemBasket.quantity,
                }
                basketTerm.push(item);
            })

            axios.get(API_USERS_URL + '/' + userID + '/baskets').then( res => {
                let basket = res.data[0];
                basket.details = basketTerm;
    
                axios.put(API_BASKETS_URL + '/' + basket.id, basket).then( res => {
                    console.log(res.data);
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
            <div className="navigation">
                <div className="container">
                    <nav className="nav">
                        <div className="nav__logo">
                            <Link to="/" className="scroll-link">
                                LOGO PHONE
                            </Link>
                        </div>
                        <div className="nav__logo">
                            <ul className="nav__list">
                                <li className="nav__item">
                                    <Link to={isSignIn ? "/profile" : "/login"} className="nav__link scroll-link">
                                        {
                                            isSignIn ? "Orders" : "login"
                                        }
                                    </Link>
                                </li>
                                <li className="nav__item">
                                    {
                                        <Link to={isSignIn ? "/wish-list" : "/register"} className="nav__link scroll-link">
                                            { 
                                                isSignIn ? "Wish" : "Register"
                                            }
                                        </Link>
                                    }
                                </li>
                                <li className="nav__item">
                                    {
                                        !isSignIn ? '' : 
                                        <Link className="nav__link scroll-link" onClick={() => signout()}>
                                            Signout
                                        </Link>
                                    }
                                </li>
                                <li className="nav__item">
                                    <Link to="/basket" className="icon__item">
                                        <i className="fa fa-shopping-cart shopping-cart">
                                            <span id="cart__total">{quantityOfBasket}</span>
                                        </i>    
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default NavBar;