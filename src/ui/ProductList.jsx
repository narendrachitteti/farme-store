// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { ShoppingCartIcon } from "@heroicons/react/24/outline";
// import { useCart } from "../contexts/CartContext";
// import { useWishlist } from "../contexts/WishlistContext";
// import BASE_URL from "../Helper/Helper";
// import savedIcon from "../assets/discount.png";
// import wishlistIcon from "../assets/wishlist.png";
// import shareIcon from "../assets/share.png";

// const ProductSection = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true); // State to manage loading
//   const { addToCart, isItemInCart, getItemQuantity } = useCart();
//   const { addToWishlist, isItemInWishlist } = useWishlist();
//   // Fetch products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true); // Start loading
//         const response = await axios.get(`${BASE_URL}/product/get-product`);
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchProducts();
//   }, []);

// const handleWishlistClick = (e, product) => {
//   e.preventDefault();
//   addToWishlist({
//     id: product._id,
//     title: product.title,
//     sub_title: product.sub_title,
//     imageUrl: product.imageUrl,
//     mrp_price: product.mrp_price,
//     sell_price: product.sell_price,
//   });
// };

//   // Function to handle adding a product to the cart
//   const handleAddToCart = (product) => {
//     addToCart({
//       id: product._id,
//       title: product.title,
//       sub_title: product.sub_title,
//       imageUrl: product.imageUrl,
//       variant: {
//         originalPrice: product.mrp_price,
//         price: product.sell_price,
//       },
//     });
//   };

//   return (
//     <section className="py-8 bg-gray-100">
//       <div className="container mx-auto px-2 sm:px-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
//             Shop all Products
//           </h2>
//           <a
//             href="/products"
//             className="text-blue-500 hover:underline text-sm font-medium"
//           >
//             View All
//           </a>
//         </div>

//         {loading ? (
//           // Spinner loader with message
//           <div className="flex justify-center items-center min-h-[200px] flex-col">
//             <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
//             <p className="text-gray-500 text-sm font-medium">
//               Loading products...
//             </p>
//           </div>
//         ) : (
//           // Scrolling product cards
//           <div className="relative overflow-x-scroll flex space-x-4 snap-x snap-mandatory scrollbar-hide">
//             {products.map((product) => (
//               <Link
//                 to={`/product/${product._id}`}
//                 key={product._id}
//                 className="flex-shrink-0 w-48 snap-start"
//               >
//                 <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:p-4 relative transform transition duration-300 hover:shadow-lg">
//                   {/* Discount Badge */}
//                   <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
//                     {Math.round(
//                       ((product.mrp_price - product.sell_price) /
//                         product.mrp_price) *
//                         100
//                     )}
//                     % OFF
//                   </div>
//                   <div className="absolute top-2 right-2 flex flex-col items-center space-y-2">
//                     <img
//                       src={wishlistIcon}
//                       alt="Wishlist"
//                       className={`w-6 h-6 cursor-pointer ${
//                         isItemInWishlist(product._id) ? "opacity-50" : ""
//                       }`}
//                       onClick={(e) => handleWishlistClick(e, product)}
//                     />
//                     <img
//                       src={shareIcon}
//                       alt="Share"
//                       className="w-6 h-6 cursor-pointer"
//                     />
//                   </div>
//                   {/* Product Image */}
//                   <img
//                     src={product.imageUrl}
//                     alt={product.title}
//                     className="w-full h-28 sm:h-36 object-contain mb-2 rounded-lg"
//                   />

//                   {/* Product Details */}
//                   <h3 className="text-sm font-semibold text-gray-800 truncate mb-1">
//                     {product.title}
//                   </h3>
//                   <p className="text-gray-500 text-xs mb-1">
//                     {product.sub_title}
//                   </p>
//                   {/* Package Quantities */}
//                   <strong className="text-xs text-gray-600 mb-2">
//                     {/* <strong>Package Quantity:</strong>{" "} */}
//                     {Array.isArray(product.package_qty)
//                       ? product.package_qty
//                           .map((pkg) => `${pkg.qty} (${pkg.pkgName})`)
//                           .join(", ")
//                       : "N/A"}
//                   </strong>
//                   {/* Price Details */}
//                   <div className="flex items-center space-x-2 mb-1">
//                     <div className="text-base font-bold text-green-600">
//                       ₹{product.sell_price}
//                     </div>
//                     <div className="text-xs text-gray-500 line-through">
//                       ₹{product.mrp_price}
//                     </div>
//                   </div>
//                   <p className="text-xs text-green-500 mb-2 flex items-center">
//                     <img src={savedIcon} alt="Saved" className="w-4 h-4 mr-1" />
//                     Saved ₹{product.mrp_price - product.sell_price}
//                   </p>

