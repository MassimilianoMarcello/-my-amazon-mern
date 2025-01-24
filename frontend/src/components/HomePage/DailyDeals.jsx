import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../Product/ProductCard';
import './DailyDeals.css';

const DailyDeals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';
    

    useEffect(() => {
        const fetchDailyDeals = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products/daily-deals`);
                setProducts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDailyDeals();
    }, [apiUrl]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="daily-deals">
            <h2>Daily Deals</h2>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} variant="daily-deals" />
                ))}
            </div>
        </div>
    );
};

export default DailyDeals;