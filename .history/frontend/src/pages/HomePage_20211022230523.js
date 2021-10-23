import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from "speedux";
import { makeStyles } from "@material-ui/core";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';
import ClientNavbar from '../components/clientHeader/ClientNavbar';
import HeaderSlider from '../components/clientHeader/HeaderSlider';
import SearchFilters from '../components/SearchFilters';
import ProductGridForFilter from '../components/products/ProductGridForFilter';

const useStyles = makeStyles((theme) => ({
    customContainer: {
        marginBottom: 80
    }
}));

const HomePage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const { loading, error } = productList;

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
                        <div className="search-filter-main">
                            <Provider>
                                <SearchFilters />
                                <ProductGridForFilter />
                            </Provider>
                        </div>

                    )
                }

            </div>
        </>
    )
}

export default HomePage;