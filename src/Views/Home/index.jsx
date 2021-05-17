import { useState, useEffect } from "react";
import { Contact } from "../../components/Contact";
import { Facility } from "../../components/Facility";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Products } from "../../components/Products";
import commerce from '../../lib/commerce';

function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async() => {
    const res = await commerce.products.list();
    setProducts((res && res.data) || []);
  }

  // setTimeout((fetchProducts()),1000)
  const saveProducts = () => {
    localStorage.setItem('products', JSON.stringify(products));
  }

  useEffect(() => {
    fetchProducts();
    saveProducts();
  });

  return (
    <>
      <Header/>
      <main id="main">
        <div className="container">
          <Products products={products}/>
        </ div>
        <Facility/>
        <Contact/>
      </ main>
      <Footer/>
    </>
  );
}

export default Home;