import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NavBar from '../Header/NavBar';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
toast.configure();

const API_USERS_URL = `http://localhost:4000/api/users`;
const API_BASKETS_URL = `http://localhost:4000/api/baskets`;

const Login = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        email: '',
        name: '',
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [code, setCode] = useState(0);

    const fetchUsers = async() => {
        axios.get(API_USERS_URL).then( res => {
            setUsers(res.data);
        })
    }

    const rand = () => {
        const min = 111111;
        const max = 999999;
        const rand = min + Math.random() * (max - min);
        setCode(Math.round(rand));
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
                                        isCheck: itemBasketUser.isCheck,
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
                                                isCheck: itemBasketUser.isCheck,
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
                                            isCheck: itemBasketUser.isCheck,
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
        fetchUsers();
        fetchBasket();
        rand();
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('default_service', 'template_yomost', e.target, `user_eGZkjyOWcdrxHJK1InigS`)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    const login = (e) => {
        e.preventDefault();
        const userValid = users.find( user => user.email === email 
                                        && user.password === password);
        if(userValid) {
            setUser(userValid);
            if(!userValid.status) {
                confirmAlert({
                    title: 'Your account is not verified!',
                    message: 'Go to verify user.',
                    buttons: [
                      {
                        label: 'Verify',
                        onClick: () => {
                            userValid.code = code;
                            axios.put(API_USERS_URL + `/${userValid.id}`, userValid).then(() => {
                                sendEmail(e);
                                localStorage.setItem('verifyUser', JSON.stringify(userValid.id));
                                history.replace('/code-verification');
                            })
                        }
                      },
                      {
                        label: 'Cancel'
                      }
                    ]
                  });
                //show modal to confirm go to verify form and save verifyUser to localStorage with user ID
            }
            else if(!user.active) {
                setErrorText('Your account has been locked!')
            }
            else {
                localStorage.setItem('userID', user.id);
                fetchBasket();
                history.replace('/');
            }
        }
        else {
            setErrorText('Email or password is incorrect!');
        }
    }

    return (
        <>
            <NavBar/>
            <main id="main">
                <section className="section cart__area">
                    <div className="container">
                        <div className="responsive__cart-area">
                        <div className="signin__form" onSubmit={(e) => login(e)}>
                            <div className="header">
                                <h2>Login</h2>
                                <p>Sign in with your email address and password</p>
                            </div>
                            <form className="wrapper">
                            <div className="input-data">
                                <input type="email" required onChange={(e) => {setEmail(e.target.value); setErrorText('');}}/>
                                <div className="underline"/>
                                <label>Email address</label>
                            </div>
                            <div className="input-data">
                                <input type="password" required onChange={(e) => {setPassword(e.target.value); setErrorText('');}}/>
                                <div className="underline" />
                                <label>Password</label>
                            </div>
                            <div className="error-txt">{errorText}</div>
                            <Link to="/forgot-password">
                                <a href="#">Forgot password?</a>
                            </Link>
                            <input value={user.email} name="to_email" hidden/>
                            <input value={user.name} name="to_name" hidden/>
                            <input value={code} name="code" hidden/>
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

export default Login;
