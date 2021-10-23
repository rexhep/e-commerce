import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core";
import Container from '@mui/material/Container';
import Product from './Product';

const useStyles = makeStyles((theme) => ({
    customContainer: {
        marginBottom: 80
    }
}));

const FilterProductsComponent = ({ state, actions }) => {
    const classes = useStyles();
    const productList = useSelector(state => state.productList);
    const productCatList = useSelector(state =>  {
        console.log('productCat::', state);
        return state.categoryOfProducts
    });
    console.log('productCatList::', productCatList);
    const [filteredProducts, setFilteredProducts] = useState();

    const { products } = productList;
    const { item } = productCatList;

    useEffect(() => {
        actions.allProducts(products?.length ? products : item);
    }, [products, item]);

    console.log('state::', state);

    useEffect(() => {
        if(state?.allProducts?.length) {
            setFilteredProducts(state.allProducts.slice().sort((a, b) => a.price - b.price));
        }
    }, [state])

    useEffect(() => {
        if (state.filters.query) {
            setFilteredProducts(filteredProducts.filter(product => product.name
                .toLowerCase()
                .includes(state.filters.query.toLowerCase())));
            }
    }, [state.filters.query])

    useEffect(() => {
        if (state.filters.priceRange) {
            const [minPrice, maxPrice] = state.filters.priceRange;
            setFilteredProducts(f => ([
                ...f.filter(product => {
                    return product.price >= minPrice && product.price <= maxPrice;
                  })
            ]));
          }
    }, [state.filters, state.filters.priceRange]);

    return (
        <Container maxWidth="lg" className={classes.customContainer}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {filteredProducts?.length ? filteredProducts.map(product => (
                        <Product key={product._id} product={product} />
                    )) : (
                        <div>No product found</div>
                    )}
                </Grid>
            </Box>
        </Container>
    )
}

export default FilterProductsComponent;