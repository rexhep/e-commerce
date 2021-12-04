import Axios from "axios";
import { CART_EMPTY } from "../constants/cartContstant";
import { CHANGE_ORDER_DELIVERY_FAIL, CHANGE_ORDER_DELIVERY_REQUEST, CHANGE_ORDER_DELIVERY_SUCCESS, MENAGE_ORDERS_FAIL, MENAGE_ORDERS_REQUEST, MENAGE_ORDERS_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order
    });
    try {

        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Beared ${userInfo.token}`
            }
        });
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order
        });
        dispatch({
            type: CART_EMPTY
        });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_DETAILS_REQUEST,
        payload: orderId
    });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message
        })
    }
}

export const payOrder = (order, paymentResult) => async (
    dispatch,
    getState
) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = Axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
};

export const listOrderMine = () => async (dispatch, getState) => {
    dispatch({
        type: ORDER_MINE_LIST_REQUEST
    });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.get('/api/orders/mine', {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: ORDER_MINE_LIST_FAIL,
            payload: message
        })
    }
};

export const menageOrders = () => async (dispatch, getState) => {
    dispatch({
        type: MENAGE_ORDERS_REQUEST
    });
    const { userSignin: { userInfo } } = getState();
    try {
        console.log('ALL ORDER TOKEN', userInfo);
        const { data } = await Axios.get('/api/orders/all-orders', {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        console.log("DATA::::", data);
        dispatch({ type: MENAGE_ORDERS_SUCCESS, payload: data });

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: MENAGE_ORDERS_FAIL,
            payload: message
        })
    }
}

export const changeOrderDelivery = (orderId, value) => async (dispatch, getState) => {
    dispatch({
        type: CHANGE_ORDER_DELIVERY_REQUEST
    });
    const { userSignin: { userInfo } } = getState();
    try {
        const { data } = await Axios.put(`/api/orderaaaas/${orderId}`, { isDelivered: value, deliveredAt: Date().toLocaleString() }, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        console.log("DATA::::", data);
        dispatch({ type: CHANGE_ORDER_DELIVERY_SUCCESS, payload: data });

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: CHANGE_ORDER_DELIVERY_FAIL,
            payload: message
        })
    }
}