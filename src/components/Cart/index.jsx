import React from 'react';

const CartBody = ({item}) => {
    // console.log(item);
    // remove item from basket
    const removeItem = (item) => {
        console.log(item);
        const itemDelete = {
            id: item.id,
            quantity: item.quantity,
            total: item.total,
        }
        console.log(itemDelete);
        if(localStorage.getItem('basket')) {
            let arr = JSON.parse(localStorage.getItem('basket'));
            console.log(arr);
            const item = arr.find( item => item.id === itemDelete.id);
            console.log(item);
            if(item) {
                    let index = arr.indexOf(item);
                    arr.splice(index, 1);
                    localStorage.setItem('basket', JSON.stringify(arr));
            }
        }
    }

    const plusQuantity = (item) => {
        let itemPlus = {
            id: item.id,
            quantity: item.quantity,
            total: item.total,
        }

        if(localStorage.getItem('basket')) {
            let arr = JSON.parse(localStorage.getItem('basket'));
            console.log(arr);
            const item = arr.find( item => item.id === itemPlus.id);
            console.log(item);
            if(item) {
                let index = arr.indexOf(item);
                itemPlus.quantity += 1;
                arr[index] = itemPlus;
                localStorage.setItem('basket', JSON.stringify(arr));
            }
        }
    }

    return (
        <>
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
                    <a className="minus-btn">
                        <i class="fas fa-minus"></i>
                    </a>
                    <input type="text" min={1} defaultValue={item.quantity} max={10} className="counter-btn" />
                    <a className="plus-btn" onClick={() => plusQuantity(item)}>
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
        </>
    )
}

const Cart = () => {
    let basket = [];
    let products;
    let items = [];
    if(localStorage.getItem('basket')) {
        basket = JSON.parse(localStorage.getItem('basket'));
        if(localStorage.getItem('products')) {
            products = JSON.parse(localStorage.getItem('products'))
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
        console.log(items);
    }
    // const user = usersData.find( user => user.id.toString() === match.params.id)

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
                            {
                                items.map((item, index) => 
                                    <CartBody key={index} item={item}/>
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
            </section>
        </>
    )
}

export default Cart;