import { render } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../css/styles.css';

const NavBar = () =>{
    
    const [quantityOfBasket, setQuantityOfBasket] = useState(0);
    const [isSignIn, setIsSignIn] = useState(false);

    const fetchBaskets = () => {
        if(localStorage.getItem('basket')) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            let quantity = basket.length;
            setQuantityOfBasket(quantity);
        }
        if(localStorage.getItem('userID')) {
            setIsSignIn(true);
        }
        else {
            setIsSignIn(false);
        }
    }

    useEffect(() => {
        fetchBaskets();
    })

    const signout = () => {
        setIsSignIn(false);
        localStorage.removeItem('userID');
    }

    return (
        <>
            <div className="navigation">
                <div className="container">
                    <nav className="nav">
                        <div className="nav__logo">
                            <Link to="/" className="scroll-link">
                                PHONE
                            </Link>
                        </div>
                        <div className="nav__icons">
                            <Link to={isSignIn ? "/profile" : "/sign-in"} className="icon__item">
                                <i className="fa fa-user"></i>
                            </Link>
                            <Link to="/basket" className="icon__item">
                                <i className="fa fa-shopping-cart shopping-cart">
                                    <span id="cart__total">{quantityOfBasket}</span>
                                </i>
                            </Link>
                            <Link to="/basket" className="icon__item">
                                <i class="fas fa-history"></i>
                            </Link>
                            <Link to="/basket" className="icon__item">
                                <i class="fas fa-heart"></i>
                            </Link>
                            {
                                isSignIn ? <a className="icon__item" onClick={() => signout()}>
                                                <i className="fa fa-sign-out-alt"></i>
                                            </a> : ''
                            }
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default NavBar;