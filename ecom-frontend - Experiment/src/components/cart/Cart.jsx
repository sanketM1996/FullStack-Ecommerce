import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";

const Cart = () => {
    const dispatch=useDispatch();
    const {cart} =  useSelector((state)=>state.carts);
    const newCart ={...cart};
    newCart.totlaPrice=cart?.reduce(
        (acc,cur)=>acc + Number(cur?.specialPrice) * Number(cur?.quantity), 0
    )
    if(!cart || cart.length === 0)
        return <CartEmpty />
    
  return (
    <div className="lg:px-14 sm:px-8 px-4 py-10">
      {/* Header */}
      <div className="flex items-center flex-col mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
          <FaCartPlus size={40} className="text-emerald-600" />
          Your Cart
        </h1>
        <p className="text-lg text-gray-600 mt-3">All your selected items in one place</p>
      </div>

      {/* Cart Table Header */}
    <div className="grid grid-cols-4 pb-2 font-semibold items-center gap-4 text-center">
  <div className="text-sm sm:text-base md:text-lg text-slate-800">Product</div>
  <div className="text-sm sm:text-base md:text-lg text-slate-800">Price</div>
  <div className="text-sm sm:text-base md:text-lg text-slate-800">Quantity</div>
  <div className="text-sm sm:text-base md:text-lg text-slate-800">Total</div>
</div>

<div>
    {cart  &&  cart.length > 0 &&  cart.map((item,i)=> <ItemContent key={i} {...item} /> ) }
</div>
      {/* Subtotal + Actions */}
      <div className="border-t-[1.5px] border-slate-200 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        {/* Left Placeholder (can add coupon later) */}
        <div></div>

        {/* Right Checkout Section */}
        <div className="flex flex-col gap-4 text-sm sm:text-base w-full sm:w-auto">
          <div className="flex justify-between font-semibold text-lg">
            <span>Subtotal</span>
            <span>{formatPrice(newCart?.totlaPrice) }</span>
          </div>
          <p className="text-slate-500 text-sm">Taxes and shipping calculated at checkout</p>

          {/* Checkout Button */}
          <Link to="/checkout" className="w-full">
            <button
              onClick={() => {}}
              className="font-semibold w-full sm:w-[300px] py-3 px-6 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center gap-2 shadow-md hover:from-green-600 hover:to-emerald-700 hover:scale-105 active:scale-95 transition duration-300"
            >
              <FaCartPlus size={20} />
              Checkout
            </button>
          </Link>

          {/* Continue Shopping */}
          <Link
            to="/products"
            className="flex gap-2 items-center text-emerald-600 font-medium hover:underline hover:text-emerald-700 transition duration-300"
          >
            <IoMdArrowBack size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
