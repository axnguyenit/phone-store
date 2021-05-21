import React from 'react';
import commerce from '../../lib/commerce';

export const ProDetail = ({product}) => {
    return (
      <div className="container">
        <section className="mt-70 section product-details__section">
        <div className="product-detail__container">
          <div className="product-detail__left">
            <div className="details__container--left">
              <div className="product__picture" id="product__picture">
                <div className="rect" id="rect"></div>
                <div className="picture__container">
                  <img src={product.media.source} id="pic" />
                </div>
              </div>
              <div className="zoom" id="zoom" />
            </div>
            <div className="product-details__btn">
              <a className="add" href="#">
                <span>
                  <svg>
                    <use xlinkHref="./images/sprite.svg#icon-cart-plus" />
                  </svg>
                </span> ADD TO CART</a>
              <a className="buy" href="#">
                <span>
                  <svg>
                    <use xlinkHref="./images/sprite.svg#icon-credit-card" />
                  </svg>
                </span> BUY NOW
              </a>
            </div>
          </div>
          <div className="product-detail__right">
            <div className="product-detail__content">
              <h3>{product.name}</h3>
              <div className="price">
                <span className="new__price">{product.price.formatted_with_symbol}</span>
              </div>
              <div className="product__review">
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
                <a href="#" className="rating__quatity">3 reviews</a>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a doloribus iste natus et facere? dolor sit amet consectetur adipisicing elit. Sunt a doloribus iste natus et facere?
              </p>
              <div className="product__info-container">
                <ul className="product__info">
                  <li className="select">
                    <div className="select__option">
                      <label htmlFor="colors">Color</label>
                      <select name="colors" id="colors" className="select-box">
                        <option value="blue">blue</option>
                        <option value="red">red</option>
                      </select>
                    </div>
                    <div className="select__option">
                      <label htmlFor="size">Inches</label>
                      <select name="size" id="size" className="select-box">
                        <option value="6.65">6.65</option>
                        <option value="7.50">7.50</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <div className="input-counter">
                      <span>Quantity:</span>
                      <div>
                        <span className="minus-btn">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-minus" />
                          </svg>
                        </span>
                        <input type="text" min={1} defaultValue={1} max={10} className="counter-btn" />
                        <span className="plus-btn">
                          <svg>
                            <use xlinkHref="./images/sprite.svg#icon-plus" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span>Subtotal:</span>
                    <a href="#" className="new__price">$250.99</a>
                  </li>
                  <li>
                    <span>Brand:</span>
                    <a href="#">Apple</a>
                  </li>
                  <li>
                    <span>Product Type:</span>
                    <a href="#">Phone</a>
                  </li>
                  <li>
                    <span>Availability:</span>
                    <a href="#" className="in-stock">In Stock (7 Items)</a>
                  </li>
                </ul>
                <div className="product-info__btn">
                  <a href="#">
                    <span>
                      <svg>
                        <use xlinkHref="./images/sprite.svg#icon-crop" />
                      </svg>
                    </span>&nbsp; SIZE GUIDE
                  </a>
                  <a href="#">
                    <span>
                      <svg>
                        <use xlinkHref="./images/sprite.svg#icon-truck" />
                      </svg>
                    </span>&nbsp; SHIPPING
                  </a>
                  <a href="#">
                    <span>
                      <svg>
                        <use xlinkHref="./images/sprite.svg#icon-envelope-o" />
                      </svg>&nbsp;
                    </span> ASK ABOUT THIS PRODUCT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
}

