import Axios from "axios";
import {
    PRODUCT_BY_CATEGORY_FAIL,
    PRODUCT_BY_CATEGORY_REQUEST,
    PRODUCT_BY_CATEGORY_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_RESET,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_REGISTER_FAIL,
    PRODUCT_REGISTER_REQUEST,
    PRODUCT_REGISTER_SUCCESS
} from "../constants/productContants";

export const listProducts = () => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
        const { data } = await Axios.get('/api/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const productRegister = (newData) => async (dispatch, getState) => {
    console.log('newData::', newData);

    dispatch({
        type: PRODUCT_REGISTER_REQUEST,
        // payload: { email, password }
    });
    const { userSignin: { userInfo } } = getState();
    console.log('newData', newData)
    try {
        await Axios.post("/api/products/register", newData)
            .then(() => {
                console.log('IHH new Data');
            })
            .catch(err => console.log('error', err));
        dispatch({
            type: PRODUCT_REGISTER_SUCCESS,
            // payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_REGISTER_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
};

export const productByCategory = (category) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_BY_CATEGORY_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/api/products/${category}`);
        console.log('DATA::', data);
        dispatch({
            type: PRODUCT_BY_CATEGORY_SUCCESS,
            payload: data
        });
        // dispatch({
        //     type: PRODUCT_LIST_RESET
        // })

    } catch (error) {
        dispatch({
            type: PRODUCT_BY_CATEGORY_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}