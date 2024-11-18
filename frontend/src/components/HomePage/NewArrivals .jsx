import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../Product/ProductCard';
import './NewArrivals.css';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/products/this-products/new-arrivals');
                setProducts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="new-arrivals">
            <h2>New Arrivals</h2>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;