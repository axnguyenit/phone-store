import React, { useState } from 'react';

import CustomCard from '../CustomCard';

export const Products = ({products}) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="container">
            <section className="category__section section" id="category">
                <div className="tab__list">
                    <div className="title__container tabs">
                        <div className="search-field">
                            <input type="text" value={searchTerm} placeholder="Search here..." onChange={e => setSearchTerm(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="category__container">
                    <div className="category__center">
                        {
                            products.filter(product => {
                                if(searchTerm === '') {
                                    console.log(product);
                                    return product;
                                }
                                else if(product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    console.log(product);
                                    return product;
                                }
                            }).map( (product, index) => <CustomCard key={index}  product={product} /> )
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}
