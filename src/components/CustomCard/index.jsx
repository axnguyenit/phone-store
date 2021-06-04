import axios from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_USERS_URL = `http://localhost:4000/api/users`;
const API_WISHLIST_URL = `http://localhost:4000/api/wishlist`;

toast.configure();
const CustomCard = ({product}) => {
    const to_slug = (str) => {
        str = str.toLowerCase();
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');
        str = str.replace(/([^0-9a-z-\s])/g, '');
        str = str.replace(/(\s+)/g, '-');
        str = str.replace(/^-+/g, '');
        str = str.replace(/-+$/g, '');
        return str;
    }

    // function add an item to the basket
    const addToBasket = (item) => {
        let itemAdd = {
            id: item.id,
            quantity: 1,
            unitPrice: item.price.raw,
            total: item.price.raw,
        }
        const nameItem = item.name;
        console.log(item.quantity);
        console.log(typeof item.quantity);
    
        if(localStorage.getItem('basket')) {
            //add to basket
            let basket = JSON.parse(localStorage.getItem('basket'));
            const itemBasket = basket.find( item => item.id === itemAdd.id );
    
            //if basket contain item => item quantity =+ 1
            if(itemBasket) {
                if(item.inventory.available === 0) {
                  toast.info(`Sorry, item ${nameItem} is currently out of stock!`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
                else {
                  toast.success(`Add ${nameItem} to the basket successfully!`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  let itemTerm = itemBasket;
                  itemTerm.quantity += 1;
                  let totalPrice = itemTerm.quantity * itemTerm.total;
                  itemTerm.total = totalPrice;
                  //find index of add item in basket to change quantity
                  let index = basket.indexOf(itemBasket);
                  basket[index] = itemTerm;
                  localStorage.setItem('basket', JSON.stringify(basket));
                }
            }
            else {
              if(item.inventory.available === 0) {
                toast.info(`Sorry, item ${nameItem} is currently out of stock!`, {
                  position: "bottom-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
              else {
                toast.success(`Add ${nameItem} to the basket successfully!`, {
                    position: "bottom-left",
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
        }
        else {
          if(item.inventory.available === 0) {
            toast.info(`Sorry, item ${nameItem} is currently out of stock!`, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          else {
            let basket = new Array();
            toast.success(`Add ${nameItem} to the basket successfully!`, {
                position: "bottom-left",
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
    }

    // function add an item to the wishlist
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
                            position: "bottom-left",
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
                            position: "bottom-left",
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
                            position: "bottom-left",
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
                position: "bottom-left",
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
        <>
            <div className="product category__products">
                <div className="product__header">
                    <img src={product.media.source} alt="product" />
                </div>
                <div className="product__footer">
                    <h3>{product.price.formatted_with_symbol}</h3>
                    <div className="product__price">
                        <h4>{product.name}</h4>
                    </div>
                </div>
                <ul>
                    <li>
                        <Link data-tip="Quick View" data-place="left" to={"detail" + "/" + product.id + "/" + to_slug(product.name)}>
                            <svg>
                                <use xlinkHref="./images/sprite.svg#icon-eye" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <a data-tip="Add To Wishlist" data-place="left" onClick={() => addToWishlist(product)}>
                            <svg>
                                <use xlinkHref="./images/sprite.svg#icon-heart-o"/>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a data-tip="Add To Compare" data-place="left" onClick={() => addToBasket(product)}>
                            <svg>
                                <use xlinkHref="./images/sprite.svg#icon-cart-plus" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default CustomCard;