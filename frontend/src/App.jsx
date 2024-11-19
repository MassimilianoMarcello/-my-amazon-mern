import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import axios from 'axios';

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
import DeleteProduct from './components/Product/DeleteProduct';
import CategoryProducts from './components/Product/CategoryProducts';
import DiscountedProducts from './components/HomePage/DiscountedProducts';
import Home from './Home';
import Cart from './components/Item-cart/Cart';

const App = () => {
    const [cartItemCount, setCartItemCount] = useState(0);

    //fetch cart items count on page load
    useEffect(() => {
        const fetchCartItemCount = async () => {
            const userId = sessionStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:5004/api/items/items/user/${userId}`, {
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
        };

        fetchCartItemCount();
    }, []);

    return (
        <Router>
            <div>
                <Header />
                <Navbar cartItemCount={cartItemCount } />
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
                    <Route path="/cart" element={<Cart setCartItemCount={setCartItemCount} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;



