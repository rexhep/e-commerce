import React from 'react';
import ReactStars from "react-rating-stars-component";
import { orange, grey } from '@mui/material/colors';

const Rating = ({ product, onRatingChange, numReviews }) => {

    const productRating = {
        size: 30,
        count: 5,
        isHalf: false,
        value: product?.rating,
        color: grey[400],
        activeColor: orange[500],
        onChange: onRatingChange
    };

    return (
        <div className="rating">
            <ReactStars {...productRating} />
            <span>{numReviews + ' reviews'}</span>
        </div>
    )
}

export default Rating;