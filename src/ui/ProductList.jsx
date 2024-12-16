import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext";
import BASE_URL from "../Helper/Helper";
import savedIcon from "../assets/discount.png";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const { addToCart, isItemInCart, getItemQuantity } = useCart();
  const scrollContainerRef = useRef(null);
  const productContainerRef = useRef(null); // New ref for the first product card

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/product/get-product`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle sorting logic
  const handleSort = (option) => {
    setSortOption(option);
    let sortedProducts = [...products];

    if (option === "A-Z") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "Z-A") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (option === "Price: Low to High") {
      sortedProducts.sort((a, b) => a.sell_price - b.sell_price);
    } else if (option === "Price: High to Low") {
      sortedProducts.sort((a, b) => b.sell_price - a.sell_price);
    }

    setProducts(sortedProducts);

    // Ensure the first product card is visible
    setTimeout(() => {
      if (productContainerRef.current) {
        const firstProductCard = productContainerRef.current.querySelector('.snap-start');
        if (firstProductCard) {
          // Scroll to the first product card
          scrollContainerRef.current.scrollTo({
            left: firstProductCard.offsetLeft,
            behavior: "smooth"
          });
        }
      }
    }, 0);
  };

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
          {/* Section Title */}
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
            Shop all Products
          </h2>
          <div className="flex flex-col items-end space-y-2">
            {/* View All Link */}
            <a
              href="/products"
              className="text-blue-500 hover:underline text-sm font-medium"
            >
              View All
            </a>

            {/* Sort Dropdown with Filter Icon */}
            <div className="relative flex items-center space-x-2">
              {/* Custom Filter Dropdown */}
              <div className="relative w-full">
                {/* Filter Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h18M6.75 9h10.5M10.5 13.5h3"
                  />
                </svg>

                {/* Dropdown with reduced width */}
                <select
                  className="text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg pl-8 pr-3 py-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  style={{ width: "170px" }} // Custom width
                  value={sortOption}
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="A-Z">Alphabetical (A-Z)</option>
                  <option value="Z-A">Alphabetical (Z-A)</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
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
          <div
            className="relative overflow-x-scroll flex space-x-4 snap-x snap-mandatory scrollbar-hide"
            ref={scrollContainerRef}
          >
            <div 
              className="flex space-x-4"
              ref={productContainerRef}
            >
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
                          {new Date(product.mfg_date).toLocaleDateString("en-GB")}
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
                          )}
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
                        e.preventDefault();
                        handleAddToCart(product);
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
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ProductSection;