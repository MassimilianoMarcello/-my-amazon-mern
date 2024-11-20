import { CardElement } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import  './CartComponents.css';

const CartSummary = ({ totalPrice, items, onCheckout }) => (
    <div>
        <CardElement />
        <button onClick={onCheckout} disabled={items.length === 0}>Checkout</button>
        <table>
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

CartSummary.propTypes = {
    totalPrice: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired,
    onCheckout: PropTypes.func.isRequired,
};

export default CartSummary;
