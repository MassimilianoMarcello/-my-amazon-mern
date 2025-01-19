import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import PropTypes from 'prop-types';

const ProductDetails = ({ setCartItemCount }) => {
    const userId = sessionStorage.getItem('userId');
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [message, setMessage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';

    const handleQuantityChange = (e) => {
        const newQuantity = Number(e.target.value);
        if (newQuantity > 0) setQuantity(newQuantity);
    };

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await axios.get(`${apiUrl}/users/${userId}`, { withCredentials: true });
                if (res.status === 200 && res.data.role === 'admin') setIsAdmin(true);
            } catch (err) {
                console.log(err);
            }
        };

        if (userId) {
            setIsLoggedIn(true);
            checkAdmin();
        }
    }, [userId, apiUrl]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products/${id}`);
                setProduct(response.data);
                setMainImage(response.data.mainImage);
            } catch (error) {
                setError(error.message || "An error occurred while fetching the product details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, apiUrl]);

    const handleAddToCart = async () => {
        if (!userId) {
            alert("Please log in to add items to your cart.");
            return;
        }

        try {
            const response = await axios.post(
                `${apiUrl}/items/add`,
                {
                    product_id: id,
                    price: product.price,
                    quantity,
                    user_id: userId
                },
                { withCredentials: true }
            );

            if (response.status === 201 || response.status === 200) {
                setMessage('Item added to cart!');
                
                const cartResponse = await axios.get(`${apiUrl}/items/items/user/${userId}`, { withCredentials: true });
                const totalItemCount = cartResponse.data.reduce((acc, item) => acc + item.quantity, 0);
                setCartItemCount(totalItemCount);
                setQuantity(1);
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            setMessage('Failed to add item to cart.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const discountedPrice = product.price - product.price * (product.discount / 100);

    return (
        <div className="product-details">
            <div className="product-thumbnails">
                <img
                    src={product.mainImage}
                    alt={`${product.title} main`}
                    className="product-thumbnail"
                    onClick={() => setMainImage(product.mainImage)}
                />
                {product.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        className="product-thumbnail"
                        onClick={() => setMainImage(image)}
                    />
                ))}
            </div>
            <div>
                <img src={mainImage} alt={product.title} className="product-main-image" />
                <div className="product-buttons">
                    {isLoggedIn && (
                        <>
                            <input
                                type="number"
                                value={quantity}
                                min="1"
                                step="1"
                                onChange={handleQuantityChange}
                            />
                            <button className="add-to-cart-button" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <button className="edit-product-button" onClick={() => navigate(`/update-product/${id}`)}>
                                Edit
                            </button>
                            <button className="delete-product-button" onClick={() => navigate(`/delete-product/${id}`)}>
                                Delete
                            </button>
                        </>
                    )}
                </div>
                {message && <p>{message}</p>}
            </div>
            <div className="product-info">
                <h1 className="product-title">{product.title}</h1>
                {product.discount > 0 ? (
                    <div>
                        <p className="product-price original-price">${product.price.toFixed(2)}</p>
                        <p className="product-price discounted-price">${discountedPrice.toFixed(2)}</p>
                    </div>
                ) : (
                    <p className="product-price">${product.price.toFixed(2)}</p>
                )}
                <p className="product-description">{product.description}</p>
                <p className="product-category">Category: {product.category}</p>
            </div>
        </div>
    );
};

ProductDetails.propTypes = {
    setCartItemCount: PropTypes.func.isRequired
};

export default ProductDetails;


