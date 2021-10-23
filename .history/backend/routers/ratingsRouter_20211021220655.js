import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Ratings from '../models/ratingsModel';

const ratingsRouter = express.Router();

ratingsRouter.post('/', expressAsyncHandler(async (req, res) => {
    const rating = await Ratings({
        rating: req.body.name
    });
    const createRatings = await rating.save();
    res.send({
        rating: createRatings.rating
    });
}));