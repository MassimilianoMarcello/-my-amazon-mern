import express from 'express';

import userControllers from '../controllers/user.js';

const { register, login, logout, getAllUsers, updateUserRole,getUserProfile,updateUserProfile } = userControllers;

const router = express.Router();

// routes

// registration and login
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// managing users
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);
// SINGLE USER PROFILE
router.get("/users/:id", getUserProfile);
router.put("/users/:id", updateUserProfile);




export default router;
