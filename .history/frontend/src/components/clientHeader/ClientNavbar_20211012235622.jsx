import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import addToCartImage from '../../components/clientHeader/images/add-to-cart.png'
import ClientHeader from '../clientHeader/ClientHeader';

const useStyles = makeStyles((theme) => ({
    dashboardDropdown: {
        padding: "0px 10px",
        '& a': {
            textTransform: 'uppercase'
        }
    }
  }));

export default function ClientNavbar() {
    const classes = useStyles();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <div>
                <header className="row">
                    <div>
                        <Link className="brand" to="/">Amazona</Link>
                    </div>
                    <div>
                        <Link to="/cart">
                        <img src={addToCartImage} alt="Add to cart" />
                            {cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                            )}
                        </Link>
                    </div>
                    <div>
                        {userInfo ? (
                            <div className="dropdown">
                                <ClientHeader />
                            </div>
                        ) : (
                            <Link to="/signin">Sign In</Link>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <div className={`${classes.dashboardDropdown} dropdown`}>
                                <Link to="/dashboard">Dashboard</Link>
                            </div>
                        )}
                    </div>
                </header>
            </div>
    )
}
