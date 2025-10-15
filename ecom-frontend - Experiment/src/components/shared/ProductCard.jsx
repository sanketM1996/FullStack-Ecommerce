import React, { useState } from "react";
import { FaShoppingCart, FaTag, FaEye, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import ProductViewModel from "./ProductViewModel";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
  productId,
  image,
  productName,
  description,
  quantity,
  price,
  discount,
  specialPrice,
}) => {
  const [openProductViewModel, setOpenProductViewModel] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = quantity && Number(quantity) > 0;
  const dispatch=useDispatch();
  const handelProductView = (product) => {
    setSelectedViewProduct(product);
    setOpenProductViewModel(true);
  };
const addToCartHandler=(cartItems)=>{
dispatch(addToCart(cartItems, 1,  toast));
}
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="relative border rounded-2xl shadow-md hover:shadow-blue-400/30 overflow-hidden transition-shadow duration-300 bg-white dark:bg-gray-900 dark:border-gray-700"
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-md z-10"
        >
          <FaTag className="text-[10px]" /> {discount}% OFF
        </motion.span>
      )}

      {/* Product Image + Overlay */}
      <div className="flex justify-center">
        <div className="relative w-32 h-32 overflow-hidden rounded-lg group cursor-pointer">
          <motion.img
            src={image}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition"
        >
          <button
            onClick={() =>
              handelProductView({
                productId,
                image,
                productName,
                description,
                quantity,
                price,
                discount,
                specialPrice,
              })
            }
            className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition transform hover:scale-110"
          >
            <FaEye />
          </button>
          <button className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition transform hover:scale-110">
            <FaHeart />
          </button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between h-48">
        <h2
          onClick={() =>
            handelProductView({
              id: productId,
              image,
              productName,
              description,
              quantity,
              price,
              discount,
              specialPrice,
            })
          }
          className="text-lg font-semibold mb-2 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-blue-500 transition"
        >
          {truncateText(productName,10)}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {truncateText(description,80)}
        </p>
        {/* Price & Button */}
        <div className="flex items-center justify-between mt-3">
          {specialPrice ? (
            <div className="flex flex-col">
              <span className="text-gray-400 line-through text-sm">
                ${Number(price).toFixed(2)}
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                ${Number(specialPrice).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              ${Number(price).toFixed(2)}
            </span>
          )}

         <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.9 }}
  disabled={!isAvailable}
  onClick={() => addToCartHandler({
    image,
    productName,
    description,
    specialPrice,
    price,
    productId,
    quantity,
  })}
  className={`relative text-white 
    py-2 px-4 sm:py-1.5 sm:px-3    /* smaller padding on small screens */
    text-base sm:text-sm           /* smaller font size on small screens */
    rounded-xl flex items-center gap-2 
    shadow-md overflow-hidden transition-all duration-300
    ${
      isAvailable
        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        : "bg-gradient-to-r from-gray-400 to-gray-600 cursor-not-allowed"
    }
  `}
>
  {/* Button Shine Effect */}
  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
  <FaShoppingCart className="sm:text-sm text-lg" /> {/* smaller icon on small screens */}
  {isAvailable ? "Add To Cart" : "Out of Stock"}
</motion.button>

        </div>
      </div>

      {/* Modal */}
      <ProductViewModel
        open={openProductViewModel}
        setOpen={setOpenProductViewModel}
        product={selectedViewProduct}
        isAvailable={isAvailable}
      />
    </motion.div>
  );
};

export default ProductCard;
