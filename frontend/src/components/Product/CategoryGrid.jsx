import { Link } from 'react-router-dom';
import './Category.css';
import './ProductCard.css';

const categories = [
    'Generic',
    'Smartphones',
    'Laptops',
    'Tablets',
    'Accessories',
    'Wearables'
];

const CategoryGrid = () => {
    return (
        <div className="category-grid">
            {categories.map(category => (
                <Link to={`/category/${category}`} key={category} className="category-card">
                    <h2>{category}</h2>
                </Link>
            ))}
        </div>
    );
};

export default CategoryGrid;