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
    getProductsByCategory: async (req, res) => {
        const { category } = req.params;
        try {
            const products = await Product.find({ category });
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
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
        console.log(`Attempting to delete product with ID: ${id}`);
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                console.log(`Product with ID: ${id} not found`);
                return res.status(404).json({ message: 'Product not found' });
            }
            console.log(`Product with ID: ${id} deleted`);
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error(`Error deleting product with ID: ${id}`, error);
            return res.status(500).json({ message: error.message });
        }
    
    }}
export default productControllers;