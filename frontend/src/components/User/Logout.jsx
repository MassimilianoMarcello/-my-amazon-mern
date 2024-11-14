import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await axios.post('http://localhost:5004/api/logout');
                sessionStorage.removeItem('userId'); // Rimuove l'ID dell'utente dal session storage
                navigate('/login'); // Reindirizza alla pagina di login
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;