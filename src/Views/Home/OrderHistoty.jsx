
import React from 'react';
import { useState, useEffect } from "react";
import { Products } from "../../components/Products";
const NavBar = React.lazy(() => import ('../../components/Header/NavBar'));
const Contact = React.lazy(() => import ('../../components/Contact/index'));
const Facility = React.lazy(() => import('../../components/Facility'));
const Footer = React.lazy(() => import('../../components/Footer'));

const OrderHistory = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    if(localStorage.getItem('products')) {
      let productsList = JSON.parse(localStorage.getItem('products'));
      setProducts(productsList);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <>
        <header id="header" className="header">
            <NavBar/>
        </header>
        <main id="main" className="mt-70">
            <Products products={products}/>
            <Contact/>
            <Facility/>
        </ main>
        <Footer/>
    </>
  );
}

export default OrderHistory;