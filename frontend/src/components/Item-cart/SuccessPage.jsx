import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SuccessPage = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const { items, totalPrice, userId } = location.state || {}; // Assicurati che l'ID utente sia passato nella location state
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (userId) {
            // Fai la richiesta per ottenere i dati dell'utente
         axios.get(`/users/${userId}`, { withCredentials: true })
                .then((response) => {
                    setUserInfo(response.data);
                })
                .catch((error) => {
                    console.error("Errore nel recupero dei dati utente:", error);
                });
        }
    }, [userId]);

    return (
        <div>
            <h1>Payment Successful!</h1>
            <h2>Thank you for your purchase.</h2>

            {userInfo && (
                <h3>Your order will be shipped to {userInfo.firstName} {userInfo.lastName} at {userInfo.address} within 48 hours.</h3>
            )}

            <h3>Your Order Summary</h3>
            {items && items.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price.toFixed(2)} €</td>
                                <td>{(item.price * item.quantity).toFixed(2)} €</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3"><strong>Total</strong></td>
                            <td><strong>{totalPrice.toFixed(2)} €</strong></td>
                        </tr>
                    </tfoot>
                </table>
            ) : (
                <p>Your cart was empty.</p>
            )}

            <button onClick={() => navigate('/')}>Go back to Shopping</button>
        </div>
    );
};

export default SuccessPage;
