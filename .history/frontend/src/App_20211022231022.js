import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderPage from './pages/OrderPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProductPage from './pages/products/ProductPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import SigninPage from './pages/SigninPage';
import AdminRoute from './components/AdminRoute';
import NewProductPage from './pages/NewProductPage';
import MenageOrders from './pages/MenageOrders';
import MenageOrderDetails from './pages/MenageOrderDetails';
import Dashboard from './pages/Dashboard';
import Users from './pages/admin/users/Users';
import ProductsByCategory from './pages/products/ProductsByCategory';

function App() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const urlLocation = window.location.href;
    setUrl(new URL(urlLocation));
    console.log('url', url.pathname);
  }, [])

  return (
    <BrowserRouter>
      <main>
        <Route path="/cart/:id?" component={CartPage}></Route>
        <Route path="/product/:id" component={ProductPage}></Route>
        <Route path={url.pathname} component={ProductsByCategory}></Route>
        <Route path="/signin" component={SigninPage}></Route>
        <Route path="/register" component={RegisterPage}></Route>
        <Route path="/shipping" component={ShippingAddressPage}></Route>
        <Route path="/payment" component={PaymentMethodPage}></Route>
        <Route path="/placeorder" component={PlaceOrderPage}></Route>
        <Route path="/order/:id" component={OrderPage}></Route>
        <Route path="/orderhistory" component={OrderHistoryPage}></Route>
        <PrivateRoute path="/profile" component={ProfilePage}></PrivateRoute>
        <AdminRoute path="/dashboard" component={Dashboard}></AdminRoute>
        <AdminRoute path="/productlist" component={NewProductPage}></AdminRoute>
        <AdminRoute path="/menageOrders" component={MenageOrders}></AdminRoute>
        <AdminRoute path="/orderDetails/:id" component={MenageOrderDetails}></AdminRoute>
        <AdminRoute path="/userlist" component={Users}></AdminRoute>
        <Route path="/" component={HomePage} exact></Route>
      </main>
      <footer className="row center">
        All right reserved
      </footer>
    </BrowserRouter>
  );
}

export default App;
