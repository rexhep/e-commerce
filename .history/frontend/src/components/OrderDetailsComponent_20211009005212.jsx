import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { Button, makeStyles } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import { orange } from '@mui/material/colors';
import { changeOrderDelivery, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const useStyles = makeStyles((theme) => ({
    dropDownDelivery: {
        marginTop: '20px !important',
        '& label': {
            fontSize: theme.typography.h5.fontSize,
            background: '#f8f8f8',
            top: '2px',
            paddingRight: 5
        }
    },
    dropdownMenu: {
        fontSize: `${theme.typography.h5.fontSize} !important`
    },
    dropdownInput: {
        fontSize: `${theme.typography.h5.fontSize} !important`
    },
    backButton: {
        // to make a red delete button
        color: theme.palette.primary.contrastText,
        background: orange[700],
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
        letterSpacing: theme.typography.h6.letterSpacing,
  
        '&:hover': {
          background: orange[900],
          border: 'none !important'
        }
      }
  }));

export default function OrderDetailsComponent({ props, allowPaying }) {
    const classes = useStyles();
    let history = useHistory();
    //Fetch orderDetails from redux store
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const [dropdownValue, setDropdownValue] = useState('');
    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;
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

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    const onHandleDropdownChange = (event) => {
        setDropdownValue(event.target.value);
        dispatch(changeOrderDelivery(order._id, event.target.value))
    }

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <div>
                <Button onClick={() => history.goBack()} className={`${classes.backButton}`} variant="contained">Back</Button>
            </div>
            <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered && allowPaying ? (
                                    <MessageBox variant="success">
                                        Delivered at {order.deliveredAt}
                                    </MessageBox>
                                ) : !allowPaying ? (
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth className={classes.dropDownDelivery}>
                                            <InputLabel id="order-select-label">Change value</InputLabel>
                                            <Select
                                                labelId="order-select-label"
                                                id="order-select"
                                                value={dropdownValue}
                                                label="Age"
                                                onChange={onHandleDropdownChange}
                                                className={classes.dropdownInput}
                                            >
                                                <MenuItem value={order?.isDelivered ? 'false' : 'true'} className={classes.dropdownMenu}>{
                                                    order?.isDelivered ? 'Not Delivered' : 'Delivered'
                                                }</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                ) : (
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <MessageBox variant="success">
                                        Paid at {order.paidAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Order Total</strong>
                                    </div>
                                    <div>
                                        <strong>${order.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            {!order.isPaid && allowPaying && (
                                <li>
                                    {!sdkReady ? (
                                        <LoadingBox></LoadingBox>
                                    ) : (
                                        <>
                                            {errorPay && (
                                                <MessageBox variant="danger">{errorPay}</MessageBox>
                                            )}
                                            {loadingPay && (
                                                <LoadingBox></LoadingBox>
                                            )}
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            ></PayPalButton>
                                        </>
                                    )}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}