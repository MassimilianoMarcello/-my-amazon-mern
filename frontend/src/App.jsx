
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ProductsList from './components/Product/ProductsList';
import ProductDetails from './components/Product/ProductDetails';

const App = () => {
    return (
        <Router>
            <div>
                {/* <Header title="My Amazon" /> */}
                     <Header/>
             
                <Navbar />
                <Routes>
                    {/* users */}
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/login" element={<h1>Login</h1>} />
                    <Route path="/register" element={<h1>Register</h1>} />
                    {/* products */}
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
