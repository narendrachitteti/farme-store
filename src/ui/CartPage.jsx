import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { FiTrash2, FiEdit3, FiX, FiCheck } from "react-icons/fi";
import { Link } from 'react-router-dom';

// Snackbar Component
const Snackbar = ({ message, isVisible, onClose, type = "success" }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out z-50`}
      style={{ minWidth: "200px" }}
    >
      <div className="mr-2">
        <FiCheck size={18} />
      </div>
      <p className="flex-grow text-sm">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 hover:opacity-80 transition-opacity"
        aria-label="Close notification"
      >
        <FiX size={18} />
      </button>
    </div>
  );
};

// Cart Page Component
const CartPage = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message, type = "success") => {
    setSnackbar({
      visible: true,
      message,
      type,
    });
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  // Calculate subtotal based on item prices and quantities
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.variant.price);
      return total + itemPrice * item.quantity;
    }, 0);
  };

  // Calculate savings (difference between original price and current price)
  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = parseFloat(item.variant.originalPrice);
      const currentPrice = parseFloat(item.variant.price);
      return total + (originalPrice - currentPrice) * item.quantity;
    }, 0);
  };

  // Handle item removal with notification
  const handleRemoveItem = (itemId, itemTitle) => {
    removeFromCart(itemId);
    showSnackbar(`${itemTitle} removed from cart successfully`);
  };

  // Validate quantity updates
  const handleQuantityUpdate = (itemId, newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      updateItemQuantity(itemId, newQuantity);
      showSnackbar("Quantity updated successfully");
    }
  };

  return (
    <>
      {/* Snackbar */}
      <Snackbar
        message={snackbar.message}
        isVisible={snackbar.visible}
        onClose={hideSnackbar}
        type={snackbar.type}
      />

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
          aria-label="Close cart"
          role="button"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              Cart ({cartItems.length} Items)
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="border-b pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-xs text-gray-600">{item.sub_title}</p>
                      <p className="text-xs text-gray-500 line-through">
                        ₹{parseFloat(item.variant.originalPrice).toFixed(2)}
                      </p>
                      <p className="text-sm font-bold text-green-600">
                        ₹{parseFloat(item.variant.price).toFixed(2)}
                      </p>
                      <p className="text-xs text-green-600">
                        Save: ₹
                        {(
                          parseFloat(item.variant.originalPrice) -
                          parseFloat(item.variant.price)
                        ).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.title)}
                      className="text-red-500 p-1 hover:bg-red-50 rounded transition-colors"
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        handleQuantityUpdate(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityUpdate(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                      disabled={item.quantity >= 99}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <span className="ml-2 text-sm text-gray-600">
                      ₹
                      {(parseFloat(item.variant.price) * item.quantity).toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="mt-auto border-t pt-4">
              <div className="flex items-center mb-4">
                <FiEdit3 className="mr-2 text-green-500" />
                <textarea
                  placeholder="Add order notes"
                  className="w-full p-2 border rounded text-sm"
                  rows="2"
                  aria-label="Order notes"
                />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Items Total</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Total Savings</span>
                  <span>₹{calculateSavings().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Sub Total</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="mr-2"
                  aria-label="Accept terms and conditions"
                />
                <label htmlFor="terms" className="text-xs">
                  I accept the{" "}
                  <a href="#" className="text-blue-500 underline">
                    terms and conditions
                  </a>
                </label>
              </div>

              <Link to="/checkout">
                <button
                  className="w-full p-3 bg-green-500 text-white rounded text-sm font-semibold hover:bg-green-600 transition-colors"
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </button>
              </Link>
              <p className="text-xs text-gray-500 mt-2">
                Shipping, taxes, and discount codes calculated at checkout.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
