import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductCard from '../Product/ProductCard';
import './DiscountedProducts.css';

const DiscountedProducts = () => {
    const [bestDeals, setBestDeals] = useState([]);
    const [otherDeals, setOtherDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchDiscountedProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/products/products/discounted');
                const products = response.data;

                // Ordina i prodotti per sconto decrescente
                products.sort((a, b) => b.discount - a.discount);

                // Prendi i primi 4 migliori affari
                const bestDeals = products.slice(0, 4);
                const otherDeals = products.slice(4);

                setBestDeals(bestDeals);
                setOtherDeals(otherDeals);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscountedProducts();
    }, []);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="discounted-products">
            <h1>Best Deals</h1>
            <div className='best-deals-main-container'>
           <div className='texts-container'>
<h1>November:Mega Deals</h1>
<p>Get ready for the biggest sale of the year! Save big on electronics, gadgets, and more.</p>
           </div>
         <div className="best-deals-grid">
                
                {bestDeals.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            </div>
           
            <h2>Other Deals</h2>
            <div className="carousel-container">
                <button className="carousel-button left" onClick={scrollLeft}>&lt;</button>
                <div className="other-deals-carousel" ref={carouselRef}>
                    {otherDeals.map(product => (
                        <div key={product._id} className="carousel-item">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                <button className="carousel-button right" onClick={scrollRight}>&gt;</button>
            </div>
        </div>
    );
};

export default DiscountedProducts;