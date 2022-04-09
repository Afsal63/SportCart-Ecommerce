import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer
} from "./reducers/productReducers";
import { cartReducer,
wishlistReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
  orderShippedReducer,
  orderCancelReducers,
  
} from "./reducers/orderReducers";
import {
  addNewOfferReducer,
  offerDeleteReducer,
  offerListReducer,

} from "./reducers/offerReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated:productTopRatedReducer,
  wishlist:wishlistReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderShipped:orderShippedReducer,
  orderMyList: orderListMyReducer,
  orderCancel: orderCancelReducers,
  offerList: offerListReducer,
  addNewOffer: addNewOfferReducer,
  offerDelete: offerDeleteReducer,

});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

 const wishlistItemsFromStorage=localStorage.getItem('wishlistItem')
 ? JSON.parse(localStorage.getItem('wishlistItem'))
:[];

const intialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },

  wishlist:{
  wishlistItem:wishlistItemsFromStorage
} 
};
const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
