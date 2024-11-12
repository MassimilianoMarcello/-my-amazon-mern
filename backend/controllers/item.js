import Item from '../models/item';

const itemControllers = {   
    getAllItems: async (req, res) => {
        try {
            const items = await Item.find();
            res.json(items);
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
    addItem: async (req, res) => {
        const { quantity, user_id, price } = req.body;
        try {
            const item = await Item.create({
                quantity,
                user_id,
               price
            });
            res.status(201).json(item);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateItem: async (req, res) => {
        const { quantity} = req.body;
        const { id } = req.params;
        try {
            const item = await Item.findByIdAndUpdate({ _id: id }, { quantity}, { new: true });
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(item);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteItem: async (req, res) => {
        const { id } = req.params;
        try {
            const item = await Item.findByIdAndDelete(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.json(item);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};