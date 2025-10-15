import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      {/* Heading */}
      <motion.h2
        className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact <span className="text-emerald-600">Us</span>
      </motion.h2>

      {/* Contact Info Section */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {[
          { icon: <FaPhoneAlt />, title: "Phone", info: "+91 98765 43210" },
          { icon: <FaEnvelope />, title: "Email", info: "support@estore.com" },
          { icon: <FaMapMarkerAlt />, title: "Address", info: "Pune, India" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-emerald-600 text-3xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.info}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form + Map */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
        {/* Form */}
        <motion.form
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Send us a message
          </h3>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
          <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-semibold shadow-lg hover:shadow-xl">
            Submit
          </button>
        </motion.form>

        {/* Map Section */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            title="Google Map"
            src="https://maps.google.com/maps?q=pune%20india&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full min-h-[350px] border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <motion.h3
          className="text-center text-2xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Frequently Asked Questions
        </motion.h3>
        <div className="space-y-4">
          {[
            {
              q: "How can I track my order?",
              a: "You will receive an email with a tracking ID once your order is shipped.",
            },
            {
              q: "What is your return policy?",
              a: "We offer a 7-day return policy for unused products with original packaging.",
            },
            {
              q: "How do I contact support?",
              a: "You can email us at support@estore.com or call +91 98765 43210.",
            },
          ].map((faq, i) => (
            <motion.div
              key={i}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-semibold text-gray-900">{faq.q}</h4>
              <p className="text-gray-600 text-sm mt-2">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
