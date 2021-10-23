import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import data from './data.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import ratingsRouter from './routers/ratingsRouter.js';

dotenv.config();

const app = express();

// Midleware - to converting http request body content, to req.body in node application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGODB_URL || 'mongodb://localhost/amazona';

mongoose.connect(uri, {
    useUnifiedTopology: true, useNewUrlParser: true
});


app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/ratings', ratingsRouter);

// PAYPAL_CLIENT_ID is in .env file
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((errerror, req, res, next) => {
    res.status(500).send({ message: errerror.message })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`'Serve at http://localhost:${port}'`);
});

// npm i --save-dev nodemon => nodemon (is a package that automatically re-run aplication) e ristarton serverin automatikisht, pas cdo ndryshimi
//"start": "nodemon --watch backend --exec node --experimental-modules backend/server.js" => ky eshte kodi qe duhet mu shtu n package.json
// automatikisht me ristartu serverin. "backend" osht emrin i projektit 