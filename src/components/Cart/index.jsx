import React from 'react';

const CartBody = ({item}) => {
    console.log(item);
    const removeItem = (id) => {
        if(localStorage.getItem('basket')) {
            let arr = JSON.parse(localStorage.getItem('basket'))
            arr.find( item => {
                if(item === id) {
                    let index = arr.indexOf(id);
                    arr.splice(index, 1);
                    localStorage.setItem('basket', JSON.stringify(arr));
                }
            })
        }
    }

    return (
        <>
            <tr>
                <td className="product__thumbnail">
                    <img src={item.media.source} alt="" />
                </td>
                <td className="product__content">
                    <span >{item.name}</span>
                </td>
                <td className="product__content">
                    <span >{item.price.formatted_with_symbol}</span>
                </td>
                <td className="product__content">
                    <a className="minus-btn">
                        <i class="fas fa-minus"></i>
                    </a>
                    <input type="text" min={1} defaultValue={1} max={10} className="counter-btn" />
                    <a className="plus-btn">
                        <i class="fas fa-plus"></i>
                    </a>
                </td>
                <td className="product__content">
                    <span>{item.price.formatted_with_symbol}</span>
                    <a href="#" className="remove__cart-item" onClick={ () => removeItem(item.id) }>
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
                    if(product.id === item) {
                        items.push(product);
                    }
                })
            })
        }
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