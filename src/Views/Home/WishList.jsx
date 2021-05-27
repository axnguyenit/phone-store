
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { Products } from "../../components/Products";
import NavBar from '../../components/Header/NavBar';
// const NavBar = React.lazy(() => import ('../../components/Header/NavBar'));
const Contact = React.lazy(() => import ('../../components/Contact/index'));
const Facility = React.lazy(() => import('../../components/Facility'));
const Footer = React.lazy(() => import('../../components/Footer'));
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
        <header id="header" className="header">
            <NavBar/>
        </header>
        <main id="main" className="mt-70">
            <Products products={wishlist}/>
            <Contact/>
            <Facility/>
        </ main>
        <Footer/>
    </>
  );
}

export default WishList;