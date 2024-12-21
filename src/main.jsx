import React from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import "./index.css";

import Category from "./ui/Categories";
import Subcategory from "./ui/SubCategory";
import NotFound from "./pages/NotFound";
import Layout from "./ui/Layout";
import AllCategories from "./ui/Allcategories";
import Productpage from "./ui/Productpage";
import ProductDetailsPage from "./ui/ProductDetailpage";
import AllBrands from "./ui/AllBrands";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import CartPage from "./ui/CartPage";
import Login from "./ui/Login";
import CheckoutBtn from "./ui/CheckoutBtn";
import ProductSection from "./ui/ProductList";
import Allcrops from "./ui/AllCrops";
import { SearchProvider } from "./contexts/SearchContext";
import ComingSoonPage from "./ui/comingsoon";
import OrderDetails from "./ui/myorders";
import ProductsListDetail from "./ui/ProductsListDetail";
import WishlistPage from "./ui/Wishlist";

const RouterLayout = () => {
  return (
    <Layout>
      <ScrollRestoration />
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/checkout",
        element: <CheckoutBtn />,
      },
      {
        path: "/all-brands",
        element: <AllBrands />,
      },
      {
        path: "/all-crops",
        element: <Allcrops />,
      },
      {
        path: "/myorders",
        element: <OrderDetails />,
      },
      {
        path: "/cartpage",
        element: <CartPage />,
      },
      {
        path: "/comingsoon",
        element: <ComingSoonPage />,
      },
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/categories",
        element: <AllCategories />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/category/:categoryId/subcategory",
        element: <Subcategory />, // Subcategory route
      },
      {
        path: "/category/:categoryId/subcategory/:subcategoryId/products",
        element: <Productpage />, // Subcategory products route
      },
      {
        path: "/products/brand/:brandId",
        element: <Productpage />, // Brand products route
      },
      {
        path: "/products/crop/:cropId",
        element: <Productpage />, // Crop products route
      },
      {
        path: "/product/:productId",
        element: <ProductDetailsPage />, // Product details route
      },
      {
        path: "/products",
        element: <ProductsListDetail />,
      },
      // {
      //   path: "/favorite",
      //   element: <Favorite />,
      // },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <SearchProvider>
  <CartProvider>
  <WishlistProvider>
    <RouterProvider router={router} />
    </WishlistProvider>
  </CartProvider>
  </SearchProvider>
);
