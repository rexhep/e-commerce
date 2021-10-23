import mongoose from 'mongoose';

const ratingsSchema = new mongoose.Schema({
    rating: { type: Number, required: true }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', ratingsSchema);

export default Product;