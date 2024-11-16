import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Generic');
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState(['']);
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
                setDiscount(product.discount);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5004/api/products/${id}`, {
                title,
                description,
                price,
                category,
                mainImage,
                images,
                discount
            });
            setSuccess('Product updated successfully');
            setError('');
            navigate(`/products/${id}`);
        } catch (error) {
            setError(error.response.data.message);
            setSuccess('');
        }
    };

    return (
        <div className="update-product">
            <h1>Update Product</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="Generic">Generic</option>
                        <option value="Smartphones">Smartphones</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Tablets">Tablets</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Wearables">Wearables</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="mainImage">Main Image URL</label>
                    <input
                        type="text"
                        id="mainImage"
                        value={mainImage}
                        onChange={(e) => setMainImage(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="images">Additional Images (comma separated URLs)</label>
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
                <div className="form-group">
                    <label htmlFor="discount">Discount (%)</label>
                    <input
                        type="number"
                        id="discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        min="0"
                        max="100"
                    />
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;