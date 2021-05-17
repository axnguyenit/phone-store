import React from 'react';
import NavBar from '../Header/NavBar';

const SignUp = () => {
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
                            <form className="wrapper">
                                <div className="input-data">
                                    <input type="text" required />
                                    <div className="underline" />
                                    <label>Fullname</label>
                                </div>
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
                                <div className="input-data">
                                    <input type="text" required />
                                    <div className="underline" />
                                    <label>Confirm Password</label>
                                </div>
                                {/* <div className="error-txt">Error text</div> */}
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