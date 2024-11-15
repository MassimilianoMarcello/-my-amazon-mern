import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import matchPasswords from '../../utils/matchPasswords';

import './Forms.css';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        if (!username || !email || !password || !rePassword) {
            setError('All fields are required.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email format.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Invalid password format.');
            return;
        }

        if (!matchPasswords(password, rePassword)) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const res = await axios.post(
                'http://localhost:5004/api/register',
                {
                    username,
                    email,
                    password,
                    rePassword
                },
                { withCredentials: true }
            );

            if (res.status === 201) {
                setUsername('');
                setEmail('');
                setPassword('');
                setRePassword('');
                setError('');
                navigate('/login'); // Reindirizza alla pagina di login
            } else {
                setError('Registration failed.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rePassword">Confirm Password</label>
                    <input
                        type="password"
                        id="rePassword"
                        name="rePassword"
                        required
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;