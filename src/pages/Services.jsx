import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import ServiceHero from '../components/ServiceHero';
import { useAppContext } from '../components/AppContext';


export default function ServicePage() {
  const {services} = useAppContext()
  const [ servicesData,setServicesData] = useState([])
  useEffect(()=>{
setServicesData(services)
window.scrollTo(top)
  },[services])
  return (
    <div className="min-h-screen bg-white">
      <ServiceHero />
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={service._id} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

