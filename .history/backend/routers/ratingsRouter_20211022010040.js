import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Ratings from '../models/ratingsModel.js';
import Product from '../models/productModel.js';

const ratingsRouter = express.Router();

const test = (r) => {
    let items = Object.entries(r); // get an array of key/value pairs of the object like this [[1:1], [2:1]...]
    let sum = 0; // sum of weighted ratings
    let total = 0; // total number of ratings
    console.log('items:', items);
    for (let [key, value] of items) {
        console.log('key:', key);
        console.log('value:', value);
        total += value;
        sum += value * parseInt(key); // multiply the total number of ratings by it's weight in this case which is the key
    }
    console.log('MATH', Math.round(sum / total));
    return Math.round(sum / total)
}

ratingsRouter.post('/', expressAsyncHandler(async (req, res) => {
    console.log('TESLT', req.body);
    const rating = await Ratings({
        rating: req.body.rating,
        product: req.body.id
    });
    test(req.body.rating);
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