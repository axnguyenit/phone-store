import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import OrdersDetail from '../../components/Orders/Orders';
const NavBar = React.lazy(() => import ('../../components/Header/NavBar'));
const Contact = React.lazy(() => import ('../../components/Contact/index'));
const Facility = React.lazy(() => import('../../components/Facility'));
const Footer = React.lazy(() => import('../../components/Footer'));
const API_USERS_URL = `http://localhost:4000/api/users`;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    if(localStorage.getItem('userID')) {
      if(localStorage.getItem('products')) {
        const userID = JSON.parse(localStorage.getItem('userID'));
        let products = JSON.parse(localStorage.getItem('products'));
        
        axios.get(API_USERS_URL + '/' + userID + '/orders').then(res => {
          let orders = res.data;
          let ordersTerm = [];
          orders.map(order => {
            let orderTerm = order;
            let total = 0;
            let quantity = 0;
            order.details.map(item => {
              products.map(product => {
                if(item.prodId === product.id) {
                  total += product.price.raw * item.quantity;
                  quantity += item.quantity;
                }
              })
            })
            orderTerm.total = total;
            orderTerm.quantity = quantity;
            ordersTerm.push(orderTerm);
          })
          setOrders(ordersTerm);
        })
      }
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);
  
  return (
    <>
        <header id="header" className="header">
            <NavBar/>
        </header>
        <main id="main" className="mt-70">
            <OrdersDetail orders={orders}/>
            <Contact/>
            <Facility/>
        </ main>
        <Footer/>
    </>
  );
}

export default Orders;