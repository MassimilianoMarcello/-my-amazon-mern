import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { CiSquarePlus, CiHome, CiUser, CiLogout } from 'react-icons/ci';
import { AiOutlineProduct } from 'react-icons/ai';
import { HiUsers } from "react-icons/hi2";
import './Navbar.css';
import PropTypes from 'prop-types';

const Navbar = ({ cartItemCount }) => {
    const userId = sessionStorage.getItem('userId');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await axios.get(`http://localhost:5004/api/users/${userId}`, {
                    withCredentials: true,
                });
                if (res.status === 200 && res.data.role === 'admin') {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (userId) {
            setIsLoggedIn(true);
            checkAdmin();
        }
    }, [userId]);

    return (
        <div className="navbar">
            <ul>
                <li>
                    <NavLink to="/"><CiHome /> Home</NavLink>
                </li>
                <li>
                    <NavLink to="/products"> <AiOutlineProduct /> Products</NavLink>
                </li>

                {isLoggedIn && (
                    <>
                        <li>
                            <NavLink to={`/profile/${userId}`}>
                                <CiUser /> Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart">
                                <FiShoppingCart />
                                <span> Cart {cartItemCount || 0}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/logout"><CiLogout /> Logout</NavLink>
                        </li>
                    </>
                )}

                {!isLoggedIn && (
                    <>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                    </>
                )}

                {isAdmin && (
                    <>
                        <li>
                            <NavLink to="/add-product">
                                <CiSquarePlus /> Add Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/all-users"><HiUsers /> Users</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};
Navbar.propTypes = {
    cartItemCount: PropTypes.number.isRequired,
};

export default Navbar;



