import React from 'react';

const Contact = () => {
    return (
        <main id="main">
            <section className="section newsletter" id="contact">
                <div className="container">
                    <div className="newsletter__content">
                        <div className="newsletter__data">
                            <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
                            <p>A short sentence describing what someone will receive by subscribing</p>
                        </div>
                        <form action="">
                            <input type="email" placeholder="Enter your email address" className="newsletter__email" required/>
                            {/* <a className="newsletter__link" href="#">SUBSCRIBE</a> */}
                            <input type="submit" className="newsletter__btn" href="#" value="SUBSCRIBE"/>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contact;