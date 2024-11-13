import  { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5004/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="product-details">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button className="add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    );
};

ProductDetails.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }),
};

export default ProductDetails;