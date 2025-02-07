import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../components/AppContext";

export default function HomePage() {
  const navigate = useNavigate();
useEffect(()=>{
  window.scrollTo(top)
})
  const { services, products,path ,setProductDetails} = useAppContext();
  const handleBuyNow = (image) => {
    setProductDetails(image); // Set product details in context
    navigate('/cart'); // Navigate to CartPage
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/wed3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <motion.div
          className="relative z-10 text-center bg-black bg-opacity-50 h-full w-full flex justify-center flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-4 philosopher text-white uppercase">
            <span className="text-pink-100">Elegant </span>
            <span className="">Floral </span>
            <span className="text-white">Designs</span>
          </h1>
          <p className="text-white text-xl mb-8">
            For Weddings, Cars, and Beyond
          </p>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 text-white px-8 py-3 transition-colors hover:bg-pink-600"
            >
              <Link to={"/services"}>Explore More</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-pink-500 px-8 py-3 transition-colors hover:bg-gray-100"
            >
              <Link to={"/contact"}>Contact Us</Link>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Featured Images */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Our Featured Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((item, index) => (
            <motion.div
              key={index}
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{
                type: "spring",
                stiffness: 100,
                duration: 0.3,
                delay: index * 0.2,
              }}
            >
              <img
                src={path.slice(0,21) +item.images[0]}
                alt={item.description}
                className="w-full h-64 object-cover"
              />
              <p className="mt-2 text-center text-lg">{item.category}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Cards Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: index * 0.1,
                  duration: 0.3,
                }}
              >
                <img
                  src={path.slice(0,22) + product.image}
                  alt={product.description}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.price}</p>
                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBuyNow(product)}
                      className="bg-pink-500 text-white px-4 py-2 transition-colors hover:bg-pink-600"
                    >
                      Order Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-white text-black py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Transform Your Special Day
          </h2>
          <p className="text-xl mb-8">
            Discover our stunning floral arrangements and car decorations
          </p>
          <Link to={"/gallery"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 text-white px-8 py-3 text-lg font-semibold transition-colors hover:bg-pink-600"
            >
              View Gallery
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
