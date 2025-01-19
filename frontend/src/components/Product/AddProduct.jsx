import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const CreateProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Smartphones');
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState(['']);
    const [discount, setDiscount] = useState(0);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isRecommended, setIsRecommended] = useState(false);
    const [isDailyDeal, setIsDailyDeal] = useState(false);
    const [isNerArrivals, setIsNewArrivals] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';
  

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = { title, description, price, category, mainImage, images ,discount,isFeatured,isRecommended,isDailyDeal,isNerArrivals};

        try {
            const response = await axios.post(`${apiUrl}/products`, product, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Product created:', response.data);
            navigate('/products'); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddImage = () => {
        setImages([...images, '']);
    };

    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Generic">Generic</option>
                </select>
            </div>
            <div>
                <label>Main Image URL:</label>
                <input type="text" value={mainImage} onChange={(e) => setMainImage(e.target.value)} required />
            </div>
            <div>
                <label>Additional Images URLs:</label>
                {images.map((image, index) => (
                    <div key={index} className="image-input">
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => {
                                const newImages = [...images];
                                newImages[index] = e.target.value;
                                setImages(newImages);
                            }}
                            required
                        />
                        <button type="button" onClick={() => handleRemoveImage(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddImage}>
                    Add Image
                </button>
            </div>
            <div>
                <label>Discount (%):</label>
                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} min="0" max="100" />
            </div>
            <div>
                <label>Featured:</label>
                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            </div>
            <div>
                <label>Recommended:</label>
                <input type="checkbox" checked={isRecommended} onChange={(e) => setIsRecommended(e.target.checked)} />
            </div>
            <div>
                <label>Daily Deal:</label>
                <input type="checkbox" checked={isDailyDeal} onChange={(e) => setIsDailyDeal(e.target.checked)} />
            </div>
            <div>
                <label>New Arrivals:</label>
                <input type="checkbox" checked={isNerArrivals} onChange={(e) => setIsNewArrivals(e.target.checked)} />
            </div>
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProduct;