import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../Helper/Helper";
import { useCart } from "../contexts/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ExclusiveDeals = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, isItemInCart, getItemQuantity } = useCart(); // Use CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product/get-product`);
        setProducts(response.data.slice(0, 10)); // Display up to 10 cards
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const shopLabels = [
    "Shop For ₹1,000",
    "Shop For ₹2,000",
    "Shop For ₹3,500",
    "Shop For ₹4,500",
    "Shop For ₹5,000",
    "Shop For ₹6,000",
    "Shop For ₹7,000",
    "Shop For ₹8,000",
    "Shop For ₹9,000",
    "Shop For ₹10,000",
  ];

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      title: product.title,
      sub_title: product.sub_title,
      imageUrl: product.imageUrl,
      variant: {
        originalPrice: product.mrp_price,
        price: product.sell_price,
      },
    });
  };

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h2 className="text-center text-orange-600 font-bold text-3xl mb-6">
          Claim Exclusive Deals
        </h2>

        {/* Cards Section: Horizontal Scroller */}
        <div className="flex overflow-x-auto space-x-4 px-2 md:px-0 scrollbar-hide">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="flex flex-col border border-green-500 rounded-lg shadow-lg bg-white flex-shrink-0"
              style={{ minWidth: "300px" }} // Fixed card width
            >
              {/* Top: Shop Label */}
              <div className="text-center p-2 border-b border-green-500">
                <p className="font-bold text-gray-800">
                  Shop For{" "}
                  <span className="text-red-600">
                    {shopLabels[index % shopLabels.length].split("Shop For ")[1]}
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
                        ? new Date(product.expiry_date).toLocaleDateString(
                            "en-GB"
                          )
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

                  {/* Add to Cart Button */}
                  <button
                    className={`mt-4 flex items-center justify-center w-full py-2 text-white font-semibold rounded-lg text-xs sm:text-sm transition-colors duration-200 ${
                      isItemInCart(product._id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-400 hover:bg-orange-600"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isItemInCart(product._id)) {
                        handleAddToCart(product);
                      }
                    }}
                    disabled={isItemInCart(product._id)}
                  >
                    <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                    {isItemInCart(product._id)
                      ? `In Cart (${getItemQuantity(product._id)})`
                      : "Add to Cart"}
                  </button>
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
