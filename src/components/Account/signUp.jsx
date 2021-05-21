import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import NavBar from '../Header/NavBar';
// field send mail: to_name, to_email, code
const SignUp = () => {
    const [code, setCode] = useState(0);
    const [to_name, setName] = useState();
    const [to_email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cfpassword, setCfpassword] = useState();
    const [errorText, setErrorText] = useState('');
    

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
        console.log(code);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        // if()
        console.log(to_name);
        console.log(to_email);
        console.log(password);
        console.log(cfpassword);
        console.log(code);
        if(password != cfpassword) {
            setErrorText('Your password not match! Try again.');
        }
        else {
            
        }
    }

    useEffect(() => {
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
                                    <h2>Sign Up</h2>
                                    <p>Sign up with your information</p>
                                </div>
                                <form className="wrapper" onSubmit={handleSignup}>
                                    <div className="input-data">
                                        <input type="text" name="to_name" onChange={e => setName(e.target.value)} required />
                                        <div className="underline" />
                                        <label>Fullname</label>
                                    </div>
                                    <div className="input-data">
                                        <input type="email" name="to_email" onChange={e => setEmail(e.target.value)} required />
                                        <div className="underline" />
                                        <label>Email address</label>
                                    </div>
                                    <div className="input-data">
                                        <input type="password" name="password" onChange={e => setPassword(e.target.value)} required />
                                        <div className="underline" />
                                        <label>Password</label>
                                    </div>
                                    <div className="input-data">
                                        <input type="password" name="cfpassword" onChange={e => setCfpassword(e.target.value)} required />
                                        <div className="underline" />
                                        <label>Confirm Password</label>
                                    </div>
                                    <input value={code} name="code" disabled hidden/>
                                    <div className="error-txt">{errorText}</div>
                                    <div><button className="btn-signin" type="submit">Signup</button></div>
                                    <div className="link">Already a member? <a href="#">Signin here</a></div>
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