// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

// const ProductSection = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]); // State to store the cart items

//   // Fetch products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           "https://farm-e-store-backend.vercel.app/api/product/get-product"
//         );
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();

//     // Load cart from localStorage on page load
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//   // Function to handle adding a product to the cart
//   const handleAddToCart = (product) => {
//     // Check if the product is already in the cart
//     const existingProduct = cart.find((item) => item._id === product._id);
//     if (existingProduct) {
//       // Update the quantity of the existing product
//       const updatedCart = cart.map((item) =>
//         item._id === product._id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       setCart(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     } else {
//       // Add the new product to the cart
//       const newProduct = { ...product, quantity: 1 };
//       const updatedCart = [...cart, newProduct];
//       setCart(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     }
//   };

//   return (
//     <section className="py-8 bg-gray-100">
//       <div className="container mx-auto px-2 sm:px-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">Shop all Products</h2>
//           <a href="#" className="text-blue-500 hover:underline text-sm font-medium">
//             View All
//           </a>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
//           {products.map((product) => (
//             <Link
//               to={`/product/${product._id}`}
//               key={product._id}
//               className="block"
//             >
//               <div className="bg-white border border-gray-200 rounded-lg shadow-md p-2 sm:p-4 relative transform transition duration-300 hover:shadow-lg">
//                 {/* Discount Badge */}
//                 <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
//                   {Math.round(
//                     ((product.mrp_price - product.sell_price) / product.mrp_price) * 100
//                   )}
//                   % OFF
//                 </div>

//                 {/* Wishlist Icon */}
//                 <button 
//                   className="absolute top-2 right-2"
//                   onClick={(e) => {
//                     e.preventDefault(); // Prevent navigation when clicking the heart icon
//                     // Add wishlist functionality here
//                   }}
//                 >
//                   <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200" />
//                 </button>

//                 {/* Product Image */}
//                 <img
//                   src={product.imageUrl}
//                   alt={product.title}
//                   className="w-full h-28 sm:h-36 object-contain mb-2 rounded-lg"
//                 />

//                 {/* Product Details */}
//                 <h3 className="text-sm font-semibold text-gray-800 truncate mb-1">
//                   {product.title}
//                 </h3>
//                 <p className="text-gray-500 text-xs mb-1">{product.sub_title}</p>

//                 {/* Price Details */}
//                 <div className="flex items-center space-x-2 mb-1">
//                   <div className="text-base font-bold text-green-600">
//                     ₹{product.sell_price}
//                   </div>
//                   <div className="text-xs text-gray-500 line-through">
//                     ₹{product.mrp_price}
//                   </div>
//                 </div>
//                 <p className="text-xs text-green-500 mb-2">
//                   Saved ₹{product.mrp_price - product.sell_price}
//                 </p>

//                 {/* Size Selector */}
//                 <div className="flex items-center space-x-2 mb-2">
//                   <label className="text-xs font-semibold text-gray-600">Size:</label>
//                   <select 
//                     className="border border-gray-300 rounded px-2 py-1 w-full text-xs focus:outline-none focus:border-orange-500"
//                     onClick={(e) => e.preventDefault()} // Prevent navigation when clicking the select
//                   >
//                     <option>Select Size</option>
//                     <option>1 kg</option>
//                     <option>500 gms</option>
//                     <option>250 gms</option>
//                   </select>
//                 </div>

//                 {/* Add to Cart Button */}
//                 <button
//                   className="flex items-center justify-center w-full py-2 bg-orange-500 text-white font-semibold rounded-lg text-xs sm:text-sm hover:bg-orange-600 transition-colors duration-200"
//                   onClick={(e) => {
//                     e.preventDefault(); // Prevent navigation when clicking the add to cart button
//                     handleAddToCart(product); // Add to cart functionality
//                   }}
//                 >
//                   <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
//                   Add to Cart
//                 </button>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductSection;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, isItemInCart, getItemQuantity } = useCart();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://farm-e-store-backend.vercel.app/api/product/get-product"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
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
        price: product.sell_price
      }
    });
  };

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Shop all Products</h2>
          <a href="#" className="text-blue-500 hover:underline text-sm font-medium">
            View All
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="block"
            >
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-2 sm:p-4 relative transform transition duration-300 hover:shadow-lg">
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  {Math.round(
                    ((product.mrp_price - product.sell_price) / product.mrp_price) * 100
                  )}
                  % OFF
                </div>

                {/* Wishlist Icon */}
                <button 
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation when clicking the heart icon
                    // Add wishlist functionality here
                  }}
                >
                  <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200" />
                </button>

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
                <p className="text-gray-500 text-xs mb-1">{product.sub_title}</p>

                {/* Price Details */}
                <div className="flex items-center space-x-2 mb-1">
                  <div className="text-base font-bold text-green-600">
                    ₹{product.sell_price}
                  </div>
                  <div className="text-xs text-gray-500 line-through">
                    ₹{product.mrp_price}
                  </div>
                </div>
                <p className="text-xs text-green-500 mb-2">
                  Saved ₹{product.mrp_price - product.sell_price}
                </p>

                {/* Size Selector */}
                <div className="flex items-center space-x-2 mb-2">
                  <label className="text-xs font-semibold text-gray-600">Size:</label>
                  <select 
                    className="border border-gray-300 rounded px-2 py-1 w-full text-xs focus:outline-none focus:border-orange-500"
                    onClick={(e) => e.preventDefault()} // Prevent navigation when clicking the select
                  >
                    <option>Select Size</option>
                    <option>1 kg</option>
                    <option>500 gms</option>
                    <option>250 gms</option>
                  </select>
                </div>

                {/* Add to Cart Button */}
                <button
                  className={`flex items-center justify-center w-full py-2 text-white font-semibold rounded-lg text-xs sm:text-sm transition-colors duration-200 ${
                    isItemInCart(product._id)
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation when clicking the add to cart button
                    handleAddToCart(product); // Add to cart functionality
                  }}
                >
                  <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                  {isItemInCart(product._id)
                    ? `In Cart (${getItemQuantity(product._id)})`
                    : 'Add to Cart'}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;