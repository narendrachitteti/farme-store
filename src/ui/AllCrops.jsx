import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Allcrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the crop data from the API
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://farm-e-store-backend.vercel.app/api/crop/get-crops");
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">All Crops</h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg font-medium">Loading crops...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {crops.map((crop) => (
            <Link
              key={crop._id}
              to={`/products/crop/${crop._id}`} // Dynamic link to the crop's product page
              className="bg-white rounded-md shadow-sm border border-gray-200 p-4 flex flex-col items-center hover:shadow-md transition-shadow duration-200 ease-in-out"
            >
              <img
                src={crop.imageUrl}
                alt={crop.title}
                className="w-24 h-24 object-contain mb-2"
              />
              <h3 className="text-md font-medium text-center">{crop.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Allcrops;
