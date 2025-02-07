import React, { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
import { GiFlowerPot, GiButterflyFlower, GiFlowers } from "react-icons/gi";

// Create the context
const AppContext = createContext();

const initialCartItems = []; // Set to empty as we only want to show the selected product

const categories = [
  {
    id: "home",
    name: "Home Decor",
    image: "/hom2.jpg",
    icon: <GiButterflyFlower />,
  },
  {
    id: "wedding",
    name: "Wedding",
    image: "/wed1.jpg",
    icon: <GiButterflyFlower />,
  },
  { id: "car", name: "Car", image: "/car4.jpg", icon: <GiButterflyFlower /> },
];

// Create the provider component
export const AppProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [productDetails, setProductDetails] = useState();
  const [serviceDetails, setServiceDetails] = useState();
  const path = 'http://localhost:5000/api/'
  const [user, setUser] = useState({
    name: "Aamin Patel",
    email: "amin@gmail.com",
    id: "",
    mobile: 9030209080,
    address: "23, Ujjain, India",
    profile: "/car4.jpg",
    instaLink: "",
    fbLink: "",
    twLink: "",
    googleLink: "",
    pintLink: "",
    location: "",
    description: `At Floral Elegance, we bring your floral dreams to life. With over 20 years of experience, our team of expert florists specializes in creating stunning arrangements for weddings, events, and unique car decorations. We pride ourselves on using only the freshest, highest-quality flowers to ensure that your special day is nothing short of perfection. Our innovative designs and attention to detail set us apart, making Floral Elegance the go-to choice for those seeking extraordinary floral experiences.`,
    brand: "Floral Elegance",
    brandLogo: "",
    time1: "Monday - Friday: 9:00 AM - 6:00 PM",
    time2: "Saturday: 10:00 AM - 4:00 PM",
    time3: "Sunday: Closed",
  });
const [render,setRender] = useState(0);
  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await axios.get(path+'services'); 
        const productsResponse = await axios.get(path+'products'); 
        const ordersResponse = await axios.get(path+'orders');
        const customersResponse = await axios.get(path+'customers');
        setServices(servicesResponse.data);
        setProducts(productsResponse.data);
        setOrders(ordersResponse.data);
        setCustomers(customersResponse.data);
        console.log(servicesResponse.data,productsResponse.data,'customersData = ',ordersResponse.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [render]);

  // Search functionality
  useEffect(() => {
    const results = [...products].filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, services, products]);

  // Function to update search term
  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  // Value object to be provided to consumers
  const value = {
    services,
    products,
    searchTerm,
    searchResults,
    updateSearchTerm,
    initialCartItems,
    serviceDetails,
    setServiceDetails,
    user,render,setRender,
    categories,
    productDetails,
    setProductDetails,path,
    orders,customers
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
