import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core";
import Container from '@mui/material/Container';
import Product from '../components/Product';
import { testUser } from './productUtils';

const useStyles = makeStyles((theme) => ({
    customContainer: {
        marginBottom: 80
    }
}));

const TestProductComponents = ({ state, actions }) => {
    const classes = useStyles();
    const productList = useSelector(state => state.productList);

    const { loading, error, products } = productList;
    testUser = productList;

    return (
        <Container maxWidth="lg" className={classes.customContainer}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {products.length && products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

export default TestProductComponents;