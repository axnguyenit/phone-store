import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import NavBar from '../Header/NavBar';
const API_USERS_URL = `http://localhost:4000/api/users`;

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
                setCode(parseInt(code))
                console.log(typeof code);
                console.log(typeof res.data.code);

                if(code === res.data.code) {
                    let userTerm = res.data;
                    userTerm.active = true;
                    userTerm.code = 0;
                    userTerm.status = true;

                    axios.put(API_USERS_URL + '/' + userLocal, userTerm).then( res => {
                        console.log(res.data);
                        localStorage.removeItem('verifyUser');
                        localStorage.setItem('userID', JSON.stringify(res.data.id));
                        history.replace('/');
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

export default CodeVerification;
