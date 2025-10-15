import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/ProductReducer";
import { errorReducer } from "./reducers/errorReducer";
import { cartReducer } from "./reducers/cartReducer";
import { authReducer } from "./reducers/authReducer";
import { paymentMethodReducer } from "./reducers/paymentMethodReducer";
import { adminReducer } from "./reducers/adminReducer";
import { orderReducer } from "./reducers/orderReducer";
import { userReducer } from "./reducers/userReducer";
import { sellerReducer } from "./reducers/sellerReducer";


const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  :null;

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const selectUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : [];
const initialState = {
  auth: { user: user , selectUserCheckoutAddress},
  carts: { cart: cartItems },
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    carts: cartReducer,
    auth: authReducer,
     users: userReducer,
    payment: paymentMethodReducer,
        admin: adminReducer,
        order: orderReducer,
        seller: sellerReducer,


  },
  preloadedState: initialState,
});

export default store;
