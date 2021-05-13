
import CustomCard from "../../components/CustomCard";
import { Facility } from "../../components/Facility";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/Header/NavBar";
import { Products } from "../../components/Products";
import { ProDetail } from "../../components/Products/ProDetail";
import { RelatedProduct } from "../../components/Products/RelatedProduct";
import commerce from '../../lib/commerce';
import { useState, useEffect } from "react";

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
  }, []);
  
  return (
    <>
        <header id="header" className="header">
            <NavBar/>
        </header>
        <main id="main">
            <div className="container">
              {
                products.map((product, index) => {
                  if(product.id === id_product) {
                    return <ProDetail key={index} product={product}/>
                  }
                })
              }
                {/* <RelatedProduct/> */}
                {/* <Products /> */}
            </ div>
            <Facility/>
        </ main>
        <Footer/>
    </>
  );
}

export default ProductDetail;