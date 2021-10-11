import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import { orange } from '@mui/material/colors';
import { listOrderMine } from '../actions/orderActions';
import ClientNavbar from '../components/clientHeader/ClientNavbar';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const useStyles = makeStyles((theme) => ({
    orderHistory: {
        padding: 20
    },
    detailsButton: {
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
}));

export default function OrderHistoryPage(props) {
    const classes = useStyles();
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch]);

    return (
        <>
            <ClientNavbar />
            <div className={classes.orderHistory}>
                <h1>Order History</h1>
                {loading ?
                    (
                        <LoadingBox></LoadingBox>
                    )
                    :
                    error ? <MessageBox variant="dabger">{error}</MessageBox>
                        :
                        (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice.toFixed(2)}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                            <td>
                                                {order.isDelivered
                                                    ? order.deliveredAt.substring(0, 10)
                                                    : 'No'}
                                            </td>
                                            <td>
                                                {/* <button
                                                    type="button"
                                                    className="small"
                                                    onClick={() => {
                                                        props.history.push(`/order/${order._id}`);
                                                    }}
                                                >
                                                    Details
                                                </button> */}
                                                <Button onClick={() => props.history.push(`/order/${order._id}`)} className={`${classes.detailsButton}`} variant="contained">Details</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
            </div>
        </>
    )
}
