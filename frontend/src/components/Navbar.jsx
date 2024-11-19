import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import { CiSquarePlus, CiHome, CiUser, CiLogout } from 'react-icons/ci';
import { AiOutlineProduct } from "react-icons/ai";
import calculateItems from '../utils/calculateItems';

import './Navbar.css';

const Navbar = () => {
    const userId = sessionStorage.getItem('userId');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [item, setItem] = useState(0);

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const res = await axios.get(`http://localhost:5004/api/items/items/user/${userId}`, {
                    withCredentials: true,
                });
                // console.log('Response data:', res.data);
                // console.log('User ID:', userId);

                if (res.status === 200) {
                    // console.log('Cart items:', res.data);
                    if (res.data.length > 0) {
                        const totalItems = calculateItems(res.data);
                        console.log('Total items:', totalItems);
                        setItem(totalItems); 
                    } else {
                        setItem(0);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };



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
            getCartItems();
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
                                <span> Cart {item}</span>
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
                            <NavLink to="/all-users">Users</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Navbar;

