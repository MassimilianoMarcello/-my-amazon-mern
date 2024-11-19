import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import PropTypes from 'prop-types';

const ProductDetails = ({ setCartItemCount }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [message, setMessage] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const newQuantity = Number(e.target.value);
        if (newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5004/api/products/${id}`
                );
                setProduct(response.data);
                setMainImage(response.data.mainImage); // Imposta l'immagine principale
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            setMessage("Please log in to add items to your cart.");
            return;
        }
    
        try {
            const response = await axios.post(
                'http://localhost:5004/api/items/add',
                {
                    title: product.title,
                    price: product.price,
                    quantity,
                    user_id: userId,
                },
                { withCredentials: true }
            );
    
            if (response.status === 201 || response.status === 200) {
                setMessage(`Item added to cart successfully. Quantity added: ${response.data.addedQuantity}`);
                
                // Aggiorna il conteggio degli articoli nel carrello nel componente principale
                setCartItemCount(response.data.totalItemCount);
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setMessage("Failed to add item to cart. Please try again.");
        }
    };
    
    
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const discountedPrice =
        product.price - product.price * (product.discount / 100);

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
                <img
                    src={mainImage}
                    alt={product.title}
                    className="product-main-image"
                />
                <div className="product-buttons">
                    <input
                        type="number"
                        value={quantity}
                        min="1"
                        step="1"
                        onChange={handleQuantityChange}
                    />

                    <button
                        className="add-to-cart-button"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <button
                        className="edit-product-button"
                        onClick={() => navigate(`/update-product/${id}`)}
                    >
                        Edit
                    </button>
                    <button
                        className="delete-product-button"
                        onClick={() => navigate(`/delete-product/${id}`)}
                    >
                        Delete
                    </button>
                </div>
                {message && <p>{message}</p>}
            </div>
            <div className="product-info">
                <h1 className="product-title">{product.title}</h1>
                {product.discount > 0 ? (
                    <div>
                        <p className="product-price original-price">
                            ${product.price.toFixed(2)}
                        </p>
                        <p className="product-price discounted-price">
                            ${discountedPrice.toFixed(2)}
                        </p>
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
