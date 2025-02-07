import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { FaEnvelope, FaMap, FaMapMarked, FaMapPin, FaPhoneAlt } from 'react-icons/fa';
import { CiUser,CiPhone, CiChat1, CiPaperplane } from "react-icons/ci";
import { useAppContext } from '../components/AppContext';
export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };
   
  const {user} = useAppContext();


  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>

        <div className="flex flex-col lg:flex-row justify-between mb-16">
          <motion.div 
            className="lg:w-1/2 mb-8 lg:mb-0 px-4 pl-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaMapMarked className="text-pink-500 mr-4" />
                <p>{user.address}</p>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="text-pink-500 mr-4" />
                <p>{user.mobile}</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-pink-500 mr-4" />
                <p>{user.email}</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <p>{user.time1}</p>
              <p>{user.time2}</p>
              <p>{user.time3}</p>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <CiUser className="absolute top-1 left-0 text-gray-400  text-xl " />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full pl-8 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="relative">
                <CiPhone className="absolute top-1 left-0 text-gray-400  text-xl" />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Your Mobile Number"
                  className="w-full pl-8 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div className="relative">
                <CiChat1 className="absolute top-1 left-0 text-gray-400 text-xl" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  className="w-full pl-8 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors resize-none"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="bg-pink-500 text-white pr-8 px-6 py-2 rounded-none hover:bg-pink-600 transition-colors relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message  
                 <CiPaperplane className="absolute top-2 -rotate-45 right-1 text-white text-xl" />
                
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="w-full h-96"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Find Us</h2>
          <iframe
          src={user.location}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}

