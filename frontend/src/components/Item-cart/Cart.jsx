import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';

const Cart = ({ setCartItemCount }) => {
    const userId = sessionStorage.getItem('userId');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

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
                    setItems([]); // Imposta una lista vuota se il carrello è vuoto
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
        if (newQuantity < 1) return; // Prevenire quantità non valida

        try {
            const response = await axios.put(
                `http://localhost:5004/api/items/${itemId}`,
                { quantity: newQuantity },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const updatedItem = response.data.item;
                // Aggiorna l'array items localmente
                const updatedItems = items.map(item =>
                    item._id === itemId ? updatedItem : item
                );
                setItems(updatedItems);

                // Ricalcola e aggiorna il conteggio degli articoli
                const totalItemCount = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
                setCartItemCount(totalItemCount);
            } else {
                setError("Failed to update item quantity");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // Delete an item from the cart
    const handleDelete = async (itemId) => {
        if (window.confirm("Are you sure you want to remove this item from your cart?")) {
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
        }
    };

    // Checkout
    const handleCheckout = async () => {
        try {
            // Calcola il totale del carrello
            const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

            // Chiedi al backend di creare un pagamento e ottenere il client_secret
            const response = await axios.post('http://localhost:5004/api/payments', {
                amount: totalPrice,
            }, { withCredentials: true });

            const clientSecret = response.data.client_secret;

            // Usa il client_secret per iniziare il pagamento con Stripe
            const cardElement = elements.getElement(CardElement);
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setError(`Payment failed: ${error.message}`);
            } else {
                alert("Payment successful!");
                setItems([]); // Resetta il carrello
                setCartItemCount(0); // Resetta il conteggio degli articoli nel carrello
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError("Payment initiation failed");
        }
    };

    // Calcola il totale del carrello
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
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
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
            )}
            <CardElement />
            <button onClick={handleCheckout} disabled={items.length === 0}>Checkout</button>
        </div>
    );
};

Cart.propTypes = {
    setCartItemCount: PropTypes.func.isRequired,
};

export default Cart;










