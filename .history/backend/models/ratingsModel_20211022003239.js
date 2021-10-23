import mongoose from 'mongoose';

const ratingsSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: mongoose.Mixed, required: true, default: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 } }
}, {
    timestamps: true
});

const Ratings = mongoose.model('Ratings', ratingsSchema);

export default Ratings;