import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, variant = 'default' }) => {
    const discountedPrice = product.price - (product.price * (product.discount / 100));

    return (
        // classname dinamica per la card - in questo caso 'default'
        <div className={`product-card ${variant}`}>
            {product.discount > 0 && (
                <div className={`discount-badge ${variant}`}>{product.discount}% OFF</div>
            )}
            <img src={product.mainImage} alt={product.title} className="product-image" />
            <div className={`product-info ${variant}`}>
                <h2 className={`product-title ${variant}`}>{product.title}</h2>
                <div className={`product-prices ${variant}`}>
                    {product.discount > 0 ? (
                        <>
                            <p className={`original-price ${variant}`}>${product.price.toFixed(2)}</p>
                            <p className={`discounted-price ${variant}`}>${discountedPrice.toFixed(2)}</p>
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
        discount: PropTypes.number,
    }).isRequired,
    variant: PropTypes.string,
};

export default ProductCard;
