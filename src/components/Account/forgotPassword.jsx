import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import emailjs from 'emailjs-com';
import NavBar from '../Header/NavBar';
const API_USERS_URL = `http://localhost:4000/api/users`;

const ForgotPassword = () => {
    const [users, setUsers] = useState();
    const [email, setEmail] = useState();
    const [code, setCode] = useState(0);
    const [name, setName] = useState();
    const [errorText, setErrorText] = useState('');
    const history = useHistory();

    const fetchUsers = () => {
        axios.get(API_USERS_URL).then( res => {
            setUsers(res.data);
        })
    }

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(e);
    
        emailjs.sendForm('default_service', 'template_yomost', e.target, `user_eGZkjyOWcdrxHJK1InigS`)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
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
            setName(user.name);
            let userTerm = user;
            userTerm.code = code;

            axios.put(API_USERS_URL + '/' + user.id, userTerm).then( res => {
                console.log(res.data);
                sendEmail(e);
                localStorage.setItem('userIDForgot', JSON.stringify(user.id));
                history.replace('/code-verification');
            });
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

                                <input value={name} name="to_name" hidden/>
                                <input value={code} name="code" hidden/>
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

export default ForgotPassword;