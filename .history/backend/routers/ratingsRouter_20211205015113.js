import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Ratings from '../models/ratingsModel.js';
import Product from '../models/productModel.js';

const ratingsRouter = express.Router();

ratingsRouter.post('/', expressAsyncHandler(async (req, res) => {
    let count = 0;
    const rating = await Ratings({
        rating: req.body.rating,
        product: req.body.id,
        numReviews: count++
    });
    
    const product = await Product.findById(req.body.id);
    const createRatings = await rating.save();
    console.log('BOYD product', product.numReviews);
    if (product) {
        product.numReviews = product.numReviews === 'undefined' ? 0 : createRatings.numReviews + 1;
        product.rating = createRatings.rating;
    }
    product.save();
    
    res.send({
        rating: createRatings.rating,
        product: createRatings.product
    });
}));

export default ratingsRouter;