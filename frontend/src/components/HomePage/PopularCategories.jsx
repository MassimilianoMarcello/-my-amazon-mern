import { useState, useEffect } from 'react';
import axios from 'axios';
import './PopularCategories.css';

const PopularCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${apiUrl}/categories/popular`);
                setCategories(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [apiUrl]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="popular-categories">
            <h2>Popular Categories</h2>
            <div className="categories-grid">
                {categories.map(category => (
                    <div key={category._id} className="category-card">
                        <h3>{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;