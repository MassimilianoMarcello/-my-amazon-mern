import { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
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
                if (Array.isArray(response.data)) {
                    setItems(response.data);
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
    }, [userId]);

    // Update quantity of an item
    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            const response = await axios.put(
                `http://localhost:5004/api/items/${itemId}`,
                { quantity: newQuantity },
                { withCredentials: true }
            );
            const updatedItem = response.data.item;
            setItems(items.map(item => (item._id === itemId ? updatedItem : item)));
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
            setItems(items.filter(item => item._id !== itemId));
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

export default Cart;




