// import React, { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     try {
//       const savedCart = localStorage.getItem("cartItems");
//       return savedCart ? JSON.parse(savedCart) : [];
//     } catch (error) {
//       console.error("Error loading cart from localStorage:", error);
//       return [];
//     }
//   });

//   useEffect(() => {
//     try {
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     } catch (error) {
//       console.error("Error saving cart to localStorage:", error);
//     }
//   }, [cartItems]);

//   const addToCart = (newItem) => {
//     if (!newItem.id) {
//       console.error("Invalid item format:", newItem);
//       return;
//     }

//     setCartItems((prevItems) => {
//       const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);

//       if (existingItemIndex !== -1) {
//         return prevItems.map((item, index) => {
//           if (index === existingItemIndex) {
//             return {
//               ...item,
//               quantity: item.quantity + 1
//             };
//           }
//           return item;
//         });
//       }

//       return [...prevItems, { ...newItem, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
//   };

//   const updateItemQuantity = (itemId, newQuantity) => {
//     if (newQuantity < 1) {
//       return removeFromCart(itemId);
//     }

//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === itemId
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem("cartItems");
//   };

//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   const cartSubtotal = cartItems.reduce((total, item) => {
//     return total + (item.price * item.quantity);
//   }, 0);

//   const totalSavings = cartItems.reduce((total, item) => {
//     return total + ((item.originalPrice - item.price) * item.quantity);
//   }, 0);

//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateItemQuantity,
//     clearCart,
//     cartCount,
//     cartSubtotal,
//     totalSavings,
//     hasItems: cartItems.length > 0,
//     getItemQuantity: (itemId) => {
//       const item = cartItems.find(item => item.id === itemId);
//       return item ? item.quantity : 0;
//     },
//     isItemInCart: (itemId) => cartItems.some(item => item.id === itemId)
//   };

//   return (
//     <CartContext.Provider value={contextValue}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// export default CartContext;

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cartItems to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (newItem) => {
    if (!newItem.id) {
      console.error("Invalid item format:", newItem);
      return;
    }

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        return prevItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        });
      }

      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Update item quantity in cart
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      return removeFromCart(itemId);
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear cart and remove from localStorage
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // Calculate total number of items in the cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate cart subtotal
  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + (item.variant.price * item.quantity);
  }, 0);

  // Calculate total savings
  const totalSavings = cartItems.reduce((total, item) => {
    return total + ((item.variant.originalPrice - item.variant.price) * item.quantity);
  }, 0);

  // Context value with updated functions and calculations
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart, // Added clearCart to context
    cartCount,
    cartSubtotal,
    totalSavings,
    hasItems: cartItems.length > 0,
    getItemQuantity: (itemId) => {
      const item = cartItems.find(item => item.id === itemId);
      return item ? item.quantity : 0;
    },
    isItemInCart: (itemId) => cartItems.some(item => item.id === itemId),
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
