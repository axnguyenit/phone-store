import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../Header/NavBar';
const API_USERS_URL = `http://localhost:4000/api/users`;

const ResetPassword = () => {
    const history = useHistory();
    const [users, setUsers] = useState();
    const [password, setPassword] = useState();
    const [cfPassword, setCfPassword] = useState();
    const [errorText, setErrorText] = useState('');

    const fetchUsers = () => {
        axios.get(API_USERS_URL).then( res => {
            setUsers(res.data);
        })
    }

    const checkUserIDSetPass = () => {
        if(!localStorage.getItem('userIDSetPass')) {
            history.goBack();
        }
    }

    const handleResetPass = (e) => {
        e.preventDefault();
        if(localStorage.getItem('userIDSetPass')) {
            const userIDSetPass = JSON.parse(localStorage.getItem('userIDSetPass'));

            const user = users.find(user => user.id === userIDSetPass);

            if(user) {
                if(password === cfPassword) {
                    let userTerm = user;
                    userTerm.password = password;
                    axios.put(API_USERS_URL + '/' + userIDSetPass, userTerm).then( res => {
                        localStorage.removeItem('userIDSetPass');
                        history.replace('/login');
                    })
                }
                else {
                    setErrorText('Confirm password not matched! Try again.');
                }
            }
        }
    }

    useEffect(() => {
        checkUserIDSetPass();
        fetchUsers();
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
                                <h2>New Password</h2>
                                <p>Create new password</p>
                            </div>
                            <form className="wrapper" onSubmit={handleResetPass}>
                            <div className="input-data">
                                <input type="password" onChange={ e => {setPassword(e.target.value); setErrorText('');}} required />
                                <div className="underline" />
                                <label>New password</label>
                            </div>
                            <div className="input-data">
                                <input type="password" onChange={ e => {setCfPassword(e.target.value); setErrorText('');}} required />
                                <div className="underline" />
                                <label>Confirm password</label>
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

export default ResetPassword;
