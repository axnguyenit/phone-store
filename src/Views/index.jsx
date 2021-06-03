import React, { useState, useEffect } from "react";
import NavBar from "../components/Header/NavBar";
import Banner from "../components/Header/Banner";
import Products from "../components/Products";
import Facility from '../components/Facility';
import Contact from "../components/Contact";
import Footer from '../components/Footer';
import commerce from '../lib/commerce';

function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async() => {
    const res = await commerce.products.list();
    setProducts((res && res.data) || []);
    localStorage.setItem('products', JSON.stringify(res.data));
  }

  useEffect(() => {
    fetchProducts();
  });

  return (
    <>
      <NavBar/>
      <Banner/>
      <Products products={products}/>
      <Facility/>
      <Contact/>
      <Footer/>
    </>
  );
}

export default Home;