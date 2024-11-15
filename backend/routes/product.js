import express from 'express';

import productControllers from '../controllers/product.js';

const {
    getAllproducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
} = productControllers;

const router = express.Router();

// routes
router.get('/products', getAllproducts);
router.get('/products/:id', getProduct);
router.get('/products/category/:category', getProductsByCategory);
router.post('/products', createProduct);

router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
