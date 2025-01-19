import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import './CartComponents.css';

const Cart = ({ setCartItemCount }) => {
    const userId = sessionStorage.getItem('userId');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';

    // Fetch cart items
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(
                    `   ${apiUrl}/items/items/user/${userId}`,
                    {
                        withCredentials: true
                    }
                );
                if (response.status === 200 && response.data.length > 0) {
                    setItems(response.data);
                    const totalItemCount = response.data.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                    );
                    setCartItemCount(totalItemCount);
                } else {
                    setItems([]);
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
    }, [userId, setCartItemCount, apiUrl]);

    // Update quantity of an item
    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            const response = await axios.put(
                `   ${apiUrl}/items/${itemId}`,
                { quantity: newQuantity },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const updatedItem = response.data.item;
                const updatedItems = items.map((item) =>
                    item._id === itemId ? updatedItem : item
                );
                setItems(updatedItems);
                const totalItemCount = updatedItems.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                );
                setCartItemCount(totalItemCount);
            } else {
                setError('Failed to update item quantity');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // Delete an item from the cart
    const handleDelete = async (itemId) => {
        if (
            window.confirm(
                'Are you sure you want to remove this item from your cart?'
            )
        ) {
            try {
                await axios.delete(` ${apiUrl}/items/${itemId}`, {
                    withCredentials: true
                });
                const updatedItems = items.filter(
                    (item) => item._id !== itemId
                );
                setItems(updatedItems);
                const totalItemCount = updatedItems.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                );
                setCartItemCount(totalItemCount);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    // Checkout
    const handleCheckout = async () => {
        try {
            const totalPrice = items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            const response = await axios.post(
                `   ${apiUrl}/payments`,
                {
                    amount: totalPrice
                },
                { withCredentials: true }
            );

            const clientSecret = response.data.client_secret;
            const cardElement = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: { card: cardElement }
                }
            );

            if (error) {
                setError(`Payment failed: ${error.message}`);
                return;
            }

            if (paymentIntent && paymentIntent.status === 'succeeded') {
                alert('Payment successful!');
                navigate('/success', { state: { items, totalPrice } });

                await axios.delete(
                    `   ${apiUrl}/items/items/clearCart/${userId}`,
                    {
                        withCredentials: true
                    }
                );

                setItems([]);
                setCartItemCount(0);
            } else {
                setError('Payment was not completed.');
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError('Error in payment process.');
        }
    };

    const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="cartpage">
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
                        {items.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onQuantityChange={handleQuantityChange}
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <CartSummary
                totalPrice={totalPrice}
                items={items}
                onCheckout={handleCheckout}
            />
        </div>
    );
};

Cart.propTypes = {
    setCartItemCount: PropTypes.func.isRequired
};

export default Cart;
