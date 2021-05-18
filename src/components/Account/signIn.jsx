import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NavBar from '../Header/NavBar';
import { useHistory } from 'react-router';

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
        console.log(users);
        const user = users.find( user => user.email === email 
                                        && user.password === password);
        console.log(user);
        if(user) {
            localStorage.setItem('userAccessToken', user.id);
            setErrorText('');
            history.replace('/');
        }
        else {
            setErrorText('Email or password incorrect! Try again.');
        }
        console.log(email);
        console.log(password);
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
                                <input type="text" required onChange={(e) => setEmail(e.target.value)}/>
                                <div className="underline" />
                                <label>Email address</label>
                            </div>
                            <div className="input-data">
                                <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
                                <div className="underline" />
                                <label>Password</label>
                            </div>
                            <div className="error-txt">{errorText}</div>
                            <a href="#">Forgot password?</a>
                            <div><button className="btn-signin" type="submit">Signin</button></div>
                            <div className="link">Not yet a member? <a href="#">Signup now</a></div>
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
