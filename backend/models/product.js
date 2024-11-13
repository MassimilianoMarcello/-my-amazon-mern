import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: ['Generic','Smartphones', 'Laptops', 'Tablets', 'Accessories', 'Wearables'],
        default: 'Generic'
    },

    mainImage: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of strings for multiple images
    }

  
},    {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
