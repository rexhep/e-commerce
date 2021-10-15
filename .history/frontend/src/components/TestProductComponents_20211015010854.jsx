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
    const [filter, setFilter] = useState();

    const { loading, error, products } = productList;

    useEffect(() => {
        actions.changeFoo(products)
    }, [products]);

    console.log('state', state);

    // let filteredProducts;
    console.log('filteredProducts', filter);

    useEffect(() => {
        if(state?.products?.length) {
            setFilter(state.products.sort((a, b) => a.price - b.price));
            // filteredProducts = state.products.sort((a, b) => a.price - b.price);
        }
    }, [state])

    if (state.filters.query) {
    //   filteredProducts = filteredProducts.filter(product => {
    //     return product.title
    //       .toLowerCase()
    //       .includes(state.filters.query.toLowerCase());
    //   });
    setFilter(filter.filter(product => {
        console.log('PRODUCT', product);
        return product.name
          .toLowerCase()
          .includes(state.filters.query.toLowerCase());
      }));
    }

    if (state.filters.priceRange) {
      const [minPrice, maxPrice] = state.filters.priceRange;
    //   filteredProducts = filteredProducts.filter(product => {
    //     return product.price >= minPrice && product.price <= maxPrice;
    //   });
    setFilter(filter.filter(product => {
        return product.price >= minPrice && product.price <= maxPrice;
      }));
    }


    return (
        <Container maxWidth="lg" className={classes.customContainer}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {products?.length && products?.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                    sdsadsdsd
                </Grid>
            </Box>
        </Container>
    )
}

export default TestProductComponents;