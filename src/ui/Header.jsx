import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import farmLogo from "../assets/farmLogo.png";
import { useCart } from "../contexts/CartContext";
import CartPage from "./CartPage";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useLocation } from "react-router-dom"; // Import useLocation

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showPopularSearches, setShowPopularSearches] = useState(false);
  const { cartCount } = useCart(); // Access the cart count
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For user dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [user, setUser] = useState(null); // Store user information
  const navigate = useNavigate();
  const location = useLocation(); // Declare useLocation at the top level
  // Fetch categories and subcategories only once on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://farm-e-store-backend.vercel.app/api/category/get-category"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await fetch(
          "https://farm-e-store-backend.vercel.app/api/subcategory/get-sub-category"
        );
        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubCategories();
  }, []);

  // Check for logged-in user status
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setAnchorEl(null);
    navigate("/login");
  }, [navigate]);

  // const handleCartClick = () => {
  //   const storedUser = localStorage.getItem("user");

  //   if (storedUser) {
  //     setIsCartOpen(true); // Open cart page if the user is logged in
  //   } else {
  //     if (location.pathname !== "/login") {
  //       // Avoid toasting when already on the login page
  //       toast.info("Please login to view your cart", {
  //         toastId: "login-cart-toast", // Unique ID for this toast
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     }
  //     navigate("/login"); // Redirect to login page
  //   }
  // };
  const handleCartClick = () => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      setIsCartOpen(true); // Open cart page if the user is logged in
    } else {
      if (location.pathname !== "/login" && location.pathname !== "/signup") {
        // Avoid showing the toast if already on the login or signup page
        toast.info("Please login to view your cart", {
          toastId: "login-cart-toast", // Unique ID for this toast
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      navigate("/login"); // Redirect to login page
    }
  };
  
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleLanguageChange = useCallback((lang) => {
    setSelectedLanguage(lang);
  }, []);

  return (
    <nav className="bg-white border-b shadow-md relative z-40">
      {/* // <nav className="fixed top-0 left-0 w-full bg-white border-b shadow-md z-50">  */}
      {/* Promotional section and top nav */}
      <div className="hidden lg:flex justify-between items-center px-6 py-2 bg-green-800 text-white text-sm">
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Sell on Farm E-store
          </a>
          <a href="#" className="hover:underline">
            Bulk Order Inquiries
          </a>
          <a href="#" className="hover:underline">
            Corporate Site
          </a>
        </div>
        <span className="bg-orange-500 px-2 py-1 rounded text-white font-semibold">
          Missed Call To Order: 1800-3000-2434
        </span>
      </div>

      {/* Logo and Icons */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center px-6 py-4">
        <div className="flex justify-between items-center w-full lg:w-auto">
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="text-black lg:hidden mr-2"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
          <Link to="/">
            <img src={farmLogo} alt="Logo" className="h-16" />
          </Link>
          <div className="flex items-center space-x-2 lg:hidden">
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-gray-600"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="hi">HI</option>
            </select>
            {/* <Link to="#" className="text-gray-600 hover:text-gray-800">
              <FiHeart className="w-5 h-5" />
            </Link> */}
            <div>
              <IconButton onClick={handleMenuClick}>
                <Avatar>
                  {isLoggedIn && user?.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <FiUser />
                  )}
                </Avatar>
              </IconButton>
              <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{ style: { width: 200 } }}
            >
              {isLoggedIn ? (
                <>
                  <MenuItem>Welcome, {user?.name || "User"}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleMenuClose(); // Close the menu
                    navigate("/login"); // Navigate to the login page
                  }}
                >
                  Login
                </MenuItem>
              )}
            </Menu>
            </div>
            <button
        onClick={handleCartClick}
        className="relative text-gray-600 hover:text-gray-800 cart-icon"
      >
        <FiShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full flex-grow mx-2 relative lg:max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-l px-4 py-2"
            onFocus={() => setShowPopularSearches(true)}
            onBlur={() => setShowPopularSearches(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 flex items-center border-l border-gray-300 bg-[#FA9527] rounded-r px-2">
            <FiSearch className="w-5 h-5 text-white" />
          </div>

          {showPopularSearches && (
            <div className="absolute top-11 left-0 w-full sm:w-80 h-auto max-w-xs transform bg-white px-3 py-1 shadow-xl transition-all rounded-lg z-50">
              <p className="font-medium text-black mb-3">Popular Searches</p>
              {[
                "Boron",
                "Biovita",
                "Humic acid",
                "Nativo",
                "Alika",
                "Round",
                "Tata",
                "Ampligo",
              ].map((term, index) => (
                <button
                  key={index}
                  className="rounded-2xl md:rounded-xl leading-[normal] px-3 md:px-2.5 py-1.5 mr-2.5 mb-2.5 bg-borderColor border-borderColor"
                >
                  <p className="text-sm font-medium text-black text-center">
                    {term}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Icon Menu */}
        <div className="hidden lg:flex items-center space-x-4 lg:space-x-6">
          <div className="flex items-center">
            <span className="language-icon"></span>{" "}
            {/* Rotating letters icon */}
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-gray-600"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
          <Link
            to="#"
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <FiHeart className="w-5 h-5" />
            <span className="ml-1">Wishlist</span>
          </Link>
          <div>
            <IconButton onClick={handleMenuClick}>
              <Avatar>
                {isLoggedIn && user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <FiUser />
                )}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{ style: { width: 200 } }}
            >
              {isLoggedIn ? (
                <>
                  <MenuItem>Welcome, {user?.name || "User"}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleMenuClose(); // Close the menu
                    navigate("/login"); // Navigate to the login page
                  }}
                >
                  Login
                </MenuItem>
              )}
            </Menu>
          </div>

          <button
        onClick={handleCartClick}
        className="relative text-gray-600 hover:text-gray-800 cart-icon"
      >
        <FiShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
        </div>
      </div>

      {/* Category Menu */}
      <div
        className={`fixed inset-y-0 left-0 bg-white p-6 border border-green-300 rounded-md shadow-lg transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:flex lg:justify-center lg:space-x-6 py-4 text-gray-600 font-semibold text-sm lg:relative border-t border-gray-300`}
      >
        {isMenuOpen && (
          <button
            className="text-black lg:hidden mb-4"
            onClick={() => setMenuOpen(false)}
          >
            <FiX className="w-6 h-6" />
          </button>
        )}

        {categories.map((category) => {
          const hasSubcategories = subCategories.some(
            (sub) => sub.category_id === category._id
          );
          return (
            <div key={category._id} className="relative group">
              <div className="flex items-center justify-between">
                <Link to="#" className="hover:text-gray-800 py-2">
                  {category.title}
                </Link>
                {hasSubcategories && (
                  <button
                    onClick={() =>
                      window.innerWidth < 1024
                        ? setActiveCategory(
                            activeCategory === category._id
                              ? null
                              : category._id
                          )
                        : null
                    }
                    className="lg:hidden"
                  >
                    {activeCategory === category._id ? (
                      <FiChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <FiChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                )}
              </div>
              {hasSubcategories && (
                <div
                  className={`lg:absolute lg:top-full lg:left-0 lg:bg-white lg:shadow-lg lg:rounded-md lg:p-2 lg:invisible lg:group-hover:visible ${
                    activeCategory === category._id || window.innerWidth >= 1024
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <ul>
                    {subCategories
                      .filter((sub) => sub.category_id === category._id)
                      .map((sub) => (
                        <li
                          key={sub._id}
                          className="py-1 px-2 hover:bg-gray-100"
                        >
                          <Link
                            to={`/category/${category._id}/subcategory/${sub._id}/products`}
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <CartPage isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
