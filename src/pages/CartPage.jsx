import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flower } from "lucide-react";
import { useAppContext } from "../components/AppContext";
import axios from "axios";

export default function CartPage() {
  const { productDetails, serviceDetails,path } = useAppContext(); 
useEffect(()=>{
  window.scrollTo(top)
})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",  // Fixed: Using 'mobile' instead of 'phone'
    address: "",
    zipcode: "",
    deliveryDate: "",
    specialInstructions: "",
    totalAmount: productDetails ? productDetails.price : serviceDetails?.offers[0]?.price || 0, 
    orderStatus: "Pending",
    orderDate: new Date().toISOString(),
    orderType: productDetails ? "Product" : "Service",
  });

  // Reset form after success
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    zipcode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      productId: productDetails ? "6791f6c6add42d8a4f24a70e" : null,
      serviceId: serviceDetails ? "6791f8022a0e49ec7d39551f" : null,
    };

    try {
     // console.log("Submitting order:", orderData);

      const orderResponse = await axios.post(path+"orders/", orderData);

      if (orderResponse.data) {
        console.log("Order response:", orderResponse.data);
//console.log(orderResponse.data.data.name);

        const customerData = {
          name: orderResponse.data.data.name,
          email: orderResponse.data.data.email,
          mobile: orderResponse.data.data.phone,
          address: orderResponse.data.data.address,
          zipcode: orderResponse.data.data.zipcode,
          orders: orderResponse.data.data._id,
        };

        const customerResponse = await axios.post(path+"customers/", {
          name: orderResponse.data.data.name,
          email: orderResponse.data.data.email,
          mobile: orderResponse.data.data.phone,
          address: orderResponse.data.data.address,
          zipcode: orderResponse.data.data.zipcode,
          orders: orderResponse.data.data._id,
        });
        console.log("Customer response:", customerResponse.data);

        setCustomer(customerData);

        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          zipcode: "",
          deliveryDate: "",
          specialInstructions: "",
          totalAmount: 0,
          orderStatus: "Pending",
          orderDate: new Date().toISOString(),
          orderType: "",
        });

        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Error submitting order:", error.response ? error.response.data : error.message);
      alert("An error occurred while submitting your order. Please try again.");
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Order
        </motion.h1>

        <div className="lg:flex lg:space-x-8">
          <motion.div
            className="lg:w-1/2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white px-6 py-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {productDetails ? productDetails.name : serviceDetails?.name}
                </h3>
                <Flower className="text-pink-500" size={32} />
              </div>
              <div className="mb-6">
                <img
                  src={
                    productDetails
                      ?path.slice(0,22) + productDetails.image
                      : serviceDetails?.images.length > 0
                      ? path.slice(0,22) + serviceDetails.images[0]
                      : "/placeholder.svg"
                  }
                  alt={productDetails ? path.slice(0,22) + productDetails.image : serviceDetails?.name}
                  className="w-full h-64 object-cover rounded-md shadow-md"
                />
              </div>
              <p className="text-gray-600 text-lg mb-4">
                {productDetails ? productDetails.description : serviceDetails?.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">
                  ${formData.totalAmount.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  Category: {productDetails ? productDetails.category : "Service"}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white px-8 py-5 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-semibold mb-8 text-gray-800 pb-3">
                Order Details
              </h2>
              <div className="space-y-6">
                {[
                  { label: "Name", type: "text", name: "name" },
                  { label: "Email", type: "email", name: "email" },
                  { label: "Phone", type: "tel", name: "phone" },
                  { label: "Delivery Address", type: "textarea", name: "address" },
                  { label: "Zipcode", type: "text", name: "zipcode" },
                  { label: "Delivery/Service Date", type: "date", name: "deliveryDate" },
                  { label: "Special Instructions", type: "textarea", name: "specialInstructions" },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required={field.name !== "specialInstructions"}
                        rows="2"
                        className="w-full border-b-2 border-gray-600 bg-transparent py-2 px-1 focus:outline-none focus:border-pink-500 transition-colors"
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required
                        className="w-full border-b-2 border-gray-600 bg-transparent py-2 px-1 focus:outline-none focus:border-pink-500 transition-colors"
                      />
                    )}
                    <label
                      htmlFor={field.name}
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>
              <motion.button
                type="submit"
                className="mt-8 w-full bg-pink-500 text-white py-2 px-4 hover:bg-pink-600 transition-colors text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Place Order
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
