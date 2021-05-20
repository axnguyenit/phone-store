import React, { useState } from 'react';

import CustomCard from '../CustomCard';

export const Products = ({products}) => {
    const [searchTerm, setSearchTerm] = useState();
    // console.log(Object.keys(products));

    return (
        <div className="container">
            <section className="category__section section" id="category">
                <div className="tab__list">
                    <div className="title__container tabs">
                        <div className="search-field">
                            <input type="text" placeholder="Search here..." onChange={(e) => setSearchTerm(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="category__container">
                    <div className="category__center">
                        {
                            products.map( (product, index) => <CustomCard key={index}  product={product} /> )
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}
