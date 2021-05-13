import React from 'react';

export const Cart = () => {
    return (
        <>
            <section className="section cart__area">
                <div className="container">
                <div className="responsive__cart-area">
                    <form className="cart__form">
                    <div className="cart__table table-responsive">
                        <table width="100%" className="table">
                        <thead>
                            <tr>
                            <th>PRODUCT</th>
                            <th>NAME</th>
                            <th>UNIT PRICE</th>
                            <th>QUANTITY</th>
                            <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className="product__thumbnail">
                                <a href="#">
                                <img src="./images/products/iPhone/iphone6.jpeg" alt="" />
                                </a>
                            </td>
                            <td className="product__name">
                                <a href="#">Apple iPhone 11</a>
                            </td>
                            <td className="product__price">
                                <div className="price">
                                <span className="new__price">$250.99</span>
                                </div>
                            </td>
                            <td className="product__quantity">
                                <div className="input-counter">
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
                            </td>
                            <td className="product__subtotal">
                                <div className="price">
                                <span className="new__price">$250.99</span>
                                </div>
                                <a href="#" className="remove__cart-item">
                                <svg>
                                    <use xlinkHref="./images/sprite.svg#icon-trash" />
                                </svg>
                                </a>
                            </td>
                            </tr>
                            <tr>
                            <td className="product__thumbnail">
                                <a href="#">
                                <img src="./images/products/sumsung/samsung5.jpeg" alt="" />
                                </a>
                            </td>
                            <td className="product__name">
                                <a href="#">Apple iPhone 11</a>
                            </td>
                            <td className="product__price">
                                <div className="price">
                                <span className="new__price">$250.99</span>
                                </div>
                            </td>
                            <td className="product__quantity">
                                <div className="input-counter">
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
                            </td>
                            <td className="product__subtotal">
                                <div className="price">
                                <span className="new__price">$250.99</span>
                                </div>
                                <a href="#" className="remove__cart-item">
                                <svg>
                                    <use xlinkHref="./images/sprite.svg#icon-trash" />
                                </svg>
                                </a>
                            </td>
                            </tr>
                            <tr>
                            <td className="product__thumbnail">
                                <a href="#">
                                <img src="./images/products/sumsung/samsung2.jpeg" alt="" />
                                </a>
                            </td>
                            <td className="product__name">
                                <a href="#">Apple iPhone 11</a>
                            </td>
                            <td className="product__price">
                                <div className="price">
                                <span className="new__price">$250.99</span>
                                </div>
                            </td>
                            <td className="product__quantity">
                                <div className="input-counter">
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
                            </td>
                            <td className="product__subtotal">
                                <div className="price">
                                <span className="new__price">$250.99</span>
                                </div>
                                <a href="#" className="remove__cart-item">
                                <svg>
                                    <use xlinkHref="./images/sprite.svg#icon-trash" />
                                </svg>
                                </a>
                            </td>
                            </tr>
                            <tr>
                            <td className="product__thumbnail">
                                <a href="#">
                                <img src="./images/products/iPhone/iphone4.jpeg" alt="" />
                                </a>
                            </td>
                            <td className="product__name">
                                <a href="#">Apple iPhone 11</a>
                            </td>
                            <td className="product__price">
                                <div className="price">
                                <span className="new__price">$250.99</span>
                                </div>
                            </td>
                            <td className="product__quantity">
                                <div className="input-counter">
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
                            </td>
                            <td className="product__subtotal">
                                <div className="price">
                                <span className="new__price">$250.99</span>
                                </div>
                                <a href="#" className="remove__cart-item">
                                <svg>
                                    <use xlinkHref="./images/sprite.svg#icon-trash" />
                                </svg>
                                </a>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className="cart-btns">
                        <div className="continue__shopping">
                        <a href="/">Continue Shopping</a>
                        </div>
                        <div className="check__shipping">
                        <div className="continue__shopping">
                        <a href="/">Checkout</a>
                        </div>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </section>
        </>
    )
}


