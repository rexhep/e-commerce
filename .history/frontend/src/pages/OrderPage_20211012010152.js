import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import OrderDetailsBox from '../components/OrderDetailsBox';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);

    //Fetch orderDetails from redux store
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { success: successPay } = orderPay;
    const dispatch = useDispatch();

    useEffect(() => {
        // addPaypalScript is async func because it send a request to backend to get clientID
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');

            // Create scrypt element by pure javascript
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            // onload happens when this url is downloaded in browser and is ready to use
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({
                type: ORDER_PAY_RESET
            })
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <OrderDetailsBox allowPaying props={props} />
    );
}