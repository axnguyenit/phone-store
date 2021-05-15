import React from 'react';

export const RelatedProduct = (id) => {
    return (
      <>
        <section className="section related__products">
        <div className="title__container">
          <div className="section__title filter-btn active">
            <span className=" dot" />
            <h1 className="primary__title">Related Products</h1>
          </div>
        </div>
        <div className="container" data-aos="fade-up" data-aos-duration={1200}>
          <div className="glide" id="glide_3">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides latest-center">
                <li className="glide__slide">
                  <div className="product">
                    <div className="product__header">
                      <a href="#"><img src="/images/products/sumsung/samsung5.jpeg" alt="product" /></a>
                    </div>
                    <div className="product__footer">
                      <h3>Samsung Galaxy</h3>
                      <div className="rating">
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-empty" />
                        </svg>
                      </div>
                      <div className="product__price">
                        <h4>$900</h4>
                      </div>
                      <a href="#"><button type="submit" className="product__btn">Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-eye" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-heart-o" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-loop2" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="product">
                    <div className="product__header">
                      <a href="#"><img src="/images/products/iPhone/iphone6.jpeg" alt="product" /></a>
                    </div>
                    <div className="product__footer">
                      <h3>Apple iPhone 11</h3>
                      <div className="rating">
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-empty" />
                        </svg>
                      </div>
                      <div className="product__price">
                        <h4>$750</h4>
                      </div>
                      <a href="#"><button type="submit" className="product__btn">Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-eye" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-heart-o" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-loop2" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="product">
                    <div className="product__header">
                      <a href="#"><img src="/images/products/sumsung/samsung3.jpeg" alt="product" /></a>
                    </div>
                    <div className="product__footer">
                      <h3>Samsung Galaxy</h3>
                      <div className="rating">
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-empty" />
                        </svg>
                      </div>
                      <div className="product__price">
                        <h4>$850</h4>
                      </div>
                      <a href="#"><button type="submit" className="product__btn">Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-eye" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-heart-o" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-loop2" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="product">
                    <div className="product__header">
                      <a href="#"><img src="./images/products/iPhone/iphone2.jpeg" alt="product" /></a>
                    </div>
                    <div className="product__footer">
                      <h3>Apple iPhone 11</h3>
                      <div className="rating">
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-empty" />
                        </svg>
                      </div>
                      <div className="product__price">
                        <h4>$450</h4>
                      </div>
                      <a href="#"><button type="submit" className="product__btn">Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-eye" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-heart-o" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-loop2" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="product">
                    <div className="product__header">
                      <a href="#"><img src="/images/products/headphone/headphone4.jpeg" alt="product" /></a>
                    </div>
                    <div className="product__footer">
                      <h3>Sony WH-CH510</h3>
                      <div className="rating">
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-empty" />
                        </svg>
                      </div>
                      <div className="product__price">
                        <h4>$600</h4>
                      </div>
                      <a href="#"><button type="submit" className="product__btn">Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-eye" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-heart-o" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-loop2" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="product">
                    <div className="product__header">
                      <a href="#"><img src="images/products/sumsung/samsung1.jpeg" alt="product" /></a>
                    </div>
                    <div className="product__footer">
                      <h3>Samsung Galaxy</h3>
                      <div className="rating">
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-empty" />
                        </svg>
                      </div>
                      <div className="product__price">
                        <h4>$300</h4>
                      </div>
                      <a href="#"><button type="submit" className="product__btn">Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-eye" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-heart-o" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-loop2" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="product">
                    <div className="product__header">
                      <a href="#"><img src="images/products/headphone/headphone2.jpeg" alt="product" /></a>
                    </div>
                    <div className="product__footer">
                      <h3>Sony WH-CH510</h3>
                      <div className="rating">
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-empty" />
                        </svg>
                      </div>
                      <div className="product__price">
                        <h4>$300</h4>
                      </div>
                      <a href="#"><button type="submit" className="product__btn">Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-eye" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-heart-o" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-loop2" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="product">
                    <div className="product__header">
                      <a href="#"><img src="images/products/headphone/headphone1.jpeg" alt="product" /></a>
                    </div>
                    <div className="product__footer">
                      <h3>Sony WH-CH510</h3>
                      <div className="rating">
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-empty" />
                        </svg>
                      </div>
                      <div className="product__price">
                        <h4>$250</h4>
                      </div>
                      <a href="#"><button type="submit" className="product__btn">Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-eye" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-heart-o" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-loop2" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="product">
                    <div className="product__header">
                      <a href="#"><img src="images/products/iPhone/iphone1.jpeg" alt="product" /></a>
                    </div>
                    <div className="product__footer">
                      <h3>Apple iPhone XR</h3>
                      <div className="rating">
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-full" />
                        </svg>
                        <svg>
                          <use xlinkHref="./images/sprite.svg#icon-star-empty" />
                        </svg>
                      </div>
                      <div className="product__price">
                        <h4>$550</h4>
                      </div>
                      <a href="#"><button type="submit" className="product__btn">Add To Cart</button></a>
                    </div>
                    <ul>
                      <li>
                        <a data-tip="Quick View" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-eye" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Wishlist" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-heart-o" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a data-tip="Add To Compare" data-place="left" href="#">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-loop2" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li></ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
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
            </div>
          </div>
        </div>
      </section>
      </>
    )
}

