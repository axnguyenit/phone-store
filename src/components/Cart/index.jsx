import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const Cart = () => {
    const history = useHistory();
    const [basket, setBasket] = useState();
    const [isRender, setIsRender] = useState(false);
    let items = [];

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
        
    // remove item from basket
    const removeItem = (itemDelete) => {
        const nameItem = items.find( item => itemDelete.id === item.id).name;
        if(localStorage.getItem('basket')) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            const item = basket.find( item => item.id === itemDelete.id);
            if(item) {
                let index = basket.indexOf(item);
                basket.splice(index, 1);
                localStorage.setItem('basket', JSON.stringify(basket));
                toast.success(`Remove ${nameItem} from the basket successfully!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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

    const decreaseQuantity = (item) => {
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

    const handleCheckout = () => {
        if(localStorage.getItem('userID')) {
            history.replace('/checkout');
        }
        else {
            history.replace('/login');
        }
    }

    return (
        <>
            {
                ( items.length > 0 ) ? 
                    <section className="section cart__area">
                        <div className="container">
                            <div className="responsive__cart-area">
                                <form className="cart__form">
                                <div className="cart__table table-responsive">
                                    <table width="100%" className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                            <label className="label">
                                                <input className="label__checkbox" type="checkbox"/>
                                                <span className="label__text">
                                                <span className="label__check">
                                                    <i className="fa fa-check icon" />
                                                </span>
                                                </span>
                                            </label>
                                            </th>
                                        <th>PRODUCT</th>
                                        <th>NAME</th>
                                        <th>UNIT PRICE</th>
                                        <th>QUANTITY</th>
                                        <th>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            items.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <label className="label">
                                                            <input className="label__checkbox" type="checkbox" onClick={e => console.log(e.target.checked)}/>
                                                            <span className="label__text">
                                                            <span className="label__check">
                                                                <i className="fa fa-check icon" />
                                                            </span>
                                                            </span>
                                                        </label>
                                                    </td>
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
                                                        <a className="minus-btn" onClick={() => decreaseQuantity(item)}>
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
                                                </tr>}
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
                                    <a href="#" onClick={handleCheckout}>Checkout</a>
                                    </div>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </section> 
                    : <section className="section">
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</section>
            }
        </>
    )
}

export default Cart;