import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';

// user imports
import UsersListPage from './components/User/UsersListPage';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Logout from './components/User/Logout';

// products import
import ProductsList from './components/Product/ProductsList';
import ProductDetails from './components/Product/ProductDetails';
import AddProduct from './components/Product/AddProduct';
import UpdateProduct from './components/Product/UpdateProduct';
import DeleteProduct from './components/Product/Deleteproduct';
import CategoryProducts from './components/Product/CategoryProducts';
import Home from './Home';

const App = () => {
    return (
        <Router>
            <div>
                {/* <Header title="My Amazon" /> */}
                <Header />

                <Navbar />
                <Routes>
                    {/* users */}
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    {/* users managed by admin */}
                    <Route path="/all-users" element={<UsersListPage />} />
                    {/* products */}
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/category/:category" element={<CategoryProducts />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/add-product" element={<AddProduct />} />

                    <Route
                        path="/update-product/:id"
                        element={<UpdateProduct />}
                    />
                    <Route
                        path="/delete-product/:id"
                        element={<DeleteProduct />}
                    />{' '}
                    {/* Aggiungi la rotta per DeleteProduct */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
