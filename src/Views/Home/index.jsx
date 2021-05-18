import React from "react";
import Contact from "../../components/Contact";
// import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Products } from "../../components/Products";
import commerce from '../../lib/commerce';

const Facility = React.lazy(() => import('../../components/Facility'));
const Footer = React.lazy(() => import('../../components/Footer'));

function Home(products) {
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