//                   <p className="text-xs text-gray-600 mb-1">
//                     <strong>MFG Date :</strong>{" "}
//                     {product.mfg_date ? (
//                       <span className="text-green-600">
//                         {new Date(product.mfg_date).toLocaleDateString("en-GB")}{" "}
//                         {/* Format to day-month-year */}
//                       </span>
//                     ) : (
//                       "N/A"
//                     )}
//                   </p>
//                   <p className="text-xs text-gray-600 mb-1">
//                     <strong>EXP Date :</strong>{" "}
//                     {product.expiry_date ? (
//                       <span className="text-red-600">
//                         {new Date(product.expiry_date).toLocaleDateString(
//                           "en-GB"
//                         )}{" "}
//                         {/* Format to day-month-year */}
//                       </span>
//                     ) : (
//                       "N/A"
//                     )}
//                   </p>

//                   {/* Add to Cart Button */}
//                   <button
//                     className={`flex items-center justify-center w-full py-2 text-white font-semibold rounded-lg text-xs sm:text-sm transition-colors duration-200 ${
//                       isItemInCart(product._id)
//                         ? "bg-green-500 hover:bg-green-600"
//                         : "bg-orange-400 hover:bg-orange-600"
//                     }`}
//                     onClick={(e) => {
//                       e.preventDefault(); // Prevent navigation when clicking the add to cart button
//                       handleAddToCart(product); // Add to cart functionality
//                     }}
//                   >
//                     <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
//                     {isItemInCart(product._id)
//                       ? `In Cart (${getItemQuantity(product._id)})`
//                       : "Add to Cart"}
//                   </button>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none; /* Hide the scrollbar in Webkit browsers */
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none; /* IE and Edge */
//           scrollbar-width: none; /* Firefox */
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ProductSection;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import BASE_URL from "../Helper/Helper";
import savedIcon from "../assets/discount.png";
import wishlistIcon from "../assets/wishlist.png";
import filledHeartIcon from "../assets/wishlist1.png";
import shareIcon from "../assets/share.png";
import addIcon from "../assets/add.png"; // Offline + Icon
import deleteIcon from "../assets/delete.png"; // Offline Delete Icon
import discountBadge from "../assets/discountBadge.png";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const { addToCart, isItemInCart, getItemQuantity } = useCart();
  const { addToWishlist, isItemInWishlist } = useWishlist();
  const [quantities, setQuantities] = useState({}); // State for product quantities
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/product/get-product`);
        console.log("API Response:", response.data); // Check the API data here
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePackageSelect = (productId) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      console.log("Selected product:", product); // Check the full product object
      setSelectedProduct(product); // Ensure full product data is passed
      setIsDialogOpen(true);
    } else {
      console.error(`Product with ID ${productId} not found`);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const handleWishlistClick = (e, product) => {
    e.preventDefault();
    addToWishlist({
      id: product._id,
      title: product.title,
      sub_title: product.sub_title,
      imageUrl: product.imageUrl,
      mrp_price: product.mrp_price,
      sell_price: product.sell_price,
    });
  };

  // Handle increasing product quantity
  const handleIncreaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };
  const ProductDialog = ({ product, onClose, isOpen }) => {
    const { addToCart, removeFromCart, isItemInCart, getItemQuantity } =
      useCart();

    if (!isOpen || !product) return null;

    const handleAddToCart = (product, pkg) => {
      const currentQuantity = getItemQuantity(product._id);
      const updatedItem = {
        id: product._id,
        title: product.title,
        sub_title: product.sub_title,
        imageUrl: product.imageUrl,
        variant: {
          originalPrice: product.mrp_price,
          price: product.sell_price,
          quantity: currentQuantity + 1,
          packageName: pkg.pkgName,
        },
      };
      addToCart(updatedItem);
    };

    const handleRemoveFromCart = (product, pkg) => {
      const currentQuantity = getItemQuantity(product._id, pkg.pkgName);

      if (currentQuantity > 1) {
        // Decrease quantity by 1 directly
        const updatedItem = {
          id: product._id,
          title: product.title,
          sub_title: product.sub_title,
          imageUrl: product.imageUrl,
          variant: {
            originalPrice: product.mrp_price,
            price: product.sell_price,
            quantity: currentQuantity - 1,
            packageName: pkg.pkgName,
          },
        };
        addToCart(updatedItem); // Update cart with decreased quantity
      } else {
        // If quantity is 1, remove the item completely
        removeFromCart(product._id, pkg.pkgName);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
          >
            x
          </button>

          {/* Product Details Section */}
          <div className="flex items-start mb-4">
            <div className="border border-gray-300 rounded-md p-2 w-24 h-24">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="ml-4 flex-1">
              <h3 className="text-lg font-bold text-gray-800">
                {product.title}
              </h3>
              <h4 className="text-sm font-medium text-gray-600">
                {product.sub_title}
              </h4>
            </div>
          </div>

          {/* Variants Section */}
          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-800 mb-2">
              Choose Variants
            </h4>
            {Array.isArray(product.package_qty) &&
              product.package_qty.map((pkg, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-3"
                >
                  <div className="flex flex-col">
                    <p className="text-gray-800 text-sm font-medium">
                      {pkg.qty} {pkg.pkgName}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="text-base font-bold text-black-600">
                        ₹{product.sell_price}
                      </div>
                      <div className="text-xs text-gray-500 line-through">
                        ₹{product.mrp_price}
                      </div>
                      <div className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        {Math.round(
                          ((product.mrp_price - product.sell_price) /
                            product.mrp_price) *
                            100
                        )}
                        % OFF
                      </div>
                    </div>

                    <p className="text-xs text-green-600">
                      Saved ₹
                      {product.mrp_price && product.sell_price
                        ? product.mrp_price - product.sell_price
                        : "N/A"}
                    </p>
                    <span>
                      <span className="text-xs">Expiry :</span>{" "}
                      {product.expiry_date ? (
                        <span className="text-xs text-red-600">
                          {new Date(product.expiry_date).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </span>
                  </div>
                  <div className="ml-4">
                    {isItemInCart(product._id) ? (
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
                          onClick={() => handleRemoveFromCart(product, pkg)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">
                          {getItemQuantity(product._id)}
                        </span>
                        <button
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
                          onClick={() => handleAddToCart(product, pkg)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-gray-600 hover:bg-orange-600 text-white px-4 py-1 rounded text-sm"
                        onClick={() => handleAddToCart(product, pkg)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            {!Array.isArray(product.package_qty) ||
            product.package_qty.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No package sizes available for this product.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  // Handle decreasing product quantity
  const handleDecreaseQuantity = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
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
          <div className="flex justify-center items-center min-h-[200px] flex-col">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-gray-500 text-sm font-medium">
              Loading products...
            </p>
          </div>
        ) : (
          <div className="relative overflow-x-scroll flex space-x-4 snap-x snap-mandatory scrollbar-hide">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="flex-shrink-0 w-60 snap-start"
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:p-4 relative transform transition duration-300 hover:shadow-lg">
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="relative w-12 h-12">
                      {/* Badge Image */}
                      <img
                        src={discountBadge}
                        alt="Discount Badge"
                        className="w-full h-full object-contain" // Adjusts image size
                      />
                      {/* Discount Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-white text-xs font-bold leading-none">
                          {Math.round(
                            ((product.mrp_price - product.sell_price) /
                              product.mrp_price) *
                              100
                          )}
                          %
                        </span>
                        <span className="text-white text-xs font-medium leading-none">
                          OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 flex flex-col items-center space-y-2">
                    <img
                      src={
                        isItemInWishlist(product._id)
                          ? filledHeartIcon
                          : wishlistIcon
                      }
                      alt={
                        isItemInWishlist(product._id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"
                      }
                      className="w-6 h-6 cursor-pointer"
                      onClick={(e) => handleWishlistClick(e, product)}
                    />
                    <img
                      src={shareIcon}
                      alt="Share"
                      className="w-6 h-6 cursor-pointer"
                    />
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
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>
                      <strong>MFG :</strong>{" "}
                      {product.mfg_date ? (
                        <span className="text-green-600">
                          {new Date(product.mfg_date).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </span>
                    &nbsp;
                    <span>
                      <strong>| EXP :</strong>{" "}
                      {product.expiry_date ? (
                        <span className="text-red-600">
                          {new Date(product.expiry_date).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </span>
                  </div>
                  {/* Price Details */}
                  <div className="flex items-center space-x-2">
                    <div className="text-base font-bold text-black-600">
                      ₹{product.sell_price}
                    </div>
                    <div className="text-xs text-gray-500 line-through">
                      ₹{product.mrp_price}
                    </div>
                  </div>
                  <p className="text-xs text-green-500 flex items-center">
                    Saved Price ₹{product.mrp_price - product.sell_price}
                  </p>

                  {/* Package Quantity Select */}
                  <div className="flex items-center justify-between mb-2">
                    {/* Select Label */}
                    <label className="text-xs font-semibold text-gray-600 w-1/3">
                      Select
                    </label>

                    {/* Dropdown & Icons */}
                    <div className="flex items-center w-2/3">
                      {/* Select Field */}
                      <textfield
                        className="w-full border text-xs rounded px-2 py-1 appearance-none text-center cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePackageSelect(product._id); // Open the dialog on dropdown click
                        }}
                      >
                        {Array.isArray(product.package_qty) &&
                          product.package_qty.map((pkg, index) => (
                            <option key={index} value={pkg.qty}>
                              {pkg.qty} {pkg.pkgName}
                            </option>
                          ))}
                      </textfield>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <ProductDialog
        product={selectedProduct}
        onClose={handleDialogClose}
        isOpen={isDialogOpen}
      />
    </section>
  );
};

export default ProductSection;
