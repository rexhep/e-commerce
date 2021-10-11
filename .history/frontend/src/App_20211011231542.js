import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import PrivateRoute from './components/privateRoute';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderPage from './pages/OrderPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import SigninPage from './pages/SigninPage';
import AdminRoute from './components/AdminRoute';
import NewProductPage from './pages/NewProductPage';
import MenageOrders from './pages/MenageOrders';
import MenageOrderDetails from './pages/MenageOrderDetails';
import Dashboard from './pages/Dashboard';

function App() {

  // const cart = useSelector(state => state.cart);
  // const { cartItems } = cart;

  //get userSignin from redux store
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  console.log('userInfo', userInfo);

  const dispatch = useDispatch();

  // const signoutHandler = () => {
  //   dispatch(signout());
  // }

  return (
    <BrowserRouter>
      <div>
        {/* {!userInfo?.isAdmin && (
          <header className="row">
            <div>
              <Link className="brand" to="/">Amazona</Link>
            </div>
            <div>
              <Link to="/cart">Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
            </div>
            <div>
              {userInfo ? (
                <div className="dropdown">
                  <ClientHeader userInfo={userInfo} signoutHandler={signoutHandler}></ClientHeader>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <AdminHeader></AdminHeader>
                </div>
              )}
            </div>
          </header>
        )} */}
        <main>
          <Route path="/cart/:id?" component={CartPage}></Route>
          <Route path="/product/:id" component={ProductPage}></Route>
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
          <Route path="/" component={HomePage} exact></Route>
        </main>
        <footer className="row center">
          All right reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
