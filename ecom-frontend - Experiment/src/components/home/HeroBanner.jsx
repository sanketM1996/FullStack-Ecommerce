import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bannerList } from "../../utils";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Import required modules from Swiper
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";

const colors = [
  "var(--color-banner-color1)",
  "var(--color-banner-color2)",
  "var(--color-banner-color3)",
];

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="rounded-md">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        slidesPerView={1}
        effect="fade"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {bannerList.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className="carousel-item rounded-md sm:h-[500px] h-96 flex items-center justify-center"
              style={{ backgroundColor: colors[i] }}
            >
              {/* LEFT TEXT CONTENT */}
              <div className="hidden lg:flex justify-center w-1/2 p-8">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    activeIndex === i
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-3xl text-white font-bold">{item.title}</h3>
                  <h1 className="text-5xl text-white font-bold mt-2">
                    {item.subtitle}
                  </h1>
                  <p className="text-white font-bold">{item.description}</p>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 inline-block"
                  >
                    <Link
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 px-4 rounded-2xl shadow-lg"
                      to="/products"
                    >
                      Shop Now
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* RIGHT IMAGE CONTENT */}
              <motion.div
                className="w-full flex justify-center lg:w-1/2 p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  activeIndex === i
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.8 }}
              >
                <img src={item.image} alt="" className="max-h-[400px]" />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
