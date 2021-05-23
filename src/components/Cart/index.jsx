import React, { useEffect, useState } from 'react';

const Cart = () => {
    const [isRender, setIsRender] = useState(false);
    const [isValidBasket, setIsValidBasket] = useState(false);
    let items = [];

    const fetchBasket = () => {
        if(localStorage.getItem('basket')) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            if(localStorage.getItem('products')) {
                let products = JSON.parse(localStorage.getItem('products'))
                basket.map( item => {
                    products.find( product => {
                        if(product.id === item.id) {
                            let itemTerm = {
                                id: product.id,
                                name: product.name,
                                img: product.media.source,
                                unitPrice: product.price.raw,
                                quantity: item.quantity,
                                total: item.total,
                            }
                            items.push(itemTerm);
                        }
                    })
                })
            }
        }
        else {
            setIsValidBasket(false);
        }
    }
    fetchBasket();

    // remove item from basket
    const removeItem = (itemDelete) => {
        if(localStorage.getItem('basket')) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            const item = basket.find( item => item.id === itemDelete.id);
            if(item) {
                let index = basket.indexOf(item);
                basket.splice(index, 1);
                localStorage.setItem('basket', JSON.stringify(basket));
                setIsRender(!isRender);
            }
        }
    }

    const increaseQuantity = (item) => {
        let itemIncrease = {
            id: item.id,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
        }

        if(localStorage.getItem('basket')) {
            let arr = JSON.parse(localStorage.getItem('basket'));
            const item = arr.find( item => item.id === itemIncrease.id);
            if(item) {
                let index = arr.indexOf(item);
                itemIncrease.quantity += 1;
                itemIncrease.total = itemIncrease.quantity * itemIncrease.unitPrice;
                arr[index] = itemIncrease;
                localStorage.setItem('basket', JSON.stringify(arr));
                setIsRender(!isRender);
            }
        }
    }

    const reduceQuantity = (item) => {
        let itemIncrease = {
            id: item.id,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
        }

        if(localStorage.getItem('basket')) {
            let arr = JSON.parse(localStorage.getItem('basket'));
            const item = arr.find( item => item.id === itemIncrease.id);
            if(item) {
                if(item.quantity === 1) {
                    removeItem(item);
                }
                else {
                    let index = arr.indexOf(item);
                    itemIncrease.quantity -= 1;
                    itemIncrease.total = itemIncrease.quantity * itemIncrease.unitPrice;
                    arr[index] = itemIncrease;
                    localStorage.setItem('basket', JSON.stringify(arr));
                    setIsRender(!isRender);
                }
            }
        }
    }

    return (
        <>
            {
                isValidBasket ? 
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
                                        {
                                            items.map((item, index) => 
                                                <tr>
                                                    <td className="product__thumbnail">
                                                        <img src={item.img} alt="" />
                                                    </td>
                                                    <td className="product__content">
                                                        <span >{item.name}</span>
                                                    </td>
                                                    <td className="product__content">
                                                        <span >${item.unitPrice}</span>
                                                    </td>
                                                    <td className="product__content">
                                                        <a className="minus-btn" onClick={() => reduceQuantity(item)}>
                                                            <i class="fas fa-minus"></i>
                                                        </a>
                                                        <input type="text" min={1} value={item.quantity} max={10} className="counter-btn" />
                                                        <a className="plus-btn" onClick={() => increaseQuantity(item)}>
                                                            <i class="fas fa-plus"></i>
                                                        </a>
                                                    </td>
                                                    <td className="product__content">
                                                        <span>${item.total}</span>
                                                        <a href="#" className="remove__cart-item" onClick={ () => removeItem(item) }>
                                                            <i class="fas fa-trash-alt"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        }
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
                    </section> : ''
            }
        </>
    )
}

export default Cart;