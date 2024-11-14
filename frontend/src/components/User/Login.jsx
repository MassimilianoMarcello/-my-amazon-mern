import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Forms.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        if (email && password) {
            try {
                const res = await axios.post(
                    'http://localhost:5004/api/login',
                    {
                        email,
                        password
                    },
                    { withCredentials: true }
                );

                if (res.status === 200 && res.data.message === 'Login successful') {
                    sessionStorage.setItem('userId', res.data.userId);
                    setEmail('');
                    setPassword('');
                    setError('');
                    navigate('/');
                } else {
                    setError('Invalid credentials');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred');
            }
        } else {
            setError('All fields are required.');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={submitForm}>
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
                {error && <div className="error">{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;