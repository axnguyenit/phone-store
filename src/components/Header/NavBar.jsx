
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../css/styles.css';
const API_BASKETS_URL = `http://localhost:4000/api/baskets`;
const API_USERS_URL = `http://localhost:4000/api/users`;


const NavBar = () =>{
    const [baskets, setBaskets] = useState();
    const [quantityOfBasket, setQuantityOfBasket] = useState(0);
    const [isSignIn, setIsSignIn] = useState(false);

    const fetchBaskets = () => {
        if(localStorage.getItem('userID')) {
            const userID = JSON.parse(localStorage.getItem('userID'));

            axios.get(API_USERS_URL + '/' + userID + '/' + 'baskets').then( res => {
                console.log(res.data[0].details);
                setBaskets(res.data[0]);
                const basketsUser = res.data;
                if(localStorage.getItem('basket')) {
                    const basketLocal = JSON.parse(localStorage.getItem('basket'));
                    let baskets = basketLocal;
                    if(res.data[0].details) {
                        res.data[0].details.map( basketUser => {
                            basketLocal.map( basket => {
                                if(basket.id === basketUser.id) {
                                    let basketTerm = basket;
                                    basketTerm.quantity = basket.quantity + basketUser.quantity;
                                    basketTerm.total = basketTerm.quantity * basketTerm.unitPrice;
                                    let index = baskets.indexOf(basket);
                                    baskets[index] = basketTerm;
                                }
                                else {
                                    let basketTerm = basketUser;
                                    if(localStorage.getItem('products')) {
                                        const products = JSON.parse(localStorage.getItem('products'));
                                        products.map( product => {
                                            if(product.id === basketTerm.id) {
                                                basketTerm.unitPrice = product.price.raw;
                                                basketTerm.total = basketTerm.quantity * basketTerm.unitPrice;
                                                baskets.push(basketTerm);
                                            }
                                        })
                                    }
                                    // basketTerm.unitPrice = ???
                                    // basketTerm.total = ???
                                }
                            })
                        })
                        let basketTerm = {
                            id: res.data[0].id,
                            userId: res.data[0].userId,
                            details: [],
                        }
                        setBaskets(basketTerm);
                        axios.put(API_BASKETS_URL + '/' + basketTerm.id, basketTerm).then( res => {
                            console.log(res.data);
                        })
                        localStorage.setItem('basket', JSON.stringify(baskets));
                        setQuantityOfBasket(baskets.length);
                    }
                }
                else {
                    // if localStorage don't contain basket => set localStorage = basket in user
                    basketsUser.map( basketUser => {
                        let basketLocal = [];
                        if(localStorage.getItem('products')) {
                            const products = JSON.parse(localStorage.getItem('products'));
                            console.log(products);
                            basketUser.details.map(basket => {
                                products.map(product => {
                                    if(basket.id === product.id) {
                                        let basketTerm = {
                                            id: product.id,
                                            quantity: basket.quantity,
                                            unitPrice: product.price.raw,
                                            total: basket.quantity * product.price.raw
                                        }
                                        basketLocal.push(basketTerm);
                                    }
                                })
                            })
                        }
                        let basket = res.data[0];
                        basket.details = [];
                        setBaskets(basket);
                        axios.put(API_BASKETS_URL + '/' + basket.id, basket).then( res => {
                            console.log(res.data);
                            localStorage.setItem('basket', JSON.stringify(basketLocal));
                            setQuantityOfBasket(basketLocal.length);
                            console.log(basketLocal);
                        })
                    })
                }
            })
            setIsSignIn(true);
        }
        else {
            if(localStorage.getItem('basket')) {
                let basket = JSON.parse(localStorage.getItem('basket'));
                let quantity = basket.length;
                setQuantityOfBasket(quantity);
            }
            setIsSignIn(false);
        }


    }

    useEffect(() => {
        fetchBaskets();
    }, []);

    const signout = () => {
        if(localStorage.getItem('basket')) {
            const basket = JSON.parse(localStorage.getItem('basket'));
            let basketTerm = [];
            basket.map(basket => {
                let basket1 = {
                    id: basket.id,
                    quantity: basket.quantity,
                }
                basketTerm.push(basket1);
            })

            let basket1 = baskets;
            basket1.details = basketTerm;

            axios.put(API_BASKETS_URL + '/' + baskets.id, basket1).then( res => {
                console.log(res.data);
                setIsSignIn(false);
                localStorage.removeItem('userID');
                localStorage.removeItem('basket');
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
                                {/* <li className="nav__item">
                                    <a href="index.html" className="nav__link scroll-link">Home</a>
                                </li>
                                <li className="nav__item">
                                    <a href="#category" className="nav__link scroll-link">Category</a>
                                </li>
                                <li className="nav__item">
                                    <a href="#news" className="nav__link scroll-link">Blog</a>
                                </li> */}
                                <li className="nav__item">
                                    <Link to={isSignIn ? "/profile" : "/sign-in"} className="nav__link scroll-link">
                                        {
                                            isSignIn ? "Account" : "signin"
                                        }
                                    </Link>
                                </li>
                                <li className="nav__item">
                                    {
                                        
                                        isSignIn ? '' : 
                                        <Link to="/sign-up" className="nav__link scroll-link">
                                            Register
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
                                {/* <li className="nav__item">
                                    {
                                        !isSignIn ? <a className="icon__item" >
                                                        <i className="fa fa-sign-out-alt"></i>
                                                    </a> : ''
                                    }
                                </li> */}
                            </ul>
                        <div className="nav__icons">
                            {/* <Link to={isSignIn ? "/profile" : "/sign-in"} className="icon__item">
                                <i className="fa fa-user"></i>
                            </Link> */}
                            
                            {/* <Link to="/basket" className="icon__item">
                                <i class="fas fa-history"></i>
                            </Link> */}
                            {/* <Link to="/basket" className="icon__item">
                                <i class="fas fa-heart"></i>
                            </Link> */}
                            
                        </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default NavBar;