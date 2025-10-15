import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./shared/ProductCard";
import { fetchProducts } from "../store/actions";
import Loader from "./shared/Loader";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaShippingFast, FaLock, FaSmile } from "react-icons/fa";

const About = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <motion.h1
        className="text-slate-800 text-4xl md:text-5xl font-extrabold text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        Welcome to{" "}
        <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          E-Store
        </span>
      </motion.h1>

      {/* About Us Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-emerald-600 mb-4">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <span className="font-semibold">E-Store</span>, we believe shopping should be
            seamless, affordable, and enjoyable. From trendy fashion to everyday essentials,
            our goal is to bring you handpicked products with unbeatable quality. 🚀
          </p>
        </motion.div>

<motion.div
  className="w-full lg:w-1/2 bg-black p-6 rounded-2xl grid grid-cols-2 gap-4"
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
>
  {/* Rectangle */}
  <img
    src="https://images.pexels.com/photos/7563677/pexels-photo-7563677.jpeg"
    alt="E-Store 1"
    className="h-[180px] w-full rounded-2xl object-cover 
      shadow-[0_0_15px_rgba(59,130,246,0.6)] 
      transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.9)]"
  />

  {/* Circle */}
  <img
    src="https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg"
    alt="E-Store 2"
    className="h-[180px] w-[180px] rounded-full object-cover justify-self-center 
      shadow-[0_0_15px_rgba(236,72,153,0.6)] 
      transform transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(236,72,153,0.9)]"
  />

  {/* Circle */}
  <img
    src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
    alt="E-Store 3"
    className="h-[180px] w-[180px] rounded-full object-cover justify-self-center 
      shadow-[0_0_15px_rgba(34,197,94,0.6)] 
      transform transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(34,197,94,0.9)]"
  />

  {/* Rectangle */}
  <img
    src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg"
    alt="E-Store 4"
    className="h-[180px] w-full rounded-2xl object-cover 
      shadow-[0_0_15px_rgba(251,191,36,0.6)] 
      transform transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.9)]"
  />
</motion.div>






      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16">
        <motion.h2
          className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose{" "}
          <span className="text-emerald-600">E-Store?</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {[
            { icon: <FaShippingFast />, title: "Fast Delivery", desc: "Get your products delivered at lightning speed." },
            { icon: <FaLock />, title: "Secure Payments", desc: "Shop confidently with 100% secure transactions." },
            { icon: <FaSmile />, title: "Customer Satisfaction", desc: "We prioritize your happiness above all." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl shadow-md bg-white hover:shadow-xl transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-emerald-600 text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="px-6 md:px-12 lg:px-20 mt-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
       <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 relative inline-block text-center">
  Featured{" "}
  <span className="text-emerald-600">Products</span>
  <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-emerald-500 rounded-full transform -translate-x-1/2"></span>
</h2>


          <p className="mt-4 text-gray-600 text-lg">
            Explore our top-selling items, picked just for you ✨
          </p>
        </motion.div>

        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-red-100 border border-red-300">
              <FaExclamationTriangle className="text-red-600 text-2xl" />
              <span className="text-red-700 font-semibold">{errorMessage}</span>
            </div>
          </div>
        ) : (
          <motion.div
            className="pb-6 pt-6 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-8 gap-x-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {products &&
              products.slice(0, 3).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <ProductCard {...item} />
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>

      {/* Testimonials Section */}
      <div className="mt-20 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What Our <span className="text-emerald-600">Customers Say</span>
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Sarah J.", text: "Amazing experience! Fast delivery and great quality." },
            { name: "David K.", text: "Customer support was excellent, will shop again!" },
            { name: "Emily R.", text: "Beautiful products, exactly as described. Highly recommend." },
          ].map((review, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 italic mb-3">“{review.text}”</p>
              <h4 className="font-semibold text-emerald-600">{review.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
