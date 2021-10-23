import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PRODUCT_RATING = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5
};

const ratingsSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: mongoose.Mixed, required: true, enum: Object.values(PRODUCT_RATING) },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
}, {
    timestamps: true
});

const Ratings = mongoose.model('Ratings', ratingsSchema);

export default Ratings;