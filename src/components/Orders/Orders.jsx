import React from 'react';
import { Link } from 'react-router-dom';
const OrdersDetail = ({orders}) => (
    <>
        {
            ( orders.length > 0 ) ?
                <section className="section cart__area">
                    <div className="container">
                        <div className="responsive__cart-area">
                            <form className="cart__form">
                            <div className="cart__table table-responsive">
                                <table width="100%" className="table">
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>DATE</th>
                                        <th>PRODUCT</th>
                                        <th>QUANTITY</th>
                                        <th>STATUS</th>
                                        <th>SUB TOTAL</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order, index) => {
                                            let quantity = 0;
                                            order.details.map(item => {
                                                quantity += item.quantity;
                                            })
                                            return <tr key={index}>
                                                <td className="product__thumbnail">
                                                    {index + 1}
                                                </td>
                                                <td className="product__content">
                                                    <span>
                                                        {new Intl.DateTimeFormat(['ban', 'id']).format(order.createdAt)}
                                                    </span>
                                                </td>
                                                <td className="product__content">
                                                    <span>{order.details.length}</span>
                                                </td>
                                                <td className="product__content">
                                                    <span>{order.quantity}</span>
                                                </td>
                                                <td className="product__content">
                                                    <span>{order.status}</span>
                                                </td>
                                                <td className="product__content">
                                                    <span>${order.total}</span>
                                                </td>
                                                <td className="product__content">
                                                    <Link to={"/orders" + "/" + order.id} className="order__detail">
                                                        <i className="fas fa-info-circle"></i>
                                                    </Link>
                                                </td>
                                            </tr>}
                                        )
                                    }
                                    </tbody>
                                </table>
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

export default OrdersDetail;