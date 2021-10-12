import React, { useEffect } from 'react';
import { Button, makeStyles } from "@material-ui/core";
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import ClientNavbar from '../components/clientHeader/ClientNavbar';
import MessageBox from '../components/MessageBox';

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        color: theme.palette.primary.contrastText,
        background: red[700],
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
        letterSpacing: theme.typography.h6.letterSpacing,

        '&:hover': {
            background: red[900],
            border: 'none !important'
        }
    },
    mainGrid: {
        height: '100vh',
        width: '100%',
        fontSize: '14px'
    },
    cardRow: {
        padding: 20,
        minHeight: '100vh'
    },
    flexOne: {
        flex: 1
    }
}));

export default function CartPage(props) {
    const classes = useStyles();
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    }

    return (
        <>
            <ClientNavbar />
            <div className={`${classes.cardRow} row top`}>
                <div className="col-2">
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ) : (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="small"
                                            ></img>
                                        </div>
                                        <div className={`${classes.flexOne} min-30`}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        addToCart(item.product, Number(e.target.value))
                                                    )
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={`${classes.flexOne} `}>${item.price}</div>
                                        <div className={`${classes.flexOne}`}>
                                            <Button variant="contained" onClick={() => removeFromCartHandler(item.product)} className={classes.deleteButton}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>
                                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                </h2>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={checkoutHandler}
                                    className="primary block"
                                    disabled={cartItems.length === 0}
                                >
                                    Proceed to Checkout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        </>
    )
}
