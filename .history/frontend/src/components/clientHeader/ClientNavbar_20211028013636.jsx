import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import addToCartImage from '../../components/clientHeader/images/shopping-cart-2.png';
import ClientHeader from '../clientHeader/ClientHeader';

const useStyles = makeStyles((theme) => ({
    dashboardDropdown: {
        padding: "0px 10px",
        '& a': {
            textTransform: 'uppercase'
        }
    },
    addToCartSector: {
        position: 'relative',
        marginLeft: 'auto',
        '& .badge': {
            position: "absolute", 
            right: -15
        }
    },
    rowHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        rowGap: "10px",
        columnGap: "2em"
    },
    navMenu: {
        float: 'left',
        '& a': {
            padding: "10px 10px"
        }
    }
  }));

export default function ClientNavbar() {
    const classes = useStyles();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const links = [
        {
          name: `Tshirt`,
          target: `/products/tshirt`
        },
        {
          name: `Dress`,
          target: `/products/dress`
        }
      ];
    

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <Container maxWidth="lg" className={classes.customContainer}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <div>
                        <header className={classes.rowHeader}>
                            <div>
                                <Link className="brand" to="/">AP Fashion</Link>
                            </div>
                            <div className={classes.navMenu}>
                                <Link to="/">Home</Link>
                                {
                                    links.map((link) => {
                                        return(
                                            <Link to={link.target}>{link.name}</Link>
                                        )
                                    })
                                }
                            </div>
                            <div className={classes.addToCartSector}>
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
                </Grid>
            </Box>
        </Container>
    )
}
