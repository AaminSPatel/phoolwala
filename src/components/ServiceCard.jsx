import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white shadow-lg overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={`http://localhost:5000${service.images[0]}`}
          alt={`http://localhost:5000${service.images[0]}`}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to={`/services/${service._id}`} >
          <motion.button
            className="bg-pink-500 text-white px-6 py-2 text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
             Learn More
          </motion.button></Link>
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
        <p className="text-gray-600">{service.description}</p>
      </div>
    </motion.div>
  );
}

