import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';

const HomePage = () => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, []);

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) :
                error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div className="row center">
                        {products.length && products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                )
            }

        </div>
    )
}

export default HomePage;