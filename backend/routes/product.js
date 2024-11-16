import express from 'express';

import productControllers from '../controllers/product.js';

const {
    getAllproducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getDiscountedProducts,
} = productControllers;

const router = express.Router();

// routes
// get all products and get product by ID
router.get('/products', getAllproducts);
router.get('/products/:id', getProduct);

// category
router.get('/products/category/:category', getProductsByCategory);


// discounted products
router.get('/products/products/discounted', getDiscountedProducts);

// create, update, delete products
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
