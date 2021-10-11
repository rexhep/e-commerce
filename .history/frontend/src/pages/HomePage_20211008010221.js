import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';
import Grid from '@mui/material/Grid';
import ClientNavbar from '../components/clientHeader/ClientNavbar';
import HeaderSlider from '../components/clientHeader/HeaderSlider';

const HomePage = () => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, []);

    return (
        <>
            <ClientNavbar />
            <div className="slider-cover">
                <HeaderSlider />
            </div>
            <div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) :
                    error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <Container maxWidth="lg">
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

            </div>
        </>
    )
}

export default HomePage;