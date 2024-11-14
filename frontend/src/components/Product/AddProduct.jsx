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
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = { title, description, price, category, mainImage, images };

        try {
            const response = await axios.post('http://localhost:5004/api/products', product, {
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
                </select>
            </div>
            <div>
                <label>Main Image URL:</label>
                <input type="text" value={mainImage} onChange={(e) => setMainImage(e.target.value)} required />
            </div>
            <div>
                <label>Additional Images URLs:</label>
                {images.map((image, index) => (
                    <input
                        key={index}
                        type="text"
                        value={image}
                        onChange={(e) => {
                            const newImages = [...images];
                            newImages[index] = e.target.value;
                            setImages(newImages);
                        }}
                        required
                    />
                ))}
                <button type="button" onClick={() => setImages([...images, ''])}>
                    Add Image
                </button>
            </div>
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProduct;