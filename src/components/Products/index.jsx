import React from 'react';

import CustomCard from '../CustomCard';

export const Products = ({products}) => {
    return (
        <>
            <section className="category__section section" id="category">
                <div className="tab__list">
                <div className="title__container tabs">
                    <div className="section__titles category__titles ">
                    <div className="section__title filter-btn active" data-id="All Products">
                        <span className="dot" />
                        <h1 className="primary__title">All Products</h1>
                    </div>
                    </div>
                    <div className="section__titles">
                    <div className="section__title filter-btn" data-id="Trending Products">
                        <span className="dot" />
                        <h1 className="primary__title">Trending Products</h1>
                    </div>
                    </div>
                    <div className="section__titles">
                    <div className="section__title filter-btn" data-id="Special Products">
                        <span className="dot" />
                        <h1 className="primary__title">Special Products</h1>
                    </div>
                    </div>
                    <div className="section__titles">
                    <div className="section__title filter-btn" data-id="Featured Products">
                        <span className="dot" />
                        <h1 className="primary__title">Featured Products</h1>
                    </div>
                    </div>
                </div>
                </div>
                <div className="category__container">
                <div className="category__center">
                    {products.map((product, index) => {
                        return <CustomCard
                                    key={index}
                                    product={product}
                                />
                    })}
                </div>
                </div>
            </section>
        </>
    )
}
