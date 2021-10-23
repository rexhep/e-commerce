import React, { useEffect, useState } from 'react';
import { Provider } from "speedux";
import ClientNavbar from '../../components/clientHeader/ClientNavbar'
import ProductGridForFilter from '../../components/products/ProductGridForFilter';
import SearchFilters from '../../components/SearchFilters';

export default function ProductsByCategory() {
    const [pathUrl, setPathUrl] = useState('');

    const pathName = window.location?.href;

    useEffect(() => {
        const url = new URL(pathName);
        console.log('newUrl', url);
        setPathUrl(pathName);
    }, [pathName]);

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
