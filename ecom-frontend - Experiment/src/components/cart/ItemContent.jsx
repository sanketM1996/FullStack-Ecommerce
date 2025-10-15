import React, { useState } from "react";
import truncateText from "../../utils/truncateText";
import { HiOutlineTrash } from "react-icons/hi";
import { formatPrice } from "../../utils/formatPrice";
import { useDispatch } from "react-redux";
import SetQuantity from "./SetQuantity";
import {
  decreaseCartQuantity,
  increaseCartQuantity,
  removeFromCart,
} from "../../store/actions";
import toast from "react-hot-toast";

const ItemContent = ({
  productId,
  productName,
  image,
  description,
  quantity,
  price,
  discount,
  specialPrice,
  cartId,
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const handleQtyIncrease = (cartItems) => {
    dispatch(
      increaseCartQuantity(cartItems, toast, currentQuantity, setCurrentQuantity)
    );
  };

  const handleQtyDecrease = (cartItems) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      dispatch(decreaseCartQuantity(cartItems, newQuantity));
    }
  };

  const removeItemFromCart = (cartItems) => {
    dispatch(removeFromCart(cartItems, toast));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center p-4 border border-slate-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
      
      {/* Product Info (span 2 cols on md) */}
      <div className="md:col-span-1 flex items-center gap-4">
        <img
          src={image}
          alt={productName}
          className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-cover rounded-lg shadow-md"
        />
        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
            {truncateText(productName)}
          </h3>
          <button
            onClick={() =>
              removeItemFromCart({
                image,
                productName,
                description,
                specialPrice,
                price,
                productId,
                quantity,
              })
            }
            className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white rounded-md shadow-md bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
          >
            <HiOutlineTrash size={14} />
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="justify-self-center text-sm sm:text-base md:text-lg font-semibold text-gray-700">
        <span className="md:hidden font-medium text-gray-500">Price: </span>
        {formatPrice(Number(specialPrice))}
      </div>

      {/* Quantity */}
      <div className="justify-self-center">
        <span className="md:hidden font-medium text-gray-500">Qty: </span>
        <SetQuantity
          quantity={currentQuantity}
          cardCounter={true}
          handeQtyIncrease={() =>
            handleQtyIncrease({
              image,
              productName,
              description,
              specialPrice,
              price,
              productId,
              quantity,
            })
          }
          handleQtyDecrease={() =>
            handleQtyDecrease({
              image,
              productName,
              description,
              specialPrice,
              price,
              productId,
              quantity,
            })
          }
        />
      </div>

      {/* Total */}
      <div className="justify-self-center text-sm sm:text-base md:text-lg font-semibold text-gray-800">
        <span className="md:hidden font-medium text-gray-500">Total: </span>
        {formatPrice(Number(currentQuantity) * Number(specialPrice))}
      </div>
    </div>
  );
};

export default ItemContent;
