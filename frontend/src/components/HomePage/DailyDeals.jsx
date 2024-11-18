import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../Product/ProductCard';
import './DailyDeals.css';

const DailyDeals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDailyDeals = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/products/daily-deals');
                setProducts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDailyDeals();
    }, []);

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
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default DailyDeals;