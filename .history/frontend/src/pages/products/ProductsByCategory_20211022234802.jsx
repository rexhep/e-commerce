import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from "speedux";
import ClientNavbar from '../../components/clientHeader/ClientNavbar'
import ProductGridForFilter from '../../components/products/ProductGridForFilter';
import SearchFilters from '../../components/SearchFilters';
import { productByCategory } from '../actions/productActions';

export default function ProductsByCategory() {
    const [pathUrl, setPathUrl] = useState('');
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const pathName = window.location?.pathname;

    useEffect(() => {
        console.log('newUrl', pathName.split('/'))
        setPathUrl(pathName);
    }, [pathName]);

    useEffect(() => {
        dispatch(productByCategory());
    }, []);

    console.log('pathUrl', pathUrl);

    return (
        <div>
            <ClientNavbar />
            <Provider>
                <SearchFilters />
                <ProductGridForFilter />
            </Provider>
        </div>
    )
}
