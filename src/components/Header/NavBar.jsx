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
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const to_slug = (str) => {
        str = str.toLowerCase();
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');
        str = str.replace(/([^0-9a-z-\s])/g, '');
        str = str.replace(/(\s+)/g, '-');
        str = str.replace(/^-+/g, '');
        str = str.replace(/-+$/g, '');
        return str;
    }

    const fetchQuantityOfBasket = () => {
        if(localStorage.getItem('products')) {
            const products = JSON.parse(localStorage.getItem('products'));
            setProducts(products);
        }
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
        setInterval(()=> {
            fetchQuantityOfBasket();
        }, 1000)
    }, []);

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

                            <div className="search__bar">
                                <input type="checkbox" id="checkbox__search" hidden/>
                                <input type="text" value={searchTerm} placeholder="Search here..." onChange={e => setSearchTerm(e.target.value)}/>
                                <label htmlFor="checkbox__search">
                                    <i class="fas fa-search"></i>
                                </label>
                                <div className="search__content">
                                    <ul>
                                        {
                                            products.filter(product => {
                                                if(searchTerm === '') {
                                                    return product;
                                                }
                                                else if(product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                    return product;
                                                }
                                            }).map((product, index) => {
                                                    return <li key={index}>
                                                                <Link to={"detail" + "/" + product.id + "/" + to_slug(product.name)} className="search__item">
                                                                    <img src={product.media.source} alt="product" />
                                                                    <span>
                                                                        <h4>{product.name}</h4>
                                                                        <h4>{product.price.formatted_with_symbol}</h4>
                                                                    </span>
                    
                                                                </Link>
                                                            </li>
                                            })
                                        }
                                    </ul>
                                </div>

                            </div>

                            <div className="nav__logo">
                                <ul className="nav__list">
                                    <li className="nav__item nav__user">
                                        <a className="icon__item icon__user">
                                            <i class="fas fa-user"></i>
                                        </a>
                                        <ul className="nav__dropdown">
                                        {
                                        !isSignIn ? '' :
                                            <li className="nav__item">
                                                <Link to="/profile" className="nav__link scroll-link">
                                                    Account
                                                </Link>
                                                
                                            </li>
                                            }
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
                                        
                                    </li>
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