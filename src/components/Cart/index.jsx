import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
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
        basket.map(item => {
            item.isCheck = false;
        })

        localStorage.setItem('basket', JSON.stringify(basket));
        if(localStorage.getItem('products')) {
            let products = JSON.parse(localStorage.getItem('products'))
            basket.map(item => {
                products.find(product => {
                    if(product.id === item.id) {
                        let itemTerm = {
                            id: product.id,
                            name: product.name,
                            img: product.media.source,
                            unitPrice: product.price.raw,
                            quantity: item.quantity,
                            total: item.total,
                            isCheck: item.isCheck,
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
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        setIsRender(!isRender);
    }

    //  increase, decrease quantity
    const updateQuantity = (type, item) => {
        let itemIncrease = {
            id: item.id,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.total,
            isCheck: item.isCheck,
        }

        if(localStorage.getItem('basket')) {
            let basket = JSON.parse(localStorage.getItem('basket'));
            const item = basket.find( item => item.id === itemIncrease.id);
            if(item) {
                if(item.quantity === 1 && type === 'decrease') {
                    removeItem(item);
                }
                else {
                    let index = basket.indexOf(item);
                    if(type === 'increase') {
                        itemIncrease.quantity += 1;
                    }
                    if(type === 'decrease') {
                        itemIncrease.quantity -= 1;
                    }
                    itemIncrease.total = itemIncrease.quantity * itemIncrease.unitPrice;
                    basket[index] = itemIncrease;
                    localStorage.setItem('basket', JSON.stringify(basket));
                    setIsRender(!isRender);
                }
            }
        }
    }

    const handleCheckout = () => {
        if(localStorage.getItem('userID')) {
            if(localStorage.getItem('basket')) {
                let basket = JSON.parse(localStorage.getItem('basket'));
                const item = basket.find(item => item.isCheck === true);
                if(item) {
                    history.replace('/checkout');
                }
                else {
                    toast.warn(`Please, choose at least an item to checkout!`, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }
        else {
            history.replace('/login');
        }
    }

    const updateChecked = (e, item) => {
        console.log(e.target);
        if(localStorage.getItem('basket')) {
            let basket = JSON.parse(localStorage.getItem('basket'));

            basket.map((itemBasket) => {
                if(itemBasket.id === item.id) {
                    console.log(e.target.checked);
                    itemBasket.isCheck = e.target.checked;
                    localStorage.setItem('basket', JSON.stringify(basket));
                }
            })
        }
    }

    const checkedItem = (e) => {
        console.log(e.target);
    }

    return (
        <main id="main">
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
                                                <input className="label__checkbox" type="checkbox" onClick={e => checkedItem(e)}/>
                                                <span className="label__text">
                                                <span className="label__check">
                                                    <i className="fa fa-check icon" />
                                                </span>
                                                </span>
                                            </label>
                                            </th>
                                        <th>NAME</th>
                                        <th>PRODUCT</th>
                                        <th>UNIT PRICE</th>
                                        <th>QUANTITY</th>
                                        <th>TOTAL</th>
                                        <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            items.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <label className="label">
                                                            <input className="label__checkbox" name="checkedItem" value="test" type="checkbox" onClick={e => updateChecked(e, item)}/>
                                                            <span className="label__text">
                                                            <span className="label__check">
                                                                <i className="fa fa-check icon"/>
                                                            </span>
                                                            </span>
                                                        </label>
                                                    </td>
                                                    <td className="product__content">
                                                        <span >{item.name}</span>
                                                    </td>
                                                    <td className="product__thumbnail">
                                                        <img src={item.img} alt="" />
                                                    </td>
                                                    <td className="product__content">
                                                        <span >${item.unitPrice}</span>
                                                    </td>
                                                    <td className="product__content">
                                                        <a className="minus-btn" onClick={() => updateQuantity('decrease', item)}>
                                                            <i class="fas fa-minus"></i>
                                                        </a>
                                                        <input type="text" min={1} value={item.quantity} max={10} className="counter-btn" />
                                                        <a className="plus-btn" onClick={() => updateQuantity('increase', item)}>
                                                            <i class="fas fa-plus"></i>
                                                        </a>
                                                    </td>
                                                    <td className="product__content">
                                                        <span>${item.total}</span>
                                                    </td>
                                                    <td className="product__content">
                                                        <a href="#" className="remove__cart-item" onClick={() => removeItem(item) }>
                                                            <i class="fas fa-trash-alt"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="cart-btns">
                                    <Link to="/">
                                        <div className="continue__shopping">
                                            <a href="#">Continue Shopping</a>
                                        </div>
                                    </Link>
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
                :
                    <div className="container mt-70">
                        <div className="profile">
                            <form className="profile__form">
                                <div className="header">Your basket is empty!</div>
                                <div>
                                    <Link to="/">
                                    <button type="button" className="btn__update">Go to shoping</button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </main>
    )
}

export default Cart;