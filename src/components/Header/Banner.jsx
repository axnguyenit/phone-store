import React from 'react';

 const Banner = () => {
    return (
        <>
            <div className="hero">
                <div className="glide" id="glide_1">
                    <div className="glide__track" data-glide-el="track">
                        <ul className="glide__slides">
                        <li className="glide__slide">
                            <div className="hero__center">
                            <div className="hero__left">
                                <span className>New Inspiration 2021</span>
                                <h1 className>PHONES MADE FOR YOU!</h1>
                                <p>Trending from mobile and headphone style collection</p>
                                {/* <a href="#"><button className="hero__btn">SHOP NOW</button></a> */}
                            </div>
                            <div className="hero__right">
                                <div className="hero__img-container">
                                <img className="banner_02" src="./images/banner_02.png" alt="banner2" />
                                </div>
                            </div>
                            </div>
                        </li>
                        </ul>
                        {/* <li className="glide__slide">
                            <div className="hero__center">
                            <div className="hero__left">
                                <span>New Inspiration 2021</span>
                                <h1>PHONES MADE FOR YOU!</h1>
                                <p>Trending from mobile and headphone style collection</p>
                                <a href="#category"><button className="hero__btn">SHOP NOW</button></a>
                            </div>
                            <div className="hero__right">
                                <img className="banner_02" src="./images/banner_02.png" alt="banner2" />
                            </div>
                            </div>
                        </li>
                        </ul> */}
                    </div>
                    {/* <div className="glide__bullets" data-glide-el="controls[nav]">
                        <button className="glide__bullet" data-glide-dir="=0" />
                        <button className="glide__bullet" data-glide-dir="=1" />
                    </div> */}
                    {/* <div className="glide__arrows" data-glide-el="controls">
                        <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                        <svg>
                            <use xlinkHref="./images/sprite.svg#icon-arrow-left2" />
                        </svg>
                        </button>
                        <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                        <svg>
                            <use xlinkHref="./images/sprite.svg#icon-arrow-right2" />
                        </svg>
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Banner;