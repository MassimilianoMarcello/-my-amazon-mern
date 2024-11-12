import Product from '../models/product.js';

const productControllers = {
    getAllproducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getProduct: async (req, res) => {
        const {id}=req.params;
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createProduct: async (req, res) => {
        const { title, description, price, category, image } = req.body;
        try {
            const product = await Product.create({
                title,
                description,
                price,
                category,
                image
            });
            res.status(201).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateProduct: async (req, res) => {
        const { title, description, price, category, image } = req.body;
        const { id } = req.params;
        try {
            const product = await Product.findByIdAndUpdate({ _id: id }, { title, description, price, category, image }, { new: true });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {    
            return res.status(500).json({ message: error.message });
        }       
    },
    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }}
export default productControllers;