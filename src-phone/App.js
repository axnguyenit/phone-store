import { useState, useEffect } from "react";
import { Contact } from "./components/Contact";
import { Facility } from "./components/Facility";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Products } from "./components/Products";
// import './css/styles.css';


function App() {
  
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

export default App;
