import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductViewModel = ({ open, setOpen, product, isAvailable }) => {
  if (!product) return null; // ⛔ avoid rendering empty dialog

  const dispatch = useDispatch();

  // handler for closing modal
  const handleClose = () => setOpen(false);

  // handler for adding product to cart
  const addToCartHandler = () => {
    dispatch(addToCart(product, 1, toast));
    // toast.success(`${product.productName} added to cart!`);
    handleClose(); // optional: close modal after adding
  };

  const { image, productName, description, price, specialPrice } = product;

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative">
              <img
                src={image}
                alt={productName}
                className="w-full h-64 object-cover"
              />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-xl text-sm font-medium shadow ${
                  isAvailable
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isAvailable ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="p-6">
              {/* Title */}
              <DialogTitle
                as="h3"
                className="text-2xl font-semibold text-gray-900 mb-2"
              >
                {productName}
              </DialogTitle>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

              {/* Pricing */}
              <div className="flex items-center justify-between mb-6">
                {specialPrice ? (
                  <div>
                    <span className="line-through text-gray-400 mr-2">
                      ${Number(price).toFixed(2)}
                    </span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                      ${Number(specialPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    ${Number(price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {/* Add to Cart */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!isAvailable}
                  onClick={addToCartHandler}
                  className={`relative flex-1 flex items-center justify-center gap-2 
                    py-3 px-4 sm:py-2 sm:px-3
                    text-base sm:text-sm
                    rounded-xl font-semibold text-white 
                    overflow-hidden shadow-lg group transition-all duration-300
                    ${
                      isAvailable
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                  {/* Button Shine Effect */}
                  {isAvailable && (
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  )}
                  <FaShoppingCart className="text-lg sm:text-sm" />
                  {isAvailable ? "Add To Cart" : "Out of Stock"}
                </motion.button>

                {/* Close */}
                <button
                  onClick={handleClose}
                  className="flex-1 
                    py-3 px-4 sm:py-2 sm:px-3
                    text-base sm:text-sm
                    rounded-xl font-semibold border border-gray-300 text-gray-700 
                    hover:bg-gray-100 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductViewModel;
