import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../Product/ProductCard';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/products/products/isfeatured');
                setProducts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="featured-products">
            <h2>Featured Products</h2>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;