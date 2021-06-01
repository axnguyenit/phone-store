
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import Products from "../components/Products";
import NavBar from '../components/Header/NavBar';
import Contact from "../components/Contact";
import Facility from '../components/Facility';
import Footer from '../components/Footer';
const API_USERS_URL = `http://localhost:4000/api/users`;


const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = () => {
    if(localStorage.getItem('products')) {
      let products = JSON.parse(localStorage.getItem('products'));
      if(localStorage.getItem('userID')) {
        const userID = JSON.parse(localStorage.getItem('userID'));
        axios.get(API_USERS_URL + '/' + userID + '/wishlist').then(res => {
          let wishlist = res.data[0].details;
          let wishlistTerm = [];

          wishlist.map(wishlistItem => {
            products.map(product => {
              if(wishlistItem.id === product.id) {
                wishlistTerm.push(product);
              }
            })
          })
          setWishlist(wishlistTerm);
        })
      }
    }
  }

  useEffect(() => {
    fetchWishlist();
  });
  
  return (
    <>
      <NavBar/>
      <main id="main" className="mt-70">
        <Products products={wishlist}/>
      </main>
      <Facility/>
      <Contact/>
      <Footer/>
    </>
  );
}

export default WishList;