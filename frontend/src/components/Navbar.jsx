import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {


    return (
        <>
        <div className="navbar">
        <ul>
                <li>
                    <NavLink>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register">
                        Register
                    </NavLink>
                 </li>

            <li>
                <NavLink to="/logout">
                    Logout
                </NavLink>
            </li>
            <li>
                    <NavLink to="/products">
                        Products
                    </NavLink>
                </li>
              
                <li>
                    <NavLink to="/add-product">
                        Add Product
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/all-users">
                       Users
                    </NavLink>
                </li>
            </ul>
            
        </div>
      
        </>
    );
};

export default Navbar;
