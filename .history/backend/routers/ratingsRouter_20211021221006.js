import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Ratings from '../models/ratingsModel.js';

const ratingsRouter = express.Router();

ratingsRouter.post('/', expressAsyncHandler(async (req, res) => {
    console.log('TESLT', req.body.name);
    const rating = await Ratings({
        rating: req.body.name
    });
    const createRatings = await rating.save();
    res.send({
        rating: createRatings.rating
    });
}));

export default ratingsRouter;