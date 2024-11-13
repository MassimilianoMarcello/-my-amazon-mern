
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">${product.price.toFixed(2)}</p>
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
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductCard;