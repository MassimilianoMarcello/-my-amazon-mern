import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import './Category.css';


const CategoryProducts = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products/category/${category}`);
                setProducts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, apiUrl]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Products in {category}</h1>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;