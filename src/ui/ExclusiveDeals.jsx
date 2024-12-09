import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../Helper/Helper";

const ExclusiveDeals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/product/get-product`
        );
        setProducts(response.data.slice(0, 3)); // Display only 3 cards
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Labels for each card
  const shopLabels = ["Shop For ₹1,000", "Shop For ₹2,000", "Shop For ₹3,500"];

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h2 className="text-center text-orange-600 font-bold text-3xl mb-6">
          Claim Exclusive Deals
        </h2>

        {/* Cards Section */}
        <div className="overflow-x-auto whitespace-nowrap md:grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="inline-block md:flex md:flex-col border border-green-500 rounded-lg shadow-lg bg-white mx-2 md:mx-0"
              style={{ minWidth: "300px" }} // Ensures card width in scroller
            >
              {/* Top: Shop Label */}
              <div className="text-center p-2 border-b border-green-500">
                <p className="font-bold text-gray-800">
                  Shop For{" "}
                  <span className="text-red-600">
                    {shopLabels[index].split("Shop For ")[1]}
                  </span>
                </p>
              </div>

              {/* Main Content: Image and Details */}
              <div className="flex p-4">
                {/* Left: Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-28 h-28 object-contain"
                  />
                </div>

                {/* Right: Product Details */}
                <div className="flex-grow pl-4">
                  {/* Title and Subtitle */}
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.sub_title}
                  </p>

                  {/* Expiry Date */}
                  <p className="text-gray-600 text-sm">
                    Expiry:{" "}
                    <span className="font-bold text-red-600">
                    {product.expiry_date
    ? new Date(product.expiry_date).toLocaleDateString("en-GB") // Format to day-month-year
    : "N/A"}
                    </span>
                  </p>

                  {/* Price Section */}
                  <div className="flex items-center gap-2 mt-4">
                    <p className="text-2xl font-bold text-green-600">
                      ₹{product.sell_price}
                    </p>
                    <p className="text-gray-500 line-through text-sm">
                      ₹{product.mrp_price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveDeals;
