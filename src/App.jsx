import React from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import GalleryPage from "./pages/Gallery";
import AboutPage from "./pages/About";
import ServicePage from "./pages/Services";
import ContactPage from "./pages/Contact";
import ServiceDetailsPage from "./pages/ServiceDetails";
import CartPage from "./pages/CartPage";
import { AppProvider } from "./components/AppContext";
import AdminPanel from "./pages/AdminPanel";
export default function App () {
  return (
    <AppProvider>
    <div>
      <Router>
      <div className="w-full overflow-hidden syne">
       <div className="md:h-24 h-20">

       <Header  /> 
       </div>
        <Routes>
          <Route path="/" element={<HomePage  />} />
           <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage  />} />
          <Route path="/services" element={<ServicePage/>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/services/:id" element={<ServiceDetailsPage/>} />
          <Route path="/admin" element={<AdminPanel/>} />
            
         </Routes>
         <Footer/>
      </div>
    </Router>
    </div>
    </AppProvider>
  )
};