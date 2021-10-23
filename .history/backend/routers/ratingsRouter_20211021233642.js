import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Ratings from '../models/ratingsModel.js';
import Product from '../models/productModel.js';

const ratingsRouter = express.Router();

ratingsRouter.post('/', expressAsyncHandler(async (req, res) => {
    console.log('TESLT', req.body);
    const rating = await Ratings({
        rating: req.body.rating
    });
    const product = await Product();
    console.log('PRODUCT', product);
    product.find({}).populate({ rating: createRatings.rating }).exec((err, response) => {
        console.log('response', response);
    })
    const createRatings = await rating.save();
    res.send({
        rating: createRatings.rating
    });
}));

export default ratingsRouter;