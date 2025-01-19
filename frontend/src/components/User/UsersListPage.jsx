import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserRole from './UpdateUserRole';
import './UsersListPage.css';

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(` ${apiUrl}/users` , {  // Fetch all users
                    withCredentials: true,
                });
                setUsers(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [apiUrl]);

    const updateUserRole = (userId, newRole) => {
        setUsers(users.map(user => 
            user._id === userId ? { ...user, role: newRole } : user
        ));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>All Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>ID</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user._id}</td>
                            <td>{user.role}</td>
                            <td>
                                <UpdateUserRole 
                                    userId={user._id} 
                                    currentRole={user.role} 
                                    onRoleChange={updateUserRole} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetAllUsers;
