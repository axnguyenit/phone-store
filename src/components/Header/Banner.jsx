import React, { useState} from 'react';

 const Banner = () => {
     const [muted, setMuted] = useState(true);
    //  console.log(...muted);
    return (
        <>
            <header id="header" className="header mt-70">
                <div className="banner">
                    <video src="./assets/video/video-slide.mp4" controls muted autoPlay loop></video>
                    <div className="banner__content">
                        <div>
                            <span className>New Inspiration 2021</span>
                            <h1 className>PHONES MADE FOR YOU!</h1>
                            <p>Trending from mobile style collection</p>
                            <a href="#"><button className="banner__btn">SHOP NOW</button></a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Banner;