import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    // image: { type: String, required: true },
    image:
    {
        type: Array
    },
    brand: { type: String },
    category: { type: String },
    description: { type: String },
    price: { type: Number },
    countInStock: { type: Number },
    // rating: { type: Number, required: true },
    rating: { type: mongoose.Schema.Types.Number, ref: 'Ratings' },
    numReviews: { type: Number },
}, {
    timestamps: true
}, {
    collection: 'files'
});

const Product = mongoose.model('Product', productSchema);

export default Product;