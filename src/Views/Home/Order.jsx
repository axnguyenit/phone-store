import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import OrderDetail from '../../components/Orders/Order';
const NavBar = React.lazy(() => import ('../../components/Header/NavBar'));
const Contact = React.lazy(() => import ('../../components/Contact/index'));
const Facility = React.lazy(() => import('../../components/Facility'));
const Footer = React.lazy(() => import('../../components/Footer'));
const API_USERS_URL = `http://localhost:4000/api/users`;

const Order = (props) => {
    const [order, setOrder] = useState([]);
    const id_order = props.match.params.id;

    const fetchOrder = () => {
        if(localStorage.getItem('userID')) {
            if(localStorage.getItem('products')) {
                const userID = JSON.parse(localStorage.getItem('userID'));
                let products = JSON.parse(localStorage.getItem('products'));
                
                axios.get(API_USERS_URL + '/' + userID + '/orders').then(res => {
                    let order = res.data.find(order => order.id === parseInt(id_order));

                    if(order) {
                        let orderTerm = [];
                        order.details.map(item => {
                            let itemTerm = item;
                            products.map(product => {
                                if(item.prodId === product.id) {
                                    itemTerm.img = product.media.source;
                                    itemTerm.unitPrice = product.price.raw;
                                    itemTerm.total = product.price.raw * itemTerm.quantity;
                                    itemTerm.name = product.name;

                                    orderTerm.push(itemTerm);
                                }
                            })
                        })
                        setOrder(orderTerm);
                    }
                })
            }
        }
    }

    useEffect(() => {
        fetchOrder();
    }, []);
    
    return (
        <>
            <header id="header" className="header">
                <NavBar/>
            </header>
            <main id="main" className="mt-70">
                <OrderDetail order={order}/>
                <Contact/>
                <Facility/>
            </ main>
            <Footer/>
        </>
    );
}

export default Order;