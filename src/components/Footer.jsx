import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
import { useAppContext } from './AppContext';

export default function Footer() {
  const {user,services} = useAppContext();
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">{user.brand}</h3>
            <p className="text-gray-400">Bringing beauty to your special moments</p>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-pink-500 transition-colors">Home</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-pink-500 transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-pink-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-pink-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service,i) =>(
              <li key={i}><Link to={`/services/${service._id}`} className="text-gray-400 hover:text-pink-500 transition-colors">{service.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href={user.fbLink} className="text-white hover:text-pink-500 transition-colors"><FaFacebookF /></a>
              <a href={user.twLink} className="text-white hover:text-pink-500 transition-colors"><FaTwitter /></a>
              <a href={user.instaLink} className="text-white hover:text-pink-500 transition-colors"><FaInstagram /></a>
              <a href={user.pintLink} className="text-white hover:text-pink-500 transition-colors"><FaPinterestP /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">&copy; 2025 {user.brand}. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/privacy" className="text-gray-400 hover:text-pink-500 transition-colors mr-4">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-pink-500 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

