
import React from 'react';
import '@fortawesome/fontawesome-free//css/all.min.css';
import '@fortawesome/fontawesome-free';

export const ErrorPage = () => {
    return (
        <>
            <main>
              <section className="vh-100 d-flex align-items-center justify-content-center">
                <div className="container">
                  <div className="row">
                    <div className="col-12 text-center d-flex align-items-center justify-content-center">
                      <div>
                        <img className="img-fluid w-75" src="images/404.svg" alt="404 not found" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
        </>
    )
}

