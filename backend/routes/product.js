import express from 'express';

import productControllers from '../controllers/product.js';

const {
    getAllproducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = productControllers;

const router = express.Router();

// routes
router.get('/products', getAllproducts);
router.get('/products/:id', getProduct);
router.post('/products', createProduct);

router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
