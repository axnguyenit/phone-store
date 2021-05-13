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
    const res = await commerce.products.list( );
    console.log(res.data);
    setProducts((res && res.data) || []);
  }

  useEffect(() => {
    if(!products.length > 0) {
      fetchProducts();
    }
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