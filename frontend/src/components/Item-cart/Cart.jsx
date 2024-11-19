import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Cart = ({ setCartItemCount }) => {
    const userId = sessionStorage.getItem('userId');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch cart items
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5004/api/items/items/user/${userId}`, {
                    withCredentials: true,
                });
                if (response.status === 200 && response.data.length > 0) {
                    setItems(response.data);

                    // Calculate and update the cart item count
                    const totalItemCount = response.data.reduce((acc, item) => acc + item.quantity, 0);
                    setCartItemCount(totalItemCount);
                } else {
                    setError('Unexpected response format');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchCartItems();
        } else {
            setLoading(false);
            setError('User ID is not available');
        }
    }, [userId, setCartItemCount]);

    // Update quantity of an item
    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            const response = await axios.put(
                `http://localhost:5004/api/items/${itemId}`,
                { quantity: newQuantity },
                { withCredentials: true }
            );
            const updatedItem = response.data.item;
            const updatedItems = items.map(item => (item._id === itemId ? updatedItem : item));
            setItems(updatedItems);

            // Aggiorna il conteggio degli articoli
            const totalItemCount = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
            setCartItemCount(totalItemCount);
        } catch (error) {
            setError(error.message);
        }
    };

    // Delete an item from the cart
    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5004/api/items/${itemId}`, {
                withCredentials: true,
            });
            const updatedItems = items.filter(item => item._id !== itemId);
            setItems(updatedItems);

            // Aggiorna il conteggio degli articoli
            const totalItemCount = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
            setCartItemCount(totalItemCount);
        } catch (error) {
            setError(error.message);
        }
    };

    // Calculate the total price of the cart
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Your Cart</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                                />
                            </td>
                            <td>{item.price.toFixed(2)} €</td>
                            <td>{(item.price * item.quantity).toFixed(2)} €</td>
                            <td>
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3"><strong>Total</strong></td>
                        <td><strong>{totalPrice.toFixed(2)} €</strong></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

Cart.propTypes = {
    setCartItemCount: PropTypes.func.isRequired,
};

export default Cart;








