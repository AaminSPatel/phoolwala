import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../components/AppContext';

export default function AboutPage() {
  const {user} = useAppContext()
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Floral Elegance
        </motion.h1>

        <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
          <motion.div 
            className="lg:w-1/2 mb-8 lg:mb-0 px-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed ">
{user.description}            </p>
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img 
              src={user.profile} 
              alt="Wedding car decorated with flowers" 
              className="w-full h-auto object-cover shadow-lg p-10"
            />
          </motion.div>
        </div>

       
      </div>
    </div>
  );
}
