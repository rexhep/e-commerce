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
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid_v4() + '-' + fileName)
    }
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuid_v4() + '-' + fileName)
//     }
// });

// const upload = multer({ storage: storage });
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
        }
    }
});

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

productRouter.post('/register', upload.array('file', 8), expressAsyncHandler(async (req, res) => {
    const {
        file,
    } = req;

    const fileName = req.body.name + Math.floor(Math.random() * 1000) + ".jpg";
    const reqFiles = [];

    const url = req.protocol + '://' + req.get('host')

    for (var i = 0;i < req.files.length;i++) {
        reqFiles.push({ id: i, path: '/images/' + req.files[i].filename })
    }

    const product = new Product({
        name: req.body.name,
        image: reqFiles,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews
    });
    product.save().then(result => {
        res.status(201).json({
            message: "Uploaded!",
            product: {
                name: result.name,
                image: result.image,
                brand: result.brand,
                category: result.category,
                description: result.description,
                price: result.price,
                countInStock: result.countInStock,
                rating: result.rating,
                numReviews: result.numReviews
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    });
}))

export default productRouter;