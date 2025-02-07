import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CategorySection from "../components/CategorySection";
import ImageGrid from "../components/ImageGrid";
import { useAppContext } from "../components/AppContext";



/* const galleryImages = [
  { id: 1, src: '/hom3.jpg', alt: 'Home Decoration ', category: 'home', price: '$49.99' },
  { id: 2, src: '/wed2.jpg', alt: 'Wedding Decoration ', category: 'wedding', price: '$99.99' },
  { id: 3, src: '/car7.jpg', alt: 'Brooms Car Decoration', category: 'car', price: '$79.99' },
  { id: 4, src: '/hom2.jpg', alt: 'Home Decoration', category: 'home', price: '$59.99' },
  { id: 5, src: '/wed1.jpg', alt: 'Wedding Decoration', category: 'wedding', price: '$129.99' },
  { id: 6, src: '/car12.jpg', alt: 'Car Decoration', category: 'car', price: '$89.99' },
];
 */
export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const gridRef = useRef(null);
  const { products,categories,searchResults } = useAppContext();
  const [galleryImages, setGalleryImages] = useState([]);
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    //gridRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setGalleryImages(products);
  },[products]);

  const filteredImages = selectedCategory
    ? galleryImages.filter((img) => img.category === selectedCategory)
    : searchResults;

  return (
    <div className="min-h-screen bg-white ">
      <div className="container mx-auto px-4">
        <CategorySection
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />

        <div ref={gridRef} className="mb-16">
          <ImageGrid images={filteredImages} />
        </div>
      </div>
    </div>
  );
}
