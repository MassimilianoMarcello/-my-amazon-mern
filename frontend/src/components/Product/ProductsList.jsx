import  { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductList.css';
const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5004/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const query = new URLSearchParams(location.search);
    const category = query.get('category') || 'All';
    const sort = query.get('sort') || 'asc';

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        navigate(`/products?category=${category}&sort=${sort}`);
    };

    const handleSortChange = (e) => {
        const sort = e.target.value;
        navigate(`/products?category=${category}&sort=${sort}`);
    };

    const filteredProducts = category === 'All' ? products : products.filter(product => product.category === category);

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sort === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    return (
        <div>
            <h1>Products: {category}</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="filter">
                <label htmlFor="category">Filter by category:</label>
                <select id="category" value={category} onChange={handleCategoryChange}>
                    <option value="All">All</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Wearables">Wearables</option>
                </select>
                <label htmlFor="sort">Sort by price:</label>
                <select id="sort" value={sort} onChange={handleSortChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div className="products">
                {sortedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsList;