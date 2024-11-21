import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Forms.css';

const UpdateUserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5004/api/users/${id}  ` , {  withCredentials: true, });
                const user = response.data;
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setAddress(user.address);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        fetchUserProfile();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5004/api/users/${id}`, {
                firstName,
                lastName,
                address
            }   , {  withCredentials: true, });
            setSuccess('Profile updated successfully');
            setError('');
            navigate(`/profile/${id}`);
        } catch (error) {
            setError(error.response.data.message);
            setSuccess('');
        }
    };

    return (
        <div className="update-user-profile">
            <h1>Update Profile</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateUserProfile;


