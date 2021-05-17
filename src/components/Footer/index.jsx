import React from 'react'

export const Footer = () => {
    return (
        <>
            <footer id="footer" className="section footer">
                <div className="container">
                    <div className="footer__top">
                        <div className="footer-top__box">
                        <h3>EXTRAS</h3>
                        <a href="#">Brands</a>
                        <a href="#">Gift Certificates</a>
                        <a href="#">Affiliate</a>
                        <a href="#">Specials</a>
                        <a href="#">Site Map</a>
                        </div>
                        <div className="footer-top__box">
                        <h3>INFORMATION</h3>
                        <a href="#">About Us</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms &amp; Conditions</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Site Map</a>
                        </div>
                        <div className="footer-top__box">
                        <h3>MY ACCOUNT</h3>
                        <a href="#">My Account</a>
                        <a href="#">Order History</a>
                        <a href="#">Wish List</a>
                        <a href="#">Newsletter</a>
                        <a href="#">Returns</a>
                        </div>
                        <div className="footer-top__box">
                        <h3>CONTACT US</h3>
                        <div>
                            <span>
                            <svg>
                                <use xlinkHref="./images/sprite.svg#icon-location" />
                            </svg>
                            </span> Son Tra, Da Nang, Vietnam
                        </div>
                        <div>
                            <span>
                            <svg>
                                <use xlinkHref="./images/sprite.svg#icon-envelop" />
                            </svg>
                            </span> kha.nguyen01.it@gmail.com
                        </div>
                        <div>
                            <span>
                            <svg>
                                <use xlinkHref="./images/sprite.svg#icon-phone" />
                            </svg>
                            </span> (+84) 337 965 469
                        </div>
                        <div>
                            <span>
                            <svg>
                                <use xlinkHref="./images/sprite.svg#icon-paperplane" />
                            </svg>
                            </span> Da Nang City, Vietnam
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="footer__bottom">
                    <div className="footer-bottom__box">
                    </div>
                    <div className="footer-bottom__box">
                    </div>
                </div>
            </footer>

            <a href="#header" className="goto-top scroll-link">
                <svg>
                    <use xlinkHref="./images/sprite.svg#icon-arrow-up" />
                </svg>
            </a>
        </>
    )
}
