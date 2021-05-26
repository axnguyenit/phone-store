import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import NavBar from '../Header/NavBar';
const API_USERS_URL = `http://localhost:4000/api/users`;
const API_BASKETS_URL = `http://localhost:4000/api/baskets`;

const CodeVerification = () => {
    const [errorText, setErrorText] = useState('');
    const [code, setCode] = useState(0);
    const history = useHistory();

    const handleVerifyCode = (e) => {
        e.preventDefault();
        if(localStorage.getItem('verifyUser')) {
            const userLocal = JSON.parse(localStorage.getItem('verifyUser'));

            axios.get(API_USERS_URL + '/' + userLocal).then( res => {
                console.log(res.data);
                // setCode(code);
                // console.log(typeof code);
                // console.log(typeof res.data.code);

                if(code === res.data.code) {
                    let userTerm = res.data;
                    userTerm.active = true;
                    userTerm.code = 0;
                    userTerm.status = true;

                    axios.put(API_USERS_URL + '/' + userLocal, userTerm).then( res => {
                        console.log(res.data);
                        localStorage.removeItem('verifyUser');
                        localStorage.setItem('userID', JSON.stringify(res.data.id));
                        let newBasket = {
                            userId: userLocal,
                            details: [],
                        }
                        axios.post(API_BASKETS_URL, newBasket);
                        history.replace('/');
                    })
                }
                else {
                    setErrorText('Code verify is invalid!');
                }
            })
        }
        else if(localStorage.getItem('userIDForgot')) {
            const userIDForgot = JSON.parse(localStorage.getItem('userIDForgot'));

            axios.get(API_USERS_URL + '/' + userIDForgot).then( res => {
                console.log(res.data);

                if(code === res.data.code) {
                    let userTerm = res.data;
                    userTerm.code = 0;
                    axios.put(API_USERS_URL + '/' + userIDForgot, userTerm).then( res => {
                        console.log(res.data);
                        localStorage.removeItem('userIDForgot');
                        localStorage.setItem('userIDSetPass', JSON.stringify(res.data.id));
                        history.replace('/reset-password');
                    })
                }
                else {
                    setErrorText('Code verify is invalid!');
                }
            })
        }
        else {
            //toast a message to notice that something went wrong! Please try again.
        }
    }

    return (
        <>
            <NavBar/>
            <main id="main">
                <section className="section cart__area">
                    <div className="container">
                        <div className="responsive__cart-area">
                        <div className="signin__form">
                            <div className="header">
                                <h2>Code Verification</h2>
                                <p>A OTP code is sent to your email</p>
                            </div>
                            <form className="wrapper" onSubmit={handleVerifyCode}>
                            <div className="input-data">
                                <input type="text" required onChange={(e) => {setCode(parseInt(e.target.value)); setErrorText('')}}/>
                                <div className="underline" />
                                <label>OTP</label>
                            </div>
                            <div className="error-txt">{errorText}</div>
                            <div><button className="btn-signin" type="submit">Continue</button></div>
                            <div className="link">
                                Already a member? 
                                &nbsp;
                                <Link to='/login'>
                                    <a href="#">Login here</a>
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

export default CodeVerification;
