import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Form.css'; // Importa il file CSS

const UpdateProduct = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Smartphones');
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState(['']);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5004/api/products/${id}`);
                const product = response.data;
                setTitle(product.title);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category);
                setMainImage(product.mainImage);
                setImages(product.images);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = { title, description, price, category, mainImage, images };

        try {
            const response = await axios.put(`http://localhost:5004/api/products/${id}`, product, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Product updated:', response.data);
        } catch (error) {
            console.error('Error updating product:', error);
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
            <button type="submit">Update Product</button>
        </form>
    );
};

export default UpdateProduct;