import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceHero() {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/wed3.jpg')" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="text-center text-white"
          initial={{ opacity: 0, y: -20,scale:0.96 }}
          animate={{ opacity: 1, y: 0 , scale:1}}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-5xl font-bold mb-4">Our Floral Services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Transforming moments into memories with exquisite floral designs
          </p>
        </motion.div>
      </div>
    </div>
  );
}

