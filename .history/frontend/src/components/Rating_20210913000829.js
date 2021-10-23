import React from 'react'

export default function Rating({ rating, numReviews }) {
    return (
        <div className="rating">
            <span>
                <i
                    className={
                        rating >= 1
                            ? "fa fa-star"
                            : rating >= 0.5
                                ? "fa fa-star-half-o"
                                : "fa fa-star-o"
                    }>
                </i>
            </span>
            <span><i
                className={
                    rating >= 2
                        ? "fa fa-star"
                        : rating >= 0.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                }>
            </i></span>
            <span><i
                className={
                    rating >= 3
                        ? "fa fa-star"
                        : rating >= 0.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                }>
            </i></span>
            <span>
                <i
                    className={
                        rating >= 4
                            ? "fa fa-star"
                            : rating >= 0.5
                                ? "fa fa-star-half-o"
                                : "fa fa-star-o"
                    }>
                </i>
            </span>
            <span><i
                className={
                    rating >= 5
                        ? "fa fa-star"
                        : rating >= 0.5
                            ? "fa fa-star-half-o"
                            : "fa fa-star-o"
                }>
            </i>
            </span>
            <span>{numReviews + ' reviews'}</span>
        </div>
    )
}
