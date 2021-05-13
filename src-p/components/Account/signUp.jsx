import React from 'react';
import '@fortawesome/fontawesome-free//css/all.min.css';
import '@fortawesome/fontawesome-free';

export const SignUp = () => {
    return (
      <>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <div className="container">
            <p className="text-center"><a href="../dashboard/dashboard.html" className="text-gray-700"><i className="fas fa-angle-left me-2" /> Back to homepage</a></p>
            <div className="row justify-content-center form-bg-image" data-background-lg="../../assets/img/illustrations/signin.svg">
                <div className="col-12 d-flex align-items-center justify-content-center">
                <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                    <h1 className="mb-0 h3">Create an account</h1>
                    </div>
                    <form action="#">
                    {/* Form */}
                    <div className="form-group mb-4">
                        <label htmlFor="email">Your Email</label>
                        <div className="input-group">
                        <span className="input-group-text" id="basic-addon3"><span className="fas fa-envelope" /></span>
                        <input type="email" className="form-control" placeholder="example@company.com" id="email" autofocus required />
                        </div>
                    </div>
                    {/* End of Form */}
                    <div className="form-group">
                        {/* Form */}
                        <div className="form-group mb-4">
                        <label htmlFor="password">Your Password</label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon4"><span className="fas fa-unlock-alt" /></span>
                            <input type="password" placeholder="Password" className="form-control" id="password" required />
                        </div>
                        </div>
                        {/* End of Form */}
                        {/* Form */}
                        <div className="form-group mb-4">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon5"><span className="fas fa-unlock-alt" /></span>
                            <input type="password" placeholder="Confirm Password" className="form-control" id="confirm_password" required />
                        </div>
                        </div>
                        {/* End of Form */}
                        <div className="form-check mb-4">
                        <input className="form-check-input" type="checkbox" defaultValue id="terms" required />
                        <label className="form-check-label" htmlFor="terms">
                            I agree to the <a href="#">terms and conditions</a>
                        </label>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-dark">Sign in</button>
                    </div>
                    </form>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="fw-normal">
                        Already have an account?
                        <a href="./sign-in.html" className="fw-bold">Login here</a>
                    </span>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </section>
      </>
    )
}