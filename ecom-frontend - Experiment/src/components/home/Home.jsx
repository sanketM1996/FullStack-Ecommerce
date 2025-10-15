import React, { useEffect } from "react";
import HeroBanner from "./HeroBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import { motion } from "framer-motion";
import Loader from "../shared/Loader";
import { FaExclamationTriangle, FaTruck, FaLock, FaStar } from "react-icons/fa";

const Home = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Products Section */}
      <div className="px-6 md:px-12 lg:px-20 mt-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 relative inline-block">
            Featured <span className="text-emerald-600">Products</span>
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-emerald-500 rounded-full transform -translate-x-1/2"></span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Explore our best-selling items picked just for you ✨
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
              show: {
                transition: { staggerChildren: 0.2 },
              },
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

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-12 px-6 md:px-12 lg:px-20 mt-12">
        <motion.div
          className="grid md:grid-cols-3 gap-10 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {[
            {
              icon: <FaTruck />,
              title: "Fast Delivery",
              desc: "Quick shipping across the country",
            },
            {
              icon: <FaLock />,
              title: "Secure Payment",
              desc: "Safe and reliable transactions",
            },
            {
              icon: <FaStar />,
              title: "Top Rated",
              desc: "Trusted by 10,000+ happy customers",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="text-3xl text-emerald-600 mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* blog */}
      {/* Latest News Section */}
      <motion.div
        className="px-6 md:px-12 lg:px-20 py-12 bg-gray-50 mt-10 rounded-2xl shadow-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 ">
          Latest from Our <span className="text-emerald-600">Blog</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((post, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">
                Blog Title {post}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Quick snippet about blog post {post}...{" "}
              </p>
              <button className="text-emerald-600 font-medium hover:underline">
                Read More →
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Categories Section */}
      <div className="px-6 md:px-12 lg:px-20 mt-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 relative inline-block">
            Shop by <span className="text-emerald-600">Categories</span>
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-emerald-500 rounded-full transform -translate-x-1/2"></span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Browse products by popular categories 🌿
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {["Electronics", "Fashion", "Home & Living", "Fitness"].map(
            (cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl shadow-md bg-white text-center border hover:border-emerald-500 transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">{cat}</h3>
              </motion.div>
            )
          )}
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div className="px-6 md:px-12 lg:px-20 mt-20">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 relative inline-block">
            What Our Customers <span className="text-emerald-600">Say</span>
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-emerald-500 rounded-full transform -translate-x-1/2"></span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Hear from our happy customers 💬
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Sanket", text: "Amazing quality products!" },
            { name: "Riya", text: "Fast delivery and great support!" },
            { name: "Aarav", text: "Best shopping experience ever!" },
          ].map((review, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-white shadow-md border hover:border-emerald-500 transition"
            >
              <p className="text-gray-600 italic">“{review.text}”</p>
              <h4 className="mt-4 font-bold text-gray-900">- {review.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-12 px-6 md:px-12 lg:px-20 mt-12 rounded-xl text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Stay Updated 🚀
        </motion.h2>
        <p className="mb-6 text-lg">
          Subscribe to our newsletter for offers & updates
        </p>
        <motion.form
          className="flex flex-col md:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg text-black w-full md:w-96 focus:outline-none"
          />
          <button className="bg-white text-emerald-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Subscribe
          </button>
        </motion.form>
      </section>
    </div>
  );
};

export default Home;
