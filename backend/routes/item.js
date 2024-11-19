import express from 'express';
import itemControllers from '../controllers/item.js';
import verifyToken from '../middleware/verifyToken.js';


const { getAllItems, getItem, addItem, updateItem, deleteItem ,getItemsByUser} = itemControllers;

const router = express.Router();

// routes

router.get('/items', getAllItems);
router.get('/items/:id', getItem);
router.get('/items/items/user/:id',verifyToken, getItemsByUser);
router.post('/items',verifyToken, addItem);
router.put('/items/:id',verifyToken, updateItem);
router.delete('/items/:id', deleteItem);

export default router;