import React, { useState } from "react"
import { Plus, X } from "lucide-react"
import axios from "axios"
import { useAppContext } from "./AppContext"

export default function AddServiceForm() {
  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    offers: [],
  })
  const {path} = useAppContext()

  const handleChange = (e) => {
    const { name, value } = e.target
    setService((prev) => ({ ...prev, [name]: value }))
  }


  const addOffer = () => {
    setService((prev) => ({
      ...prev,
      offers: [...prev.offers, { name: "", price: "", description: "" }],
    }))
  }

  const handleOfferChange = (index, field, value) => {
    const newOffers = [...service.offers]
    newOffers[index][field] = value
    setService((prev) => ({ ...prev, offers: newOffers }))
  }

  const removeOffer = (index) => {
    const newOffers = service.offers.filter((_, i) => i !== index)
    setService((prev) => ({ ...prev, offers: newOffers }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Get raw files
    setService((prev) => ({ ...prev, images: [...prev.images, ...files] })); // Store raw files
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', service.name);
    formData.append('description', service.description);
    formData.append('price', service.price);
  
    service.images.forEach((image) => {
      formData.append('images', image); // Append raw files
    });
  
    axios
      .post(path + 'services/', formData)
      .then((data) => {
        console.log('Service added successfully:', data);
        // Reset form after submission
        setService({
          name: "",
          description: "",
          price: "",
          images: [],
          offers: [],
        });
      })
      .catch((error) => {
        console.error('Error uploading service:', error);
      });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Service Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={service.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={service.description}
          onChange={handleChange}
          required
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        ></textarea>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={service.price}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
          Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleImageUpload}
          multiple
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-50 file:text-pink-700
            hover:file:bg-pink-100"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {service.images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Uploaded ${index + 1}`}
              className="h-20 w-20 object-cover rounded-md"
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Offers</label>
        {service.offers.map((offer, index) => (
          <div key={index} className="mt-2 p-4 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Offer {index + 1}</span>
              <button type="button" onClick={() => removeOffer(index)} className="text-red-500">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Offer Name"
              value={offer.name}
              onChange={(e) => handleOfferChange(index, "name", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
            <input
              type="text"
              placeholder="Offer Price"
              value={offer.price}
              onChange={(e) => handleOfferChange(index, "price", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
            <textarea
              placeholder="Offer Description"
              value={offer.description}
              onChange={(e) => handleOfferChange(index, "description", e.target.value)}
              rows="2"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            ></textarea>
          </div>
        ))}
        <button
          type="button"
          onClick={addOffer}
          className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-pink-700 bg-pink-100 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          <Plus size={16} className="mr-2" />
          Add Offer
        </button>
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          Add Service
        </button>
      </div>
    </form>
  )
}
