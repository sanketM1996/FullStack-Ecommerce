import React, { useState, useEffect } from "react";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Products from "./components/products/Products";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/auth/Register";
import Checkout from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import Sellers from "./components/admin/sellers/Sellers";
import Orders from "./components/admin/orders/Orders";
import AdminProducts from "./components/admin/products/AdminProducts";
import Category from "./components/admin/categories/Category";

function App() {


  return (
    <div>
      <Navbar />
    <Routes >
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={ <Products /> }/>
      <Route path="/about" element={ <About /> }/>
      <Route path="/contact" element={ <Contact /> }/>
      <Route path="/cart" element={ <Cart /> }/>
      {/* <Route path="/order-confirm" element={ <Checkout /> }/> */}
<Route path='/' element={<PrivateRoute />}>
            <Route path='/checkout' element={ <Checkout />}/>
            <Route path='/order-confirm' element={ <PaymentConfirmation />}/>
          </Route>
      <Route path="/" element={ <PrivateRoute publicPage /> }>
      <Route path="/login" element={ <Login /> }/>  
      <Route path="/register" element={ <Register /> }/>      

      </Route>

  <Route path='/' element={<PrivateRoute adminOnly />}>
            <Route path='/admin' element={ <AdminLayout />}>
              <Route path='' element={<Dashboard />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='sellers' element={<Sellers />} />
              <Route path='orders' element={<Orders />} />
              <Route path='categories' element={<Category />} />
            </Route>
          </Route>

    </Routes>
    <Toaster position="bottom-center"></Toaster>
     <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
