import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import NavBar from '../Header/NavBar';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_USERS_URL = `http://localhost:4000/api/users`;

// field send mail: to_name, to_email, code
const SignUp = () => {
    const history = useHistory();
    const [code, setCode] = useState(0);
    const [to_name, setName] = useState();
    const [to_email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cfpassword, setCfpassword] = useState();
    const [errorText, setErrorText] = useState('');
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await axios.get(API_USERS_URL);
        setUsers(res.data);
    }

    const sendEmail = (e) => {
        e.preventDefault();
    
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

    const handleSignup = (e) => {
        e.preventDefault();

        //check confirm password match?
        if(password != cfpassword) {
            setErrorText('Confirm password not matched! Try again.');
        }
        else {
            let checkUser = false;
            // check user's status
            users.find(user => {
                if(user.email === to_email && !user.status) {
                    checkUser = true;
                    const userUpdate = {
                        name: to_name,
                        email: to_email,
                        password: password,
                        phone: '',
                        address: '',
                        active: false,
                        code: code,
                        status: false,
                        role: 'user',
                    };
                    console.log("1");
                    
                    // call send mail function here and update code
                    axios.put(API_USERS_URL + '/' + user.id, userUpdate).then( res => {
                        sendEmail(e);
                        localStorage.setItem('verifyUser', JSON.stringify(user.id));
                        history.replace('/code-verification');
                    });
                }
                if(user.email === to_email && user.status) {
                    checkUser = true;
                    setErrorText('Email that you have entered is already exist!');
                }
            })
            if(!checkUser) {
                const user = {
                    name: to_name,
                    email: to_email,
                    password: password,
                    phone: '',
                    address: '',
                    active: false,
                    code: code,
                    status: false,
                    role: 'user',
                }
                console.log("2");
                axios.post(API_USERS_URL, user).then( res => {
                    console.log(res.data);
                    sendEmail(e);
                    localStorage.setItem('verifyUser', JSON.stringify(res.data.id));
                    history.replace('/code-verification');
                })
            }
        }
    }

    useEffect(() => {
        fetchUsers();
        rand();
    }, []);

    return (
        <>
            <NavBar/>
            <main id="main">
                <section className="section cart__area">
                    <div className="container">
                        <div className="responsive__cart-area">
                            <div className="signin__form">
                                <div className="header">
                                    <h2>Register</h2>
                                    <p>Sign up with your information</p>
                                </div>
                                <form className="wrapper" onSubmit={handleSignup}>
                                    <div className="input-data">
                                        <input type="text" name="to_name" onChange={e => { setName(e.target.value); setErrorText(''); }} required />
                                        <div className="underline" />
                                        <label>Fullname</label>
                                    </div>
                                    <div className="input-data">
                                        <input type="email" name="to_email" onChange={e => { setEmail(e.target.value); setErrorText(''); }} required />
                                        <div className="underline" />
                                        <label>Email address</label>
                                    </div>
                                    <div className="input-data">
                                        <input type="password" name="password" onChange={e => { setPassword(e.target.value); setErrorText(''); }} required />
                                        <div className="underline" />
                                        <label>Password</label>
                                    </div>
                                    <div className="input-data">
                                        <input type="password" name="cfpassword" onChange={e => { setCfpassword(e.target.value); setErrorText(''); }} required />
                                        <div className="underline" />
                                        <label>Confirm Password</label>
                                    </div>
                                    <input value={code} name="code" hidden/>
                                    <div className="error-txt">{errorText}</div>
                                    <div><button className="btn-signin" type="submit">Register</button></div>
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

export default SignUp;