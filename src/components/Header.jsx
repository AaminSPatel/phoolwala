import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { useAppContext } from "./AppContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
const {user,updateSearchTerm} = useAppContext()
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 50], ["#fff", "rgba(255, 255, 255, 1)"]);
  const pathname = useLocation()
  /* useEffect(()=>{
    console.log(pathname.pathname);
  },[pathname]) */
  useEffect(() => {
    
    
    const handleScroll = () => setIsScrolled(window.scrollY > 29);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debounced search function
  const handleSearch = useCallback(
    debounce((query) => {
      console.log("Searching for:", query);
      updateSearchTerm(query)
      // Perform the search operation here (API call or local filtering)
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
   
  };

  return (
    <motion.header
      style={{ backgroundColor: headerBg }}
      className={`z-50 transition-colors duration-300 ${
        isScrolled ? "shadow-md fixed top-0 left-0 right-0" : isMenuOpen ? "relative bg-white" : "shadow-md md:h-24 h-20"
      }`}
    >
      <div className={`flex md:h-8 h-6  w-full bg-gray-800 px-8 py-1 text-sm text-gray-200 items-center justify-between ${isScrolled ? "hidden" : "transition duration-500"}`}>
        <span className="text-gray-50 flex items-center gap-1">
          <FaEnvelope /> {user.email}
        </span>
        <span className="text-gray-50 flex items-center gap-1">
          <FaPhoneAlt /> {user.mobile}
        </span>
      </div>

      <nav className={`container mx-auto ${isMenuOpen ? "" : "px-4 sm:px-6 lg:px-8"} md:py-4 py-3`}>
        <div className="flex justify-between items-center">
          <a href="/" className={`text-2xl font-bold text-pink-500 ${isMenuOpen ? "pl-4" : ""}`}>
            Floral Elegance
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Gallery", "Services", "Contact"].map((item) => (
              <Link to={`/${item == 'Home' ? '' : item.toLowerCase()}`} key={item} className={`text-gray-700 hover:text-pink-500 border-b-2  ${pathname.pathname.slice(1) === item.toLocaleLowerCase() ? 'border-b-2 border-b-pink-400': pathname.pathname.slice(1) === '' && item == 'Home' ? 'border-b-2 border-b-pink-400': 'border-b-white'} transition-colors`}>
                {item}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" onMouseEnter={() => setShowSearch(true)} onMouseLeave={() => setShowSearch(false)}>
              <button className="text-gray-700 hover:text-pink-500 transition-colors">
                <Search size={20} />
              </button>
              {showSearch && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search services..."
                  className="absolute right-0 top-0 border border-pink-500 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              )}
            </div>

          {/*   <Link to={"/cart"}>
              <button className="text-gray-700 hover:text-pink-500 transition-colors">
                <ShoppingCart size={20} />
              </button>
            </Link>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-pink-500 text-white px-5 py-2 transition-colors hover:bg-pink-600">
              <Link to={"/services"}>Book Now</Link>
            </motion.button> */}
          </div>

          <button className={`md:hidden text-gray-700 hover:text-pink-500 transition-colors ${isMenuOpen ? "pr-4" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 bg-white p-4">
            {["Home", "About", "Gallery", "Services", "Contact"].map((item) => (
              <Link to={`/${item == 'Home' ? '' : item.toLowerCase()}`} key={item} className="block text-gray-700 hover:text-pink-500 transition-colors">
                {item}
              </Link>
            ))}

            <div className="flex items-center space-x-4 mt-4">
              <div className="relative w-full">
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search services..."
                  className="w-full border border-pink-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
             {/*  <Link to={"/cart"}>
                <button className="text-gray-700 hover:text-pink-500 transition-colors">
                  <ShoppingCart size={20} />
                </button>
              </Link>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-pink-500 text-white px-5 py-2 transition-colors hover:bg-pink-600">
                <Link to={"/services"}>Book Now</Link>
              </motion.button> */}
            </div>
          </div>
        )}
      </nav>
    </motion.header>
  );
}
