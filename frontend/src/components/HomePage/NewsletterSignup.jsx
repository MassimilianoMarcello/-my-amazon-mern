import { useState } from 'react';
import axios from 'axios';
import './NewsletterSignup.css';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5004/api/newsletter', { email });
            setMessage('Thank you for signing up!');
            setEmail('');
        } catch {
            setMessage('Error signing up. Please try again.');
        }
    };

    return (
        <div className="newsletter-signup">
            <h2>Sign Up for Our Newsletter</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NewsletterSignup;