
import Item from '../models/item.js';
import Product from '../models/product.js';

const itemControllers = {
    getAllItems: async (req, res) => {
        try {
            const items = await Item.find();
            res.status(200).json(items);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getItem: async (req, res) => {
        const { id } = req.params;
        try {
            const item = await Item.findById(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(item);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getItemsByUser: async (req, res) => {
        const { id } = req.params;
           console.log("User ID ricevuto:", id);
        try {
            console.log(`Fetching items for user_id: ${id}`);
            const items = await Item.find({ user_id: id });
            console.log(`Items found: ${items.length}`);
            res.json(items);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    addItem: async (req, res) => {
        const { quantity, user_id, price, title, description,category} = req.body;

        try {
            if (!title || !price || !quantity || !user_id || !description || !category) {
                return res
                    .status(400)
                    .json({ message: 'All fields are required' });
            }
            if (
                typeof price !== 'number' ||
                typeof quantity !== 'number' ||
                quantity < 1
            ) {
                return res
                    .status(400)
                    .json({ message: 'Invalid price or quantity' });
            }

            const item = await Item.create({
                quantity,
                user_id,
                price,
                title,
                description,
                category
             
            });
            res.status(201).json(item);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateItem: async (req, res) => {
        const { id } = req.params;
        const { quantity } = req.body;
    
        try {
            const item = await Item.findByIdAndUpdate(
                id,
                { quantity },
                { new: true }
            );
    
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
    
            res.status(200).json({ message: 'Item updated', item });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    
    deleteItem: async (req, res) => {
        const { id } = req.params;
        try {
            const item = await Item.deleteOne({ _id: id });
            if (item.deletedCount > 0) {
                res.status(204).json({ message: 'Item deleted' });
            } else {
                return res.status(404).json({ message: 'Item not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }
};

export default itemControllers;
