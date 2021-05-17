import React from 'react';
import NavBar from '../Header/NavBar';

const SignIn = () => {
    return (
        <>
            <NavBar/>
            <main id="main">
                <section className="section cart__area">
                    <div className="container">
                        <div className="responsive__cart-area">
                        <div className="signin__form">
                            <div className="header">
                                <h2>Sign In</h2>
                                <p>Sign in with your email address and password</p>
                            </div>
                            <form className="wrapper">
                            <div className="input-data">
                                <input type="text" required />
                                <div className="underline" />
                                <label>Email address</label>
                            </div>
                            <div className="input-data">
                                <input type="text" required />
                                <div className="underline" />
                                <label>Password</label>
                            </div>
                            {/* <div className="error-txt">Error text</div> */}
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
