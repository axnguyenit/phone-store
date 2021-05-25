import React, { useState, useEffect } from "react";
import Contact from "../../components/Contact";
import Header from "../../components/Header";
import { Products } from "../../components/Products";
import commerce from '../../lib/commerce';

const Facility = React.lazy(() => import('../../components/Facility'));
const Footer = React.lazy(() => import('../../components/Footer'));

function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async() => {
    const res = await commerce.products.list();
    setProducts((res && res.data) || []);
    saveProducts(res.data);
  }

  const saveProducts = (data) => {
    localStorage.setItem('products', JSON.stringify(data));
  }

  useEffect(() => {
    fetchProducts();
  });

  return (
    <>
      <Header/>
      <main id="main">
        <Products products={products}/>
        <Facility/>
        <Contact/>
      </ main>
      <Footer/>
    </>
  );
}

export default Home;