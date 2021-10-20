import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin } from '../utils.js';
import { v4 as uuid_v4 } from "uuid";
import multer from 'multer';
import fs from "fs";
import { promisify } from "util";
import stream from 'stream';
import path from 'path';
const __dirname = path.resolve();
const pipeline = promisify(stream.pipeline);


const productRouter = express.Router();

const DIR = './frontend/public/images';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        // image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuid_v4() + '-' + fileName)
//     }
// });

const upload = multer({ storage: storage });

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts })
}));

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
}));

productRouter.post('/register', upload.array('file', 12), expressAsyncHandler(async (req, res) => {
    const {
        file,
    } = req;

    console.log('req::', req);

    const fileName = req.body.name + Math.floor(Math.random() * 1000) + ".jpg";

    const product = await Product({
        name: req.body.name,
        image: `/images/${req.file.filename}`,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    });
    const createdProduct = await product.save();

    if (product) {
        res.send({
            name: createdProduct.name,
            image: createdProduct.image,
            brand: createdProduct.brand,
            category: createdProduct.category,
            description: createdProduct.description,
            price: createdProduct.price,
            countInStock: createdProduct.countInStock,
            rating: createdProduct.rating,
            numReviews: createdProduct.numReviews
        });
        await pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}/./frontend/public/images/${fileName}`)
        );
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
}))

export default productRouter;