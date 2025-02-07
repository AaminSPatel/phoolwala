import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../components/AppContext";

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { services, productDetails, setProductDetails,serviceDetails,setServiceDetails ,path} = useAppContext();

  useEffect(() => {
    const serviceData = services.find((s) => s._id === id);
    if (serviceData) {
      setService(serviceData);
      setMainImage(serviceData.images[0]); 
      window.scrollTo(top)
    }
  }, [id]);

  const handleOrderNow = (offer) => {
    setServiceDetails({ ...service, selectedOffer: offer });
    navigate("/cart");
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {service.name}
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src={path.slice(0,21) + mainImage || "/placeholder.svg"} alt={  `${service.description} ${service.name}`} className="w-full h-96 object-cover mb-4" />
            <div className="flex gap-4 overflow-x-auto pb-4">
              {service.images.map((img, index) => (
                <img
                  key={index}
                  src={path.slice(0,21) + img || "/placeholder.svg"}
                  alt={`${service.description} ${service.name} ${index + 1}`}
                  className="w-24 h-24 object-cover cursor-pointer"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 mb-6">{service.description}</p>
            <h2 className="text-2xl font-semibold mb-4">Price</h2>
            <p className="text-3xl text-pink-500 font-bold mb-6">{service.price}</p>
            <motion.button
              className="bg-pink-500 text-white px-6 py-3 w-full mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOrderNow(null)} // Pass selected offer if any
            >
              Book Now
            </motion.button>
            <motion.button
              className="border border-pink-500 text-pink-500 px-6 py-3 w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Wishlist
            </motion.button>
          </motion.div>
        </div>

        {service.offers.length > 0 ?<motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Offers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.offers.map((offer, index) => (
              <motion.div
                key={index}
                className="border p-6"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-2">{offer.name}</h3>
                <p className="text-2xl text-pink-500 font-bold mb-2">{offer.price}</p>
                <p className="text-gray-700 mb-4 min-h-14">{offer.description}</p>
                <motion.button
                  className="bg-pink-500 text-white px-4 py-2 w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOrderNow(offer)} // Pass selected offer
                >
                  Select
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div> : ''}
      </div>
    </div>
  );
}
