import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getData } from "../lib";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import block from "../assets/block.png";

const Productpage = () => {
  const { categoryId, subcategoryId, brandId, cropId } = useParams(); // Added cropId
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const endpoint = "https://farm-e-store-backend.vercel.app/api/product/get-product";
        const data = await getData(endpoint);

        let filteredProducts;

        // Handle different filtering scenarios
        if (cropId) {
          // Filter by crop ID
          filteredProducts = data.filter(product => product.crop_id === cropId);
        } else if (brandId) {
          // Filter by brand ID
          filteredProducts = data.filter(product => product.brand_id === brandId);
        } else if (categoryId && subcategoryId) {
          // Filter by category and subcategory IDs
          filteredProducts = data.filter(
            product =>
              product.category_id === categoryId &&
              product.sub_category_id === subcategoryId
          );
        } else {
          // Fallback to show all products
          filteredProducts = data;
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, subcategoryId, brandId, cropId]); // Added cropId as dependency

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white border rounded-lg shadow-md p-4">
              <Skeleton height={150} className="mb-2" />
              <Skeleton width={`60%`} className="mb-1" />
              <Skeleton width={`40%`} />
              <Skeleton width={`50%`} className="mt-2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="flex flex-col items-center bg-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-32 h-32 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold text-center">{product.title}</h3>
                <p className="text-sm text-gray-600 text-center">{product.sub_title}</p>
                <p className="text-sm text-gray-700 mt-2">
                  <span className="line-through text-red-500">₹{product.mrp_price}</span>{" "}
                  <span className="font-bold">₹{product.sell_price}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-white border rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Available</h3>
          <p className="text-gray-600">
            We couldn't find any products matching this selection. Please check back later or explore other categories.
          </p>
          <img
            src={block}
            alt="No products available"
            className="w-40 h-40 mb-4"
          />
        </div>
      )}
    </div>
  );
};

export default Productpage;
