import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core";
import Container from '@mui/material/Container';
import Product from '../components/Product';

const useStyles = makeStyles((theme) => ({
    customContainer: {
        marginBottom: 80
    }
}));

const TestProductComponents = ({ state, actions }) => {
    const classes = useStyles();
    const productList = useSelector(state => state.productList);

    const { loading, error, products } = productList;

    useEffect(() => {
        actions.changeFoo(productList.products)
    }, [actions, productList]);

    console.log('state', state);

    let filteredProducts = state.products.sort((a, b) => a.price - b.price);

    if (state.filters.query) {
      filteredProducts = filteredProducts.filter(product => {
        return product.title
          .toLowerCase()
          .includes(state.filters.query.toLowerCase());
      });
    }

    return (
        <Container maxWidth="lg" className={classes.customContainer}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {products?.length && products?.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

export default TestProductComponents;