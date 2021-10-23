import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Ratings from '../models/ratingsModel.js';
import Product from '../models/productModel.js';

const ratingsRouter = express.Router();

ratingsRouter.post('/', expressAsyncHandler(async (req, res) => {
    console.log('TESLT', req.body);
    const rating = await Ratings({
        rating: req.body.rating,
        product: req.body.id
    });
    const product = await Product.findById(req.body.id);
    const prevRating = product.rating;
    // console.log('PRODUCT', product);

    if (product) {
        product.rating = prevRating + 1;
    }
    const createRatings = await rating.save();
    product.save();
    res.send({
        rating: createRatings.rating,
        product: createRatings.product
    });
}));

export default ratingsRouter;