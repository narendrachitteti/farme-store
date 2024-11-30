// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Package, Calendar, MapPin, CreditCard, ShoppingCart } from "lucide-react";

// const OrderCard = ({ order }) => {
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR'
//     }).format(amount);
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return 'bg-green-100 text-green-800';
//       case 'processing':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'shipped':
//         return 'bg-blue-100 text-blue-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6 transition-all duration-300 hover:shadow-lg">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center space-x-3">
//           <Calendar className="text-gray-500" size={20} />
//           <span className="text-sm text-gray-600">
//             {new Date(order.date).toLocaleDateString('en-IN', {
//               day: 'numeric',
//               month: 'long',
//               year: 'numeric'
//             })}
//           </span>
//         </div>
//         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
//           {order.order_status}
//         </span>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4 mb-4">
//         <div>
//           <div className="flex items-center space-x-3 mb-2">
//             <MapPin className="text-gray-500" size={20} />
//             <p className="text-sm text-gray-700">{order.address}</p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <CreditCard className="text-gray-500" size={20} />
//             <p className="text-sm text-gray-700">
//               Pincode: {order.pincode} | Phone: {order.phone}
//             </p>
//           </div>
//         </div>
//         <div className="flex justify-end items-center">
//           <div className="text-right">
//             <div className="flex items-center justify-end space-x-2 mb-2">
//               <ShoppingCart className="text-gray-500" size={20} />
//               <span className="text-lg font-bold text-gray-800">
//                 {formatCurrency(order.total_amount)}
//               </span>
//             </div>
//             <p className="text-sm text-gray-500">Transaction ID: {order.transaction_id}</p>
//           </div>
//         </div>
//       </div>

//       <div className="border-t pt-4">
//         <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
//           <Package className="mr-2 text-gray-500" size={20} />
//           Order Products
//         </h4>
//         <div className="grid gap-2">
//           {order.products.map((product) => (
//             <div 
//               key={product._id} 
//               className="bg-gray-50 rounded-md p-3 flex justify-between items-center"
//             >
//               <span className="text-sm text-gray-600">Product ID: {product.product_id}</span>
//               <span className="text-sm font-medium text-gray-800">
//                 Quantity: {product.quantity}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const OrderDetails = () => {
//   const [orders, setOrders] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const userId = "66efc74fb7cba2a32bea77ae"; 

//   useEffect(() => {
//     const fetchUserOrders = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `https://farm-e-store-backend.vercel.app/api/order/get-orders`
//         );
//         const data = await response.json();
        
//         if (data && Array.isArray(data)) {
//           const userOrders = data.filter((order) => order.user_id === userId);
//           if (userOrders.length > 0) {
//             setOrders(userOrders);
//           } else {
//             setError("No orders found for this user.");
//           }
//         } else {
//           setError("Failed to fetch orders.");
//         }
//       } catch (error) {
//         setError("Error fetching orders.");
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchUserOrders();
//   }, [userId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4 mx-auto"></div>
//           <p className="text-gray-600">Loading your orders...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gray-100">
//         <div className="text-center bg-white p-8 rounded-lg shadow-md">
//           <div className="mb-4">
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-16 w-16 text-red-500 mx-auto" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth={2} 
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
//               />
//             </svg>
//           </div>
//           <p className="text-red-500 text-lg mb-2">{error}</p>
//           <p className="text-gray-600">Please try again later or contact support.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="mb-8 text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Orders</h2>
//           <p className="text-gray-600">Track and manage your recent purchases</p>
//         </div>

//         {orders.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-20 w-20 text-gray-400 mx-auto mb-4" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth={2} 
//                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
//               />
//             </svg>
//             <p className="text-xl text-gray-600">No orders found</p>
//             <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>
//           </div>
//         ) : (
//           orders.map((order) => (
//             <OrderCard key={order._id} order={order} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Calendar, MapPin, CreditCard, ShoppingCart } from "lucide-react";
import BASE_URL from "../Helper/Helper"; // Ensure you have this import for base URL

const OrderCard = ({ order }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <Calendar className="text-gray-500" size={20} />
          <span className="text-sm text-gray-600">
            {new Date(order.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
          {order.order_status}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="text-gray-500" size={20} />
            <p className="text-sm text-gray-700">{order.address}</p>
          </div>
          <div className="flex items-center space-x-3">
            <CreditCard className="text-gray-500" size={20} />
            <p className="text-sm text-gray-700">
              Pincode: {order.pincode} | Phone: {order.phone}
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2 mb-2">
              <ShoppingCart className="text-gray-500" size={20} />
              <span className="text-lg font-bold text-gray-800">
                {formatCurrency(order.total_amount)}
              </span>
            </div>
            <p className="text-sm text-gray-500">Transaction ID: {order.transaction_id}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Package className="mr-2 text-gray-500" size={20} />
          Order Products
        </h4>
        <div className="grid gap-2">
          {order.products.map((product) => (
            <div 
              key={product._id} 
              className="bg-gray-50 rounded-md p-3 flex justify-between items-center"
            >
              <span className="text-sm text-gray-600">Product ID: {product.product_id}</span>
              <span className="text-sm font-medium text-gray-800">
                Quantity: {product.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrderDetails = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // TODO: Replace this with actual user authentication method
  const userId = "66efc74fb7cba2a32bea77ae"; 

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/order/get-orders`
        );
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          const userOrders = data.filter((order) => order.user_id === userId);
          if (userOrders.length > 0) {
            setOrders(userOrders);
          } else {
            setError("No orders found for this user.");
          }
        } else {
          setError("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserOrders();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 text-red-500 mx-auto" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <p className="text-red-500 text-lg mb-2">{error}</p>
          <p className="text-gray-600">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Orders</h2>
          <p className="text-gray-600">Track and manage your recent purchases</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-20 w-20 text-gray-400 mx-auto mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="text-xl text-gray-600">No orders found</p>
            <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderDetails;