import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const { items, totalPrice } = location.state || {}; // Get data passed from checkout page

    return (
        <div>
            <h1>Payment Successful!</h1>
            <h2>Thank you for your purchase.</h2>

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

            <button onClick={() => window.location.href = '/'}>Go back to Shopping</button>
        </div>
    );
};

export default SuccessPage;
