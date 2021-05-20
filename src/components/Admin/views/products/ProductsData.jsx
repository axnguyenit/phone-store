import { useState, useEffect } from "react";
import commerce from '../../lib/commerce';

function Home() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async() => {
        const res = await commerce.products.list();
        setProducts((res && res.data) || []);
    }

    // setTimeout((fetchProducts()),1000)
    const saveProducts = () => {
        localStorage.setItem('products', JSON.stringify(products));
    }

    useEffect(() => {
        fetchProducts();
        saveProducts();
    });

    return(
        <>
        
        </>
    );
};