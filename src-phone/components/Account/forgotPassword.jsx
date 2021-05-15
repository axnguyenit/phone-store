
import React from 'react';
import '@fortawesome/fontawesome-free//css/all.min.css';
import '@fortawesome/fontawesome-free';
import '../../css/bootstrap.css';

const ForgotPassword = () => {
    return (
        <>
            <main>
                <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
                <div className="container">
                    <div className="row justify-content-center form-bg-image">
                    <p className="text-center"><a href="./sign-in.html" className="text-gray-700"><i className="fas fa-angle-left me-2" /> Back to log in</a></p>
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                        <h1 className="h3">Forgot your password?</h1>
                        <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                        <form action="#">
                            {/* Form */}
                            <div className="mb-4">
                            <label htmlFor="email">Your Email</label>
                            <div className="input-group">
                                <input type="email" className="form-control" id="email" placeholder="john@company.com" required autofocus />
                            </div>  
                            </div>
                            {/* End of Form */}
                            <div className="d-grid">
                            <button type="submit" className="btn btn-dark">Recover password</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </main>
        </>
    )
}

export default ForgotPassword;