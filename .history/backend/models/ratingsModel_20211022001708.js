import mongoose from 'mongoose';

const ratingsSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.Number, ref: 'Product' },
    rating: { type: Number, required: true }
}, {
    timestamps: true
});

const Ratings = mongoose.model('Ratings', ratingsSchema);

export default Ratings;