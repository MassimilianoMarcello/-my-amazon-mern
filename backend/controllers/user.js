import User from '../models/user.js';
import hashPassword from '../utils/hashPassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import validateUsername from '../utils/validateUsername.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userControllers = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({}, 'email role _id'); // Seleziona solo email, role e _id
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Update user role (admin or user)
    updateUserRole: async (req, res) => {
        const { id } = req.params;
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.role = role;
            await user.save();
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Get user profile  (username, email, role)  
    getUserProfile: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id, 'username email role');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Update user profile (firstName, lastName, address)
    updateUserProfile: async (req, res) => {
        const { id } = req.params;
        const { firstName, lastName, address } = req.body;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.address = address || user.address;

            await user.save();
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
// Register a new user
    register: async (req, res) => {
        const { username, email, password, rePassword } = req.body;
        try {
            if (!username || !email || !password || !rePassword) {
                return res
                    .status(400)
                    .json({ message: 'All fields are required' });
            }
            if (!validateUsername(username)) {
                return res.status(400).json({ message: 'Invalid username' });
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ message: 'Invalid email' });
            }
            if (!validatePassword(password)) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            if (!matchPasswords(password, rePassword)) {
                return res
                    .status(400)
                    .json({ message: 'Passwords do not match' });
            }
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            const hashedPassword = hashPassword(password);
            const user = await User.create({
                username,
                email,
                password: hashedPassword
            });
            res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Login a user
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!email || !password)
                return res
                    .status(400)
                    .json({ message: 'All fields are required' });

            const userExists = await User.findOne({ email });
                
  
            const isPasswordCorrect = await bcrypt.compare(
                password,
                userExists.password
            );
            if (!userExists || !isPasswordCorrect) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign(
                { id: userExists._id },
                process.env.TOKEN_SECRET
            );

            res.cookie('token', token, { httpOnly: true });
            res.json({ message: 'Login successful', userId: userExists._id });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
        
    logout: async (req, res) => {
        res.clearCookie('token');
        res.json({ message: 'Logout successful' });
    }
};

export default userControllers;
