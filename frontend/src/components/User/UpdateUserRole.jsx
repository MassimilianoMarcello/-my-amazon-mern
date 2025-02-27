import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const UpdateUserRole = ({ userId, currentRole, onRoleChange }) => {
    const [role, setRole] = useState(currentRole);
    const [message, setMessage] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';
    

    const handleRoleChange = async () => {
        try {
            const response = await axios.put(` ${apiUrl}/users/${userId}/role`, { role } , { withCredentials: true });
            setMessage(`Role updated to ${response.data.role}`);
            onRoleChange(userId, response.data.role); // Aggiorna il ruolo nella lista
        } catch (error) {
            setMessage(`Error: ${error.response.data.message}`);
        }
    };

    return (
        <div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={handleRoleChange}>Update Role</button>
            {message && <p>{message}</p>}
        </div>
    );
};

UpdateUserRole.propTypes = {
    userId: PropTypes.string.isRequired,
    currentRole: PropTypes.string.isRequired,
    onRoleChange: PropTypes.func.isRequired,
};

export default UpdateUserRole;

