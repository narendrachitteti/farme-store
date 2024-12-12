import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext";
import BASE_URL from "../Helper/Helper";
import savedIcon from "../assets/discount.png";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const { addToCart, isItemInCart, getItemQuantity } = useCart();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${BASE_URL}/product/get-product`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  // Function to handle adding a product to the cart
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
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
            Shop all Products
          </h2>
          <a
            href="/products"
            className="text-blue-500 hover:underline text-sm font-medium"
          >
            View All
          </a>
        </div>

        {loading ? (
          // Spinner loader with message
          <div className="flex justify-center items-center min-h-[200px] flex-col">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-gray-500 text-sm font-medium">
              Loading products...
            </p>
          </div>
        ) : (
          // Scrolling product cards
          <div className="relative overflow-x-scroll flex space-x-4 snap-x snap-mandatory scrollbar-hide">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="flex-shrink-0 w-48 snap-start"
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:p-4 relative transform transition duration-300 hover:shadow-lg">
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {Math.round(
                      ((product.mrp_price - product.sell_price) /
                        product.mrp_price) *
                        100
                    )}
                    % OFF
                  </div>

                  {/* Product Image */}
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-28 sm:h-36 object-contain mb-2 rounded-lg"
                  />

                  {/* Product Details */}
                  <h3 className="text-sm font-semibold text-gray-800 truncate mb-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 text-xs mb-1">
                    {product.sub_title}
                  </p>
                  {/* Package Quantities */}
                  <strong className="text-xs text-gray-600 mb-2">
                    {/* <strong>Package Quantity:</strong>{" "} */}
                    {Array.isArray(product.package_qty)
                      ? product.package_qty
                          .map((pkg) => `${pkg.qty} (${pkg.pkgName})`)
                          .join(", ")
                      : "N/A"}
                  </strong>
                  {/* Price Details */}
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="text-base font-bold text-green-600">
                      ₹{product.sell_price}
                    </div>
                    <div className="text-xs text-gray-500 line-through">
                      ₹{product.mrp_price}
                    </div>
                  </div>
                  <p className="text-xs text-green-500 mb-2 flex items-center">
                    <img src={savedIcon} alt="Saved" className="w-4 h-4 mr-1" />
                    Saved ₹{product.mrp_price - product.sell_price}
                  </p>

                  <p className="text-xs text-gray-600 mb-1">
                    <strong>MFG Date :</strong>{" "}
                    {product.mfg_date ? (
                      <span className="text-green-600">
                        {new Date(product.mfg_date).toLocaleDateString("en-GB")}{" "}
                        {/* Format to day-month-year */}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </p>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>EXP Date :</strong>{" "}
                    {product.expiry_date ? (
                      <span className="text-red-600">
                        {new Date(product.expiry_date).toLocaleDateString(
                          "en-GB"
                        )}{" "}
                        {/* Format to day-month-year */}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </p>

                  {/* Add to Cart Button */}
                  <button
                    className={`flex items-center justify-center w-full py-2 text-white font-semibold rounded-lg text-xs sm:text-sm transition-colors duration-200 ${
                      isItemInCart(product._id)
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-orange-400 hover:bg-orange-600"
                    }`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation when clicking the add to cart button
                      handleAddToCart(product); // Add to cart functionality
                    }}
                  >
                    <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                    {isItemInCart(product._id)
                      ? `In Cart (${getItemQuantity(product._id)})`
                      : "Add to Cart"}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Hide the scrollbar in Webkit browsers */
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default ProductSection;
