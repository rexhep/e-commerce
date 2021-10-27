import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ReactImageMagnify from 'react-image-magnify';
import CardContent from '@material-ui/core/CardContent';
import { styled } from '@mui/material/styles';
import Rating from '../Rating';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { productRatings } from '../../actions/ratingsAction';

const useStyles = makeStyles((theme) => ({
    imageMagnifyImg: {
        height: "370px !important",
        objectFit: "cover",
        objectPosition: "50% 50%"
    },
    numRatings: {
        display: 'flex'
    },
    numReviews: {
        top: "15px",
        left: "10px",
        position: "relative"
    }
}));

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Product({ product }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onRatingChange = (newValue) => {
        console.log(`Example 3: new value is ${newValue}`);
        dispatch(productRatings(newValue, product?._id));
    }

    return (
        <Grid item xs={12} md={3}>
            <Item className="custom-item">
                <Card sx={{ maxWidth: 345 }} className="custom-card">
                    <Link to={`/product/${product._id}`}>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: product.image[0].path,
                                sizes: '(min-width: 480px) 30vw, 80vw'
                            },
                            largeImage: {
                                alt: '',
                                src: product.image[0].path,
                                width: 500,
                                height: 800
                            },
                            enlargedImageContainerClassName: "test",
                            enlargedImageContainerStyle: {
                                position: 'absolute',
                                left: '-10px',
                                top: 0
                            },
                            imageClassName: classes.imageMagnifyImg
                        }} />
                    </Link>

                    <CardContent className="custom-card-content">
                        <Link to={`/product/${product._id}`}>
                            <h2>{product.name}</h2>
                        </Link>
                        <Rating
                            rating={product.rating}
                            numReviews={product.numReviews}
                            product={product}
                            onRatingChange={onRatingChange}
                            classes={classes}
                        />
                        <div className="price">${product.price}</div>
                    </CardContent>
                </Card>
            </Item>
        </Grid>
    )
}
