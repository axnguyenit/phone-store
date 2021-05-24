import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Header/NavBar';
const API_USERS_URL = `http://localhost:4000/api/users`;

const ForgotPassword = () => {
    const [users, setUsers] = useState()
    const [email, setEmail] = useState();
    const [code, setCode] = useState(0);
    const [errorText, setErrorText] = useState('');

    const fetchUsers = () => {
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

    const handleForgotPassword = e => {
        e.preventDefault();

        const user = users.find(user => user.email === email);

        if(user) {
            //update code verify in user account & go to send password reset OTP to user's email 
        }
        else {
            //display error message that user's email is not already exist.
            setErrorText('Email that you have entered is not already exist! ');
        }
    }

    useEffect(() => {
        fetchUsers();
        rand();
    }, [])

    return (
        <>
            <NavBar/>
            <main id="main">
                <section className="section cart__area">
                    <div className="container">
                        <div className="responsive__cart-area">
                        <div className="signin__form">
                            <div className="header">
                                <h2>Forgot Password</h2>
                                <p>Enter your email address</p>
                            </div>
                            <form onSubmit={handleForgotPassword} className="wrapper">
                            <div className="input-data">
                                <input type="email" name="to_email" onChange={(e) => { setEmail(e.target.value); setErrorText('');}} required />
                                <div className="underline" />
                                <label>Email address</label>
                                <input value={code} name="code" disabled hidden/>
                            </div>
                            <div className="error-txt">{errorText}</div>
                            <div><button className="btn-signin" type="submit">Continue</button></div>
                            <div className="link">
                                Already a member?
                                <Link to='/sign-in'>
                                    <a href="#">Signin here</a>
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

export default ForgotPassword;