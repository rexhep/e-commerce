import mongoose from 'mongoose';

const ratingsSchema = new mongoose.Schema({
    rating: { type: Number, required: true }
}, {
    timestamps: true
});

const Ratings = mongoose.model('Product', ratingsSchema);

export default Ratings;