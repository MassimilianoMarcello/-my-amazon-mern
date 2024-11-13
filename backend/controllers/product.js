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
        const { title, description, price, category, images,mainImage } = req.body;
        try {
            const product = await Product.create({
                title,
                description,
                price,
                category,
                images,
                mainImage
            });
            res.status(201).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { title, description, price, category, mainImage, images } = req.body;
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            product.title = title || product.title;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.mainImage = mainImage || product.mainImage;
            product.images = images || product.images;

            await product.save();
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
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