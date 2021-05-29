import React from 'react';

const OrderDetail = ({order}) => (
    <>
        {
            ( order.length > 0 ) ?
                <section className="section cart__area">
                    <div className="container">
                        <div className="responsive__cart-area">
                            <form className="cart__form">
                            <div className="cart__table table-responsive">
                                <table width="100%" className="table">
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>NAME</th>
                                        <th>PRODUCT</th>
                                        <th>UNIT PRICE</th>
                                        <th>QUANTITY</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.map((item, index) => {
                                            return <tr key={index}>
                                                <td className="product__thumbnail">
                                                    {index + 1}
                                                </td>
                                                <td className="product__content">
                                                    <span>{item.name}</span>
                                                </td>
                                                <td className="product__thumbnail">
                                                    <img src={item.img} alt="" />
                                                </td>
                                                <td className="product__content">
                                                    <span>$ {item.unitPrice}</span>
                                                </td>
                                                <td className="product__content">
                                                    <span>{item.quantity}</span>
                                                </td>
                                                <td className="product__content">
                                                    <span>$ {item.total}</span>
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

export default OrderDetail;