import { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerReviews.css';

const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';
    

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${apiUrl}/reviews`);
                setReviews(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [apiUrl]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="customer-reviews">
            <h2>Customer Reviews</h2>
            <div className="reviews-grid">
                {reviews.map(review => (
                    <div key={review._id} className="review-card">
                        <p><strong>{review.customerName}</strong></p>
                        <p>{review.comment}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerReviews;