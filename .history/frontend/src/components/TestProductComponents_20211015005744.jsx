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
        actions.changeFoo(products)
    }, [products]);

    console.log('state', state);

    let filteredProducts;

    useEffect(() => {
        if(state?.products.length) {
            state.products.sort((a, b) => a.price - b.price)
        }
    }, [state])

    // if (state.filters.query) {
    //   filteredProducts = filteredProducts.filter(product => {
    //     return product.title
    //       .toLowerCase()
    //       .includes(state.filters.query.toLowerCase());
    //   });
    // }

    // if (state.filters.priceRange) {
    //   const [minPrice, maxPrice] = state.filters.priceRange;
    //   filteredProducts = filteredProducts.filter(product => {
    //     return product.price >= minPrice && product.price <= maxPrice;
    //   });
    // }


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