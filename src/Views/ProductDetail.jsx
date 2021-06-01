
import React from 'react';
import { ProDetail } from "../components/Products/ProDetail";
import { useState, useEffect } from "react";
import { useRouteMatch } from 'react-router';
const NavBar = React.lazy(() => import ('../components/Header/NavBar'));
const Contact = React.lazy(() => import ('../components/Contact'));
const Facility = React.lazy(() => import('../components/Facility'));
const Footer = React.lazy(() => import('../components/Footer'));

function ProductDetail() {
  const match = useRouteMatch();
  const [products, setProducts] = useState([]);
  const id_product = match.params.id;

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
      <NavBar/>
      {
        products.map((product, index) => {
          if(product.id === id_product) {
            return <ProDetail key={index} product={product}/>
          }
        })
      }
      <Facility/>
      <Contact/>
      <Footer/>
    </>
  );
}

export default ProductDetail;