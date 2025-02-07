import React, { useState } from "react"
import { Plus } from "lucide-react"
import axios from 'axios'
import { useAppContext } from "./AppContext"

export default function AddProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,  // Store file instead of URL
    category: "",
  })
  const [preview, setPreview] = useState("")  // For image preview
  const [loading, setLoading] = useState(false)

  const { path } = useAppContext()

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

 /* [
  {
    "name": "Luxury Wedding Car Decoration",
    "description": "Elegant wedding car decoration featuring fresh roses, orchids, and seasonal flowers combined with satin ribbons and premium drapes for a grand appearance.",
    "price": 8000,
    "image": "https://example.com/images/luxury-wedding-car.jpg",
    "category": "Car Decoration"
  },
  {
    "name": "Budget-Friendly Car Decoration",
    "description": "Minimalistic car decoration with vibrant seasonal flowers, offering affordability without compromising style.",
    "price": 4000,
    "image": "https://example.com/images/budget-car.jpg",
    "category": "Car Decoration"
  },
  {
    "name": "Exclusive Wedding Planner Package",
    "description": "Comprehensive wedding planning service including venue selection, decoration, catering, and photography, tailored to create a magical experience.",
    "price": 75000,
    "image": "https://example.com/images/wedding-planner.jpg",
    "category": "Marriage & Event Management"
  },
  {
    "name": "Corporate Event Coordination",
    "description": "Professional event management service for corporate meetings, product launches, and conferences, ensuring seamless execution.",
    "price": 60000,
    "image": "https://example.com/images/corporate-event.jpg",
    "category": "Marriage & Event Management"
  },
  {
    "name": "Traditional Mandir Design",
    "description": "Beautiful mandir decoration using fresh flowers, lights, and traditional drapes to enhance the spiritual atmosphere.",
    "price": 12000,
    "image": "https://example.com/images/traditional-mandir.jpg",
    "category": "Mandir Design"
  },
  {
    "name": "Minimalist Mandir Decor",
    "description": "Elegant and simple mandir design with subtle floral arrangements and minimalistic decor for a serene look.",
    "price": 8000,
    "image": "https://example.com/images/minimalist-mandir.jpg",
    "category": "Mandir Design"
  },
  {
    "name": "Exquisite Wedding Garland",
    "description": "Handcrafted garland made with fresh roses, jasmine, and orchids, designed specifically for wedding ceremonies.",
    "price": 3000,
    "image": "https://example.com/images/wedding-garland.jpg",
    "category": "Garlands"
  },
  {
    "name": "Religious Ceremony Garland",
    "description": "Garland crafted with marigolds and jasmine, perfect for religious events and temple offerings.",
    "price": 2500,
    "image": "https://example.com/images/religious-garland.jpg",
    "category": "Garlands"
  },
  {
    "name": "Premium Wedding Bouquet",
    "description": "A luxurious bouquet made with fresh roses, tulips, and lilies, perfect for brides and special occasions.",
    "price": 2500,
    "image": "https://example.com/images/wedding-bouquet.jpg",
    "category": "Bouquets"
  },
  {
    "name": "Event Celebration Bouquet",
    "description": "Custom-designed bouquet with seasonal flowers, suitable for gifting during events or personal celebrations.",
    "price": 1800,
    "image": "https://example.com/images/event-bouquet.jpg",
    "category": "Bouquets"
  },
  {
    "name": "Classic Floral Sehra",
    "description": "Traditional sehra with fresh flowers and pearls, adding a regal touch to the groom's attire.",
    "price": 3500,
    "image": "https://example.com/images/classic-sehra.jpg",
    "category": "Sehra"
  },
  {
    "name": "Modern Designer Sehra",
    "description": "Stylish sehra designed with artificial embellishments and colorful threads for a contemporary look.",
    "price": 4000,
    "image": "https://example.com/images/modern-sehra.jpg",
    "category": "Sehra"
  }
]
 */

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))  // Image preview
      setProduct((prev) => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", product.name)
      formData.append("description", product.description)
      formData.append("price", product.price)
      formData.append("category", product.category)
      formData.append("image", product.image)

      const response = await axios.post(`${path}products/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log(response.data)

      // Reset form
      setProduct({
        name: "",
        description: "",
        price: "",
        image: null,
        category: "",
      })
      setPreview("")
    } catch (error) {
      console.error("Error submitting product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.name}
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
          value={product.description}
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
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageUpload}
          required
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-50 file:text-pink-700
            hover:file:bg-pink-100"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 h-32 w-32 object-cover rounded-md"
          />
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          disabled={loading}
        >
          <Plus className="w-5 h-5 mr-2" />
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>
    </form>
  )
}
