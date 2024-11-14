import express from 'express';

import userControllers from '../controllers/user.js';

const { register, login, logout, getAllUsers, updateUserRole } = userControllers;

const router = express.Router();

// routes
// registration and login
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// managing users
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);




export default router;
