
import React from 'react';
import CustomCard from "../../components/CustomCard";
// import { Footer } from "../../components/Footer";
import { Products } from "../../components/Products";
import { ProDetail } from "../../components/Products/ProDetail";
import { RelatedProduct } from "../../components/Products/RelatedProduct";
import commerce from '../../lib/commerce';
import { useState, useEffect } from "react";
const NavBar = React.lazy(() => import ('../../components/Header/NavBar'));
const Contact = React.lazy(() => import ('../../components/Contact/index'));
const Facility = React.lazy(() => import('../../components/Facility'));
const Footer = React.lazy(() => import('../../components/Footer'));

function ProductDetail(props) {
  const [products, setProducts] = useState([]);
  const id_product = props.match.params.id;

  const fetchProducts = async() => {
    const res = await commerce.products.list();
    setProducts((res && res.data) || []);
  }

  useEffect(() => {
    if(!products.length > 0) {
      fetchProducts();
    }
  });
  
  return (
    <>
        <header id="header" className="header">
            <NavBar/>
        </header>
        <main id="main">
              {
                products.map((product, index) => {
                  if(product.id === id_product) {
                    return <ProDetail key={index} product={product}/>
                  }
                })
              }
                <RelatedProduct/>
                {/* <Products /> */}
            <Contact/>
            <Facility/>
        </ main>
        <Footer/>
    </>
  );
}

export default ProductDetail;