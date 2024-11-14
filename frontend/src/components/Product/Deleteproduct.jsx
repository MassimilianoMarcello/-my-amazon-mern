import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const deleteProduct = async () => {
            try {
                const response = await axios.delete(`http://localhost:5004/api/products/${id}`);
                if (response.status === 200) {
                    console.log('Product deleted');
                    navigate('/products'); // Reindirizza alla pagina principale
                } else {
                    console.error('Failed to delete product:', response.data.message);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        };

        deleteProduct();
    }, [id, navigate]);

    return (
        <div>
            <p>Deleting product...</p>
        </div>
    );
};

export default DeleteProduct;