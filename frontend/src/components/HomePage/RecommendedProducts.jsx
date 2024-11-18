import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../Product/ProductCard';
import './RecommendedProducts.css';

const RecommendedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendedProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/products/recommended');
                setProducts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="recommended-products">
            <h2>Recommended Products</h2>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedProducts;