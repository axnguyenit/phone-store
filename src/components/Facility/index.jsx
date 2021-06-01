import React from 'react';

const Facility = () => {
    return (
      <>
        <main id="main">
          <section className="facility__section section" id="facility">
            <div className="container">
              <div className="facility__contianer">
                <div className="facility__box">
                  <div className="facility-img__container">
                    <i className="fa fa-plane"></i>
                  </div>
                  <p>FREE SHIPPING WORLD WIDE</p>
                </div>
                <div className="facility__box">
                  <div className="facility-img__container">
                    <i className="fas fa-credit-card"></i>
                  </div>
                  <p>100% MONEY BACK GUARANTEE</p>
                </div>
                <div className="facility__box">
                  <div className="facility-img__container">
                    <i className="far fa-credit-card"></i>
                  </div>
                  <p>MANY PAYMENT GATWAYS</p>
                </div>
                <div className="facility__box">
                  <div className="facility-img__container">
                    <i class="fas fa-headphones-alt"></i>
                  </div>
                  <p>24/7 ONLINE SUPPORT</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    )
}

export default Facility;