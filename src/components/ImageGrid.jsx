import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../components/AppContext';

export default function ImageGrid({ images }) {
  const navigate = useNavigate();
  const { setProductDetails,path } = useAppContext();

  const handleBuyNow = (image) => {
    setProductDetails(image); // Set product details in context
    navigate('/cart'); // Navigate to CartPage
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image, index) => (
        <motion.div
          key={image._id}
          className="bg-white shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.005, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className="relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img
              src={path.slice(0,22) + image.image|| "/placeholder.svg"}
              alt={path.slice(0,22) + image.image}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.button
                className="bg-pink-500 text-white px-4 py-2 mr-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleBuyNow(image)} // Add onClick handler
              >
                Buy Now
              </motion.button>
              <motion.button
                className="text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={24} />
              </motion.button>
            </div>
          </motion.div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{image.name}</h3>
            <p className="text-pink-500 font-bold">{image.price}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
