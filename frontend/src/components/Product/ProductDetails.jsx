import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5004/api/products/${id}`);
                setProduct(response.data);
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

    const discountedPrice = product.price - (product.price * (product.discount / 100));

    return (
        <div className="product-details">
            <img src={product.mainImage} alt={product.title} className="product-main-image" />
            <div className="product-info">
                <h1 className="product-title">{product.title}</h1>
                {product.discount > 0 ? (
                    <div>
                        <p className="product-price original-price">${product.price.toFixed(2)}</p>
                        <p className="product-price discounted-price">${discountedPrice.toFixed(2)}</p>
                    </div>
                ) : (
                    <p className="product-price">${product.price.toFixed(2)}</p>
                )}
                <p className="product-description">{product.description}</p>
            </div>
        </div>
    );
};

export default ProductDetails;


{/* <button className="delete-product-button" onClick={() => navigate(`/delete-product/${id}`)}>Delete</button> */}


// http://localhost:5004     



// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './ProductDetails.css';

// const ProductDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [mainImage, setMainImage] = useState('');

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5004/api/products/${id}`);
//                 setProduct(response.data);
//                 setMainImage(response.data.mainImage); // Imposta l'immagine principale
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [id]);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     const handleDelete = async () => {
//         if (window.confirm("Are you sure you want to delete this product?")) {
//             try {
//                 const response = await axios.delete(`http://localhost:5004/api/products/${id}`);
//                 if (response.status === 200) {
//                     console.log('Product deleted');
//                     navigate('/products'); // Reindirizza alla lista dei prodotti
//                 } else {
//                     console.error('Failed to delete product');
//                 }
//             } catch (error) {
//                 console.error('Error deleting product:', error);
//             }
//         }
//     };

//     return (
//         <div className="product-details">
//             <img src={mainImage} alt={product.title} className="product-main-image" />
//             <div className="product-thumbnails">
//                 {product.images.map((image, index) => (
//                     <img
//                         key={index}
//                         src={image}
//                         alt={`${product.title} thumbnail ${index + 1}`}
//                         className="product-thumbnail"
//                         onClick={() => setMainImage(image)}
//                     />
//                 ))}
//             </div>
//             <div className="product-info">
//                 <h2 className="product-title">{product.title}</h2>
//                 <p className="product-description">{product.description}</p>
//                 <p className="product-category">Category: {product.category}</p>
//                 <p className="product-price">${product.price.toFixed(2)}</p>
//                 <button className="add-to-cart-button">Add to Cart</button>
//                 <button className="edit-product-button" onClick={() => navigate(`/update-product/${id}`)}>Edit</button>
//                 <button className="delete-product-button" onClick={handleDelete}>Delete</button>
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;
