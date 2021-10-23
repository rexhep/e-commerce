import Axios from "axios";
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_REGISTER_FAIL,
    PRODUCT_REGISTER_REQUEST,
    PRODUCT_REGISTER_SUCCESS,
    PRODUCT_RATINGS_REQUEST,
    PRODUCT_RATINGS_SUCCESS,
    PRODUCT_RATINGS_FAIL
} from "../constants/productContants";

export const productRatings = (value) => async (dispatch) => {
    console.log('RATING', value);
    dispatch({
        type: PRODUCT_RATINGS_REQUEST
    });
    try {
        await Axios.post("/api/products/ratings", { rating: value })
            .then(() => {
                console.log('IHH new Data');
            })
            .catch(err => console.log('error', err));
        dispatch({
            type: PRODUCT_RATINGS_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_RATINGS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}