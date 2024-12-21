import React from "react";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext"; // Import useCart to add items to the cart
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, isItemInCart, getItemQuantity } = useCart();

  // Handle add to cart functionality
  const handleAddToCart = (product) => {
    addToCart({
      id: product._id, // Make sure to use _id for consistency
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
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wishlist.map((product) => (
              <div
                key={product._id} // Use _id here for consistency
                className="bg-white border rounded-lg p-4 shadow-sm"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-28 object-contain mb-2"
                />
                <h3 className="text-sm font-semibold">{product.title}</h3>

                {/* Buttons (Add to Cart and Remove) */}
                <div className="flex justify-between items-center mt-2">
                  {/* Add to Cart button */}
                  <button
                    className={`flex items-center justify-center w-1/2 py-2 text-white font-semibold rounded-lg text-xs sm:text-sm transition-colors duration-200 ${
                      isItemInCart(product._id)
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-orange-400 hover:bg-orange-600"
                    }`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      handleAddToCart(product); // Add to cart functionality
                    }}
                  >
                    <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                    {isItemInCart(product._id)
                      ? `In Cart (${getItemQuantity(product._id)})`
                      : "Add to Cart"}
                  </button>

                  {/* Remove from wishlist button */}
                  <button
                    onClick={() => removeFromWishlist(product._id)} // Use _id here
                    className="text-red-500 text-xs sm:text-sm ml-2 border border-red-500 py-1 px-2 rounded-lg hover:bg-red-500 hover:text-white transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
