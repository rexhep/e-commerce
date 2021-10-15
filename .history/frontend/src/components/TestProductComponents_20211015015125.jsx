import React, { useEffect, useState } from 'react';
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
    const [filteredProducts, setFilteredProducts] = useState();

    const { loading, error, products } = productList;

    useEffect(() => {
        actions.changeFoo(products)
    }, [products]);

    useEffect(() => {
        if(state?.products?.length) {
            setFilteredProducts(state.products.sort((a, b) => a.price - b.price));
        }
    }, [state])

    useEffect(() => {
        if (state.filters.query) {
            setFilteredProducts(filteredProducts.filter(product => {
                console.log('PRODUCT', product);
                return product.name
                  .toLowerCase()
                  .includes(state.filters.query.toLowerCase());
              }));
            }
    }, [state.filters.query])

    useEffect(() => {
        if (state.filters.priceRange) {
            const [minPrice, maxPrice] = state.filters.priceRange;
            console.log('state pricerange', state.filters);
            setFilteredProducts(filteredProducts.filter(product => {
              return product.price >= minPrice && product.price <= maxPrice;
            }));
          }
    }, [ state.filters, state.filters.priceRange]);

    console.log('FILTER::', filteredProducts);



    return (
        <Container maxWidth="lg" className={classes.customContainer}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {filteredProducts?.length && filteredProducts.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                    sdsadsdsd
                </Grid>
            </Box>
        </Container>
    )
}

export default TestProductComponents;