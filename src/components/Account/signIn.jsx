import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NavBar from '../Header/NavBar';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const API_USERS_URL = `http://localhost:4000/api/users`;

const SignIn = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const fetchUsers = async() => {
        axios.get(API_USERS_URL).then( res => {
            setUsers(res.data);
        })
    }

    const signin = (e) => {
        e.preventDefault();
        const user = users.find( user => user.email === email 
                                        && user.password === password);
        if(user) {
            if(!user.status) {
                setErrorText('Your account is not verified!');
                //show modal to confirm go to verify form and save verifyUser to localStorage with user ID
            }
            else if(!user.active) {
                setErrorText('Your account has been locked!');
            }
            else {
                localStorage.setItem('userID', user.id);
                setErrorText('');
                history.goBack();
            }
        }
        else {
            setErrorText('Email or password incorrect! Try again.');
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
                                <h2>Sign In</h2>
                                <p>Sign in with your email address and password</p>
                            </div>
                            <form className="wrapper">
                            <div className="input-data">
                                <input type="email" required onChange={(e) => { setEmail(e.target.value); setErrorText(''); }}/>
                                <div className="underline" />
                                <label>Email address</label>
                            </div>
                            <div className="input-data">
                                <input type="password" required onChange={(e) => { setPassword(e.target.value); setErrorText(''); }}/>
                                <div className="underline" />
                                <label>Password</label>
                            </div>
                            <div className="error-txt">{errorText}</div>
                            <Link to="/forgot-password">
                                <a href="#">Forgot password?</a>
                            </Link>
                            <div><button className="btn-signin" type="submit"> Signin</button></div>
                            <div className="link">
                                Not yet a member?
                                &nbsp;
                                <Link to="/sign-up">
                                    <a href="#"> Signup now</a>
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
