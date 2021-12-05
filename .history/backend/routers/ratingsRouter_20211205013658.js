import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Ratings from '../models/ratingsModel.js';
import Product from '../models/productModel.js';

const ratingsRouter = express.Router();

ratingsRouter.post('/', expressAsyncHandler(async (req, res) => {
    const rating = await Ratings({
        rating: req.body.rating,
        product: req.body.id
    });
    const product = await Product.findById(req.body.id);
    if (product) {
        product.numReviews = product.numReviews + 1;
        product.rating = createRatings.rating;
    }
    product.save();
    const createRatings = await rating.save();
    res.send({
        rating: createRatings.rating,
        product: createRatings.product
    });
}));

export default ratingsRouter;