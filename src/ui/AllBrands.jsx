import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBrands = () => {
  const [brands, setBrands] = useState([]);

  // Fetch the brand data from the API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("https://farm-e-store-backend.vercel.app/api/brand/get-brand");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">All Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            to={`/products/brand/${brand._id}`} // Added link to product page for this brand
            className="bg-white rounded-md shadow-sm border border-gray-200 p-4 flex flex-col items-center hover:shadow-md transition-shadow duration-200 ease-in-out"
          >
            <img
              src={brand.imageUrl}
              alt={brand.title}
              className="w-24 h-24 object-contain mb-2"
            />
            <h3 className="text-md font-medium text-center">{brand.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllBrands;
