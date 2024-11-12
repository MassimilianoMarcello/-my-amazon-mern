import express from 'express';
import itemControllers from '../controllers/item.js';


const { getAllItems, getItem, addItem, updateItem, deleteItem ,getItemsByUser} = itemControllers;

const router = express.Router();

// routes

router.get('/items', getAllItems);
router.get('/items/:id', getItem);
router.get('/items/user/:id', getItemsByUser);
router.post('/items', addItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

export default router;