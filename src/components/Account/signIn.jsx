import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NavBar from '../Header/NavBar';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const API_USERS_URL = `http://localhost:4000/api/users`;
const API_BASKETS_URL = `http://localhost:4000/api/baskets`;

const SignIn = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fetchUsers = async() => {
        axios.get(API_USERS_URL).then( res => {
            setUsers(res.data);
        })
    }

    const fetchBasket = () => {
        // localStorage contain userID
        if(localStorage.getItem('userID')) {
            const userID = JSON.parse(localStorage.getItem('userID'));

            axios.get(API_USERS_URL + '/' + userID + '/baskets').then( res => {
                let basketUser = res.data[0].details;

                // localStorage contain basket
                if(localStorage.getItem('basket')) {
                    let basketLocal = JSON.parse(localStorage.getItem('basket'));
                    let basket = [];

                    if(basketUser.length > 0) {
                        basketUser.map(itemBasketUser => {
                            basketLocal.map(itemBasketLocal => {
                                if(itemBasketUser.id === itemBasketLocal.id) {
                                    // set quantity, total & remove item basket user, local
                                    let item = {
                                        id: itemBasketLocal.id,
                                        quantity: itemBasketLocal.quantity + itemBasketUser.quantity,
                                        unitPrice: itemBasketLocal.unitPrice,
                                        total: (itemBasketLocal.quantity + itemBasketUser.quantity) * itemBasketLocal.unitPrice,
                                    }

                                    basket.push(item);
                                    
                                    let indexItemLocal = basketLocal.indexOf(itemBasketLocal);
                                    basketLocal.splice(indexItemLocal, 1);
                                    
                                    let indexItemUser = basketUser.indexOf(itemBasketUser);
                                    basketUser.splice(indexItemUser, 1);
                                }
                            })
                        })

                        if(basketUser.length > 0) {
                            if(localStorage.getItem('products')) {
                                let products = JSON.parse(localStorage.getItem('products'));
                                products.map(product => {
                                    basketUser.map(itemBasketUser => {
                                        if(product.id === itemBasketUser.id) {
                                            let item = {
                                                id: itemBasketUser.id,
                                                quantity: itemBasketUser.quantity,
                                                unitPrice: product.price.raw,
                                                total: itemBasketUser.quantity * product.price.raw,
                                            }
                                            basket.push(item);
                                        }
                                    })
                                })
                            }
                        }

                        if(basketLocal.length > 0) {
                            basketLocal.map(itemBasketLocal => {
                                basket.push(itemBasketLocal);
                            })
                        }
                        let basketTerm = res.data[0];
                        basketTerm.details = [];
                        axios.put(API_BASKETS_URL + '/' + basketTerm.id, basketTerm).then( res => {
                            // update basket User;
                            localStorage.setItem('basket', JSON.stringify(basket));
                        })
                    }
                    else {
                        let basket = JSON.parse(localStorage.getItem('basket'));
                    }
                }
                // localStorage don't contain basket
                else {
                    let basket = [];
                    if(basketUser.length > 0) {
                        if(localStorage.getItem('products')) {
                            let products = JSON.parse(localStorage.getItem('products'));
                            products.map(product => {
                                basketUser.map(itemBasketUser => {
                                    if(product.id === itemBasketUser.id) {
                                        let item = {
                                            id: itemBasketUser.id,
                                            quantity: itemBasketUser.quantity,
                                            unitPrice: product.price.raw,
                                            total: itemBasketUser.quantity * product.price.raw,
                                        }
                                        basket.push(item);
                                    }
                                })
                            })
                            let basketTerm = res.data[0];
                            basketTerm.details = [];
                            axios.put(API_BASKETS_URL + '/' + basketTerm.id, basketTerm).then( res => {
                                // update basket User;
                                localStorage.setItem('basket', JSON.stringify(basket));
                            })
                        }
                    }
                }
            })
        }
    }

    useEffect(() => {
        fetchBasket();
    });

    const signin = (e) => {
        e.preventDefault();
        const user = users.find( user => user.email === email 
                                        && user.password === password);
        if(user) {
            if(!user.status) {
                toast.error('Your account is not verified!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                //show modal to confirm go to verify form and save verifyUser to localStorage with user ID
            }
            else if(!user.active) {
                toast.error('Your account has been locked!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                localStorage.setItem('userID', user.id);
                toast.success('Login successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                fetchBasket();
                history.replace('/');
            }
        }
        else {
            toast.error('Email or password incorrect!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <NavBar/>
            <main id="main">
                <section className="section cart__area">
                    <div className="container">
                        <div className="responsive__cart-area">
                        <div className="signin__form" onSubmit={(e) => signin(e)}>
                            <div className="header">
                                <h2>Login</h2>
                                <p>Sign in with your email address and password</p>
                            </div>
                            <form className="wrapper">
                            <div className="input-data">
                                <input type="email" required onChange={(e) => setEmail(e.target.value)}/>
                                <div className="underline" />
                                <label>Email address</label>
                            </div>
                            <div className="input-data">
                                <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
                                <div className="underline" />
                                <label>Password</label>
                            </div>
                            <Link to="/forgot-password">
                                <a href="#">Forgot password?</a>
                            </Link>
                            <div><button className="btn-signin" type="submit"> Login</button></div>
                            <div className="link">
                                Not yet a member?
                                &nbsp;
                                <Link to="/register">
                                    <a href="#"> Register now</a>
                                </Link>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default SignIn;
