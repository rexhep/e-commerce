import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, makeStyles } from "@material-ui/core";
import { orange, grey } from '@mui/material/colors';
import ReactStars from "react-rating-stars-component";
import Rating from '../../components/Rating';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { detailsProduct } from '../../actions/productActions';
import ClientNavbar from '../../components/clientHeader/ClientNavbar';
import ImageCarousel from './ImageCarousel';
import { productRatings } from '../../actions/ratingsAction';

const useStyles = makeStyles((theme) => ({
    backButton: {
        color: theme.palette.primary.contrastText,
        background: orange[700],
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
        letterSpacing: theme.typography.h6.letterSpacing,

        '&:hover': {
            background: orange[900],
            border: 'none !important'
        }
    },
    mainGrid: {
        height: '100vh',
        width: '100%',
        fontSize: '14px'
    },
    backToResult: {
        margin: '20px 20px'
    }
}));

export default function ProductPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const ratings = useSelector(state => state.rateProduct);
    const { loading, error, product } = productDetails;
    console.log('product::', product);

    const thirdExample = {
        size: 30,
        count: 5,
        isHalf: false,
        value: product?.rating,
        color: grey[400],
        activeColor: orange[500],
        onChange: newValue => {
            console.log(`Example 3: new value is ${newValue}`);
            dispatch(productRatings(newValue, productId));
        }
    };

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId} ? qty = ${qty}`);
    }

    const [images, setImages] = useState();

    useEffect(() => {
        setImages(
            product?.image?.map(({ id, path }) => ({
                id,
                url: path
            }))
        )
    }, [product]);

    return (
        <>
            <ClientNavbar />
            <div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) :
                    error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <div>
                            <div className={classes.backToResult}>
                                <Button onClick={() => props.history.push('/')} className={`${classes.backButton}`} variant="contained">Back to result</Button>
                            </div>

                            <div className="row top product-details">
                                <div className="col-2 mr-20">
                                    {/* <div className="product-details-image">
                                        <img className="large" src={product.image} alt={product.name}></img>
                                    </div> */}
                                    <div>
                                        <ImageCarousel images={images} />
                                    </div>
                                </div>
                                <div className="col-1">
                                    <ul>
                                        <li>
                                            <h1>{product.name}</h1>
                                        </li>
                                        <li>
                                            <Rating
                                                rating={product.rating}
                                                numReviews={product.numReviews}
                                            ></Rating>
                                            <ReactStars {...thirdExample} />
                                        </li>
                                        <li>Pirce : ${product.price}</li>
                                        <li>
                                            Description:
                                            <p>{product.description}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-1">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div>Price</div>
                                                    <div className="price">${product.price}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>Status</div>
                                                    <div>
                                                        {product.countInStock > 0 ? (
                                                            <span className="success">In Stock</span>
                                                        ) : (
                                                            <span className="danger">Unavailable</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                            {
                                                product.countInStock > 0 && (
                                                    <>
                                                        <li>
                                                            <div className="row">
                                                                <div>Qty</div>
                                                                <div>
                                                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                        {
                                                                            [...Array(product.countInStock).keys()].map(x => (
                                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                        </li>
                                                    </>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
}
