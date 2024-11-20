import PropTypes from 'prop-types';
import  './CartComponents.css';

const CartItem = ({ item, onQuantityChange, onDelete }) => (
    <tr key={item._id}>
        <td>{item.title}</td>
        <td>
            <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => onQuantityChange(item._id, Number(e.target.value))}
            />
        </td>
        <td>{item.price.toFixed(2)} €</td>
        <td>{(item.price * item.quantity).toFixed(2)} €</td>
        <td>
            <button onClick={() => onDelete(item._id)}>Delete</button>
        </td>
    </tr>
);

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CartItem;
