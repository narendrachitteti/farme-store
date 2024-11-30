import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import BASE_URL from "../Helper/Helper";

const RazorpayCheckout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart(); // Access cart items and clearCart function
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleBackToHome = () => {
    navigate("/"); // Navigate to the homepage
  };
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.variant.price);
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = parseFloat(item.variant.originalPrice);
      const currentPrice = parseFloat(item.variant.price);
      return total + (originalPrice - currentPrice) * item.quantity;
    }, 0);
  };

  const handlePayment = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/razorpay/create-razorpay-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: calculateSubtotal(), // Convert to paise
            currency: "INR",
            notes: { orderNotes },
          }),
        }
      );

      const orderData = await response.json();

      const options = {
        key: "rzp_test_lAupy84di3wKt5",
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        name: "Farm-E Store",
        description: "Secure Checkout",
        handler: async function (response) {
          const verifyResponse = await fetch(
            `${BASE_URL}/razorpay/verify-razorpay-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            clearCart(); // Clear the cart after successful payment
            setPaymentSuccess(true);
            setPaymentDetails({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              amount: orderData.amount / 100,
            });
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: "Test User",
          email: "testuser@example.com",
          contact: "9999999999",
        },
        notes: { orderNotes },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Something went wrong. Please try again!");
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-3xl text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-700">
            Thank you for your purchase. Your payment was successful.
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Order ID: {paymentDetails.orderId}
            </p>
            <p className="text-sm text-gray-500">
              Payment ID: {paymentDetails.paymentId}
            </p>
            <p className="text-lg font-bold text-gray-800">
              Amount Paid: ₹{paymentDetails.amount.toFixed(2)}
            </p>
          </div>
          <button
            className="mt-6 p-3 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition-colors"
            onClick={handleBackToHome} // Call navigate to go back to home
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-3xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Razorpay Checkout
        </h1>
        <div className="overflow-y-auto max-h-80 mb-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-gray-500 line-through">
                  ₹{parseFloat(item.variant.originalPrice).toFixed(2)}
                </p>
                <p className="text-sm font-bold text-green-600">
                  ₹{parseFloat(item.variant.price).toFixed(2)} x {item.quantity}
                </p>
              </div>
              <p className="text-sm font-bold">
                ₹{(parseFloat(item.variant.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <textarea
          placeholder="Add order notes (optional)"
          className="w-full p-2 border rounded text-sm mb-4"
          rows="3"
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
        />
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
        <button
          className="w-full p-3 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition-colors"
          onClick={handlePayment}
        >
          Proceed to Pay ₹{calculateSubtotal().toFixed(2)}
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Shipping, taxes, and discount codes will be calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default RazorpayCheckout;
