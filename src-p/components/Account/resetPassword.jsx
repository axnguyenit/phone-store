import React from 'react';
import '@fortawesome/fontawesome-free//css/all.min.css';
import '@fortawesome/fontawesome-free';

export const ResetPassword = () => {
    return (
        <>
            <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <div className="container">
                    <div className="row justify-content-center form-bg-image">
                        <p className="text-center"><a href="./sign-in.html" className="text-gray-700"><i className="fas fa-angle-left me-2" /> Back to log in</a></p>
                        <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <h1 className="h3 mb-4">Reset password</h1>
                            <form action="#">
                            {/* Form */}
                            <div className="mb-4">
                                <label htmlFor="email">Your Email</label>
                                <div className="input-group">
                                <input type="email" className="form-control" placeholder="example@company.com" id="email" required disabled />
                                </div>  
                            </div>
                            {/* End of Form */}
                            {/* Form */}
                            <div className="mb-4">
                                <label htmlFor="password">Your Password</label>
                                <div className="input-group">
                                <span className="input-group-text" id="basic-addon4"><span className="fas fa-unlock-alt" /></span>
                                <input type="password" placeholder="Password" className="form-control" id="password" required autofocus />
                                </div>  
                            </div>
                            {/* End of Form */}
                            {/* Form */}
                            <div className="mb-4">
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <div className="input-group">
                                <span className="input-group-text" id="basic-addon5"><span className="fas fa-unlock-alt" /></span>
                                <input type="password" placeholder="Confirm Password" className="form-control" id="confirm_password" required />
                                </div>  
                            </div>
                            {/* End of Form */}
                            <div className="d-grid">
                                <button type="submit" className="btn btn-dark">Reset password</button>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                    </section>
        </>
    )
}




