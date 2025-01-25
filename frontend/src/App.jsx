import  { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Altri import per le pagine dell'app
import UsersListPage from './components/User/UsersListPage';
import UserProfile from './components/User/UserProfile';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Logout from './components/User/Logout';
import UpdateUserProfile from './components/User/UpdateUserProfile';
import ProductsList from './components/Product/ProductsList';
import ProductDetails from './components/Product/ProductDetails';
import AddProduct from './components/Product/AddProduct';
import UpdateProduct from './components/Product/UpdateProduct';
import DeleteProduct from './components/Product/Deleteproduct';
import CategoryProducts from './components/Product/CategoryProducts';
import DiscountedProducts from './components/HomePage/DiscountedProducts';
import Home from './Home';
import Cart from './components/Item-cart/Cart';
import SuccessPage from './components/Item-cart/SuccessPage';
import Footer from './components/Footer';

const stripePromise = loadStripe('pk_test_51QMV0AJtWSbtcfAuJvEWpAwPyyLfRs6sNc4dgqfmQYcaIcOIqCEvRfl7ZpvCWWNKBH36DZzD5ilnoJm3TJZnWXYf00usrJmGs6');

const App = () => {
    const [cartItemCount, setCartItemCount] = useState(0);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';

    // Funzione per aggiornare il numero di articoli nel carrello, memorizzata con useCallback
    const updateCartItemCount = useCallback(async () => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            try {
                const response = await axios.get(`${apiUrl}/items/items/user/${userId}`, {
                    withCredentials: true,
                });
                if (Array.isArray(response.data)) {
                    const totalItemCount = response.data.reduce((acc, item) => acc + item.quantity, 0);
                    setCartItemCount(totalItemCount);
                }
            } catch (error) {
                console.error('Errore nel recupero degli articoli del carrello:', error);
            }
        }
    }, [apiUrl]); // Dipendenza da apiUrl

    // useEffect che dipende dalla funzione memorizzata
    useEffect(() => {
        updateCartItemCount();
    }, [updateCartItemCount]); // Aggiungi la funzione memorizzata alle dipendenze

    return (
        <Router>
            <div>
                <Header />
                <Navbar cartItemCount={cartItemCount} />
                <Routes>
                    {/* users */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/profile/:id" element={<UserProfile />} />
                    <Route path="/update-user/:id" element={<UpdateUserProfile />} />
                    {/* users managed by admin */}
                    <Route path="/all-users" element={<UsersListPage />} />
                    {/* products */}
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/category/:category" element={<CategoryProducts />} />
                    <Route path="/products/:id" element={<ProductDetails setCartItemCount={setCartItemCount} />} /> {/* Passa setCartItemCount */}
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/discounted-products" element={<DiscountedProducts />} />
                    <Route path="/update-product/:id" element={<UpdateProduct />} />
                    <Route path="/delete-product/:id" element={<DeleteProduct />} />
                    {/* SHOPPING CART */}
                    <Route path="/success" element={<SuccessPage />} />
                    <Route
                        path="/cart"
                        element={
                            <Elements stripe={stripePromise}>
                                <Cart setCartItemCount={setCartItemCount} />
                            </Elements>
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;




