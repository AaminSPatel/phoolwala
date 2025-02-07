import React from 'react';
import { motion } from 'framer-motion';
import { GiButterflyFlower } from 'react-icons/gi';

export default function CategorySection({ categories, onCategoryClick }) {
  return (
    <motion.div 
      className="flex justify-center space-x-8 mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
         <motion.div
          className="cursor-pointer text-center my-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryClick(null)}
        >
         
          <div className='w-24 h-20 bg-gray-50 relative overflow-hidden mb-2 rounded-xl flex justify-center items-center shadow-pink-200 shadow-2xl'>

          <p className="text-sm font-semibold text-black ">All Category</p>
          <span className='text-pink-500 z-0  text-4xl absolute top-10 opacity-75 left-14'>  <GiButterflyFlower />  </span>

          </div>
        </motion.div>
      {categories.map((category) => (
        <motion.div
          key={category.id}
          className="w-24 h-20 bg-gray-50 relative overflow-hidden mt-4 cursor-pointer rounded-xl flex justify-center items-center shadow-pink-200 shadow-2xl" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryClick(category.id)}
        >
          
          <p className="text-sm font-semibold z-10 text-black ">{category.name}</p>
          <span className='text-pink-500 z-0  text-4xl absolute top-10 opacity-75 left-14'> {category.icon}  </span>
        </motion.div>
      ))}

    </motion.div>
  );
}

