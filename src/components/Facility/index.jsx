import React from 'react';

export const Facility = () => {
    return (
        <>
            <section className="facility__section section" id="facility">
            <div className="container">
              <div className="facility__contianer">
                <div className="facility__box">
                  <div className="facility-img__container">
                    <svg>
                      <use xlinkHref="./images/sprite.svg#icon-airplane" />
                    </svg>
                  </div>
                  <p>FREE SHIPPING WORLD WIDE</p>
                </div>
                <div className="facility__box">
                  <div className="facility-img__container">
                    <svg>
                      <use xlinkHref="./images/sprite.svg#icon-credit-card-alt" />
                    </svg>
                  </div>
                  <p>100% MONEY BACK GUARANTEE</p>
                </div>
                <div className="facility__box">
                  <div className="facility-img__container">
                    <svg>
                      <use xlinkHref="./images/sprite.svg#icon-credit-card" />
                    </svg>
                  </div>
                  <p>MANY PAYMENT GATWAYS</p>
                </div>
                <div className="facility__box">
                  <div className="facility-img__container">
                    <svg>
                      <use xlinkHref="./images/sprite.svg#icon-headphones" />
                    </svg>
                  </div>
                  <p>24/7 ONLINE SUPPORT</p>
                </div>
              </div>
            </div>
          </section>
        </>
    )
}