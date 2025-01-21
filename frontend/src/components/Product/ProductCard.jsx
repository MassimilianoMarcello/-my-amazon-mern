import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const discountedPrice = product.price - (product.price * (product.discount / 100));

    return (
        <div className="product-card">
        {product.discount > 0 && (
            <div className="discount-badge">{product.discount}% OFF</div>
        )}
        <img src={product.mainImage} alt={product.title} className="product-image" />
        <div className="product-info">
            <h2 className="product-title">{product.title}</h2>
            <div className="product-prices">
                {product.discount > 0 ? (
                    <>
                        <p className="original-price">${product.price.toFixed(2)}</p>
                        <p className="discounted-price">${discountedPrice.toFixed(2)}</p>
                    </>
                ) : (
                    <p className="discounted-price">${product.price.toFixed(2)}</p>
                )}
            </div>
            <Link to={`/products/${product._id}`} className="details-link">
                View Details
            </Link>
        </div>
    </div>
    
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        mainImage: PropTypes.string.isRequired,
        discount: PropTypes.number
    }).isRequired,
};

export default ProductCard;