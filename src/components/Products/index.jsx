import React, { useState } from 'react';

import CustomCard from '../CustomCard';

const Products = ({products}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const sort = () => {
        return 0.5 - Math.random();
    }

    products = products.sort(sort);

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
                                    return product;
                                }
                                else if(product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return product;
                                }
                            }).map((product, index) => {
                                if(index <= 11) {
                                    return <CustomCard key={index}  product={product} />
                                }
                                else {
                                    return;
                                }
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Products;