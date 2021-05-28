import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const API_USERS_URL = `http://localhost:4000/api/users`;
const API_WISHLIST_URL = `http://localhost:4000/api/wishlist`;

export const ProDetail = ({product}) => {
  const addToBasket = (item) => {
    let itemAdd = {
        id: item.id,
        quantity: 1,
        unitPrice: item.price.raw,
        total: item.price.raw,
    }

    const nameItem = item.name;

    if(localStorage.getItem('basket')) {
        //add to basket
        let basket = JSON.parse(localStorage.getItem('basket'));
        const item = basket.find( item => item.id === itemAdd.id );

        //if basket contain item => item quantity =+ 1
        if(item) {
            toast.success(`Add ${nameItem} to the basket successfully!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            let itemTerm = item;
            itemTerm.quantity += 1;
            let totalPrice = itemTerm.quantity * itemTerm.total;
            itemTerm.total = totalPrice;
            //find index of add item in basket to change quantity
            let index = basket.indexOf(item);
            basket[index] = itemTerm;
            localStorage.setItem('basket', JSON.stringify(basket));
        }
        else {
            toast.success(`Add ${nameItem} to the basket successfully!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            basket.push(itemAdd);
            localStorage.setItem('basket', JSON.stringify(basket));
        }
    }
    else {
        let basket = new Array();

        toast.success(`Add ${nameItem} to the basket successfully!`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        basket.push(itemAdd);
        localStorage.setItem('basket', JSON.stringify(basket));
    }
  }

  const addToWishlist = (item) => {
    if(localStorage.getItem('userID')) {
        const userID = JSON.parse(localStorage.getItem('userID'));
        axios.get(API_USERS_URL + '/' + userID + '/wishlist').then(res => {
            let wishlist = res.data[0].details;

            let nameItem = '';
            if(localStorage.getItem('products')) {
                let products = JSON.parse(localStorage.getItem('products'));
                nameItem = products.find(product => product.id === item.id).name;
            }

            // the wishlist isn't empty
            if(wishlist.length > 0) {
                console.log(wishlist);
                const wishlistItem = wishlist.find(wishlistItem => wishlistItem.id === item.id);

                if(wishlistItem) {
                    const index = wishlist.indexOf(wishlistItem);
                    wishlist.splice(index, 1);
                    toast.warn(`Remove ${nameItem} from the wishlist successfully!`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    wishlist.push({
                        id: item.id,
                    });
                    toast.success(`Add ${nameItem} to the wishlist successfully!`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                let wishlistTerm = res.data[0];
                axios.put(API_WISHLIST_URL + '/' + wishlistTerm.id, wishlistTerm).then(res => {});
            }
            // the wishlist is empty => create new wishlist => add the item to the wishlist
            else {
                wishlist.push({
                    id: item.id,
                });
                let wishlistTerm = res.data[0];
                axios.put(API_WISHLIST_URL + '/' + wishlistTerm.id, wishlistTerm).then(res => {
                    toast.success(`Add ${nameItem} to the wishlist successfully!`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            }
        })
    }
    else {
        toast.warn('Please, log in before adding the item to your wishlist!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
  }

    return (
      <div className="container">
        <section className="mt-70 section product-details__section">
        <div className="product-detail__container">
          <div className="product-detail__left">
            <div className="details__container--left">
              <div className="product__picture" id="product__picture">
                <div className="rect" id="rect"></div>
                <div className="picture__container">
                  <img src={product.media.source} id="pic" />
                </div>
              </div>
              <div className="zoom" id="zoom" />
            </div>
            <div className="product-details__btn">
              <a className="add" onClick={() => addToBasket(product)}>
                <span>
                  <i class="fas fa-cart-plus"></i>
                </span> ADD TO CART</a>
              <a className="wishlist" onClick={() => addToWishlist(product)}>
                <span>
                  <i class="far fa-heart"></i>
                </span> ADD TO WISHLIST
              </a>
            </div>
          </div>
          <div className="product-detail__right">
            <div className="product-detail__content">
              <h3>{product.name}</h3>
              <div className="price">
                <span className="new__price">{product.price.formatted_with_symbol}</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a doloribus iste natus et facere? dolor sit amet consectetur adipisicing elit. Sunt a doloribus iste natus et facere?
              </p>
              <div className="product__info-container">
                <ul className="product__info">
                  <li>
                    <span>Subtotal: {product.price.formatted_with_symbol}</span>
                  </li>
                  <li>
                    <span>Brand: {product.categories[0].name}</span>
                  </li>
                  <li>
                    <span>Availability: In Stock (7 Items)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
}

