import mongoose from 'mongoose';

const PRODUCT_RATING: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5
};

const ratingsSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: mongoose.Mixed, required: true }
}, {
    timestamps: true
});

const Ratings = mongoose.model('Ratings', ratingsSchema);

export default Ratings;