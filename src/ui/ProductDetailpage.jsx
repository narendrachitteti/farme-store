
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getData } from "../lib/index";
import {
  FaWhatsapp,
  FaShieldAlt,
  FaFlag,
  FaShippingFast,
  FaChevronRight,
  FaHome
} from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import BASE_URL from "../Helper/Helper";
import { FaTag } from 'react-icons/fa';

const ImageModal = ({ imageUrl, alt, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="relative bg-white p-6 rounded-lg max-w-3xl">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
      >
        X
      </button>
      <img
        src={imageUrl}
        alt={alt}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  </div>
);
const Breadcrumb = ({ product }) => (
  <nav className="bg-white p-4 rounded-lg shadow-md mb-4">
    <ol className="flex flex-wrap items-center text-sm">
      <li className="flex items-center">
        <Link to="/" className="text-gray-600 hover:text-orange-500 flex items-center">
          <FaHome className="mr-1" />
          Home
        </Link>
      </li>
      <li className="flex items-center mx-2">
        <FaChevronRight className="text-gray-400" size={12} />
      </li>
      <li className="flex items-center">
        <Link to="/products" className="text-gray-600 hover:text-orange-500">
          Products
        </Link>
      </li>
      <li className="flex items-center mx-2">
        <FaChevronRight className="text-gray-400" size={12} />
      </li>
      <li className="text-orange-500 truncate">
        {product?.title || 'Loading...'}
      </li>
    </ol>
  </nav>
);

const ProductDescriptionPoints = ({ description }) => (
  <div className="mt-6 p-6 bg-white border rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Product Description
    </h3>
    <ul className="list-disc pl-6 text-gray-600 space-y-2">
      {description.split('\n').map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  </div>
);
const ProductDetailsPage = ({ onCartOpen }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);  // New state to control modal visibility
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const endpoint = `${BASE_URL}/product/get-id-product/${productId}`;
        const data = await getData(endpoint);

        if (data) {
          setProduct(data);
          setSelectedImage(data.imageUrl);
          setSelectedVariant({
            size: "250 ml",
            price: data.sell_price,
            originalPrice: data.mrp_price,
            discount: 25,
          });
        } else {
          throw new Error("Invalid product data format.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = (openCart = false) => {
    if (product && selectedVariant) {
      const cartItem = {
        id: `${product._id}-${selectedVariant.size}`,
        imageUrl: product.imageUrl,
        title: product.title,
        brandName: product.sub_title || 'Default subtitle',
        variant: {
          size: selectedVariant.size,
          price: selectedVariant.price,
          originalPrice: selectedVariant.originalPrice
        },
        quantity: 1
      };
      
      addToCart(cartItem);
      setSnackbarVisible(true);
      setTimeout(() => setSnackbarVisible(false), 3000);
      if (openCart && typeof onCartOpen === "function") {
        onCartOpen();
      }
    }
  };

  const handleVariantChange = (variant) => setSelectedVariant(variant);
  
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleImageClick = () => {
    setShowModal(true); // Open the modal when the main image is clicked
  };

  const closeModal = () => {
    setShowModal(false);  // Close the modal
  };

  return (
    <div className="p-5">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb product={product} />
        
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : product ? (
          <>
            <div className="bg-white border rounded-lg shadow-md p-6 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="flex flex-col items-center lg:w-1/2">
                <img
                  src={selectedImage || product.imageUrl}
                  alt={product.title}
                  className="object-contain rounded-lg cursor-pointer"
                  style={{ width: 400, height: 400 }}
                  onClick={handleImageClick}  // Trigger modal on click
                />
                <div className="flex space-x-2 mt-4">
                  {[product.imageUrl, product.imageUrl, product.imageUrl].map(
                    (thumb, index) => (
                      <img
                        key={index}
                        src={thumb}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        className={`w-16 h-16 object-contain cursor-pointer border rounded 
                          ${selectedImage === thumb ? 'border-orange-500' : 'border-gray-300'}`}
                        onClick={() => handleThumbnailClick(thumb)}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {product.title}
                  </h2>
                </div>
                <p className="text-sm text-gray-600">{product.sub_title}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-yellow-500 font-bold">4.9 ★★★★★</span>
                  <span className="text-sm text-gray-600">91 reviews</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-semibold text-gray-800">
                      ₹{selectedVariant?.price}
                    </span>
                    <span className="text-lg line-through text-gray-500">
                      ₹{selectedVariant?.originalPrice}
                    </span>
                    <span className="text-sm bg-orange-200 text-orange-700 px-2 py-1 rounded">
                      {selectedVariant?.discount}% OFF
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <FaFlag className="text-green-500" />
                  <span className="text-gray-600 text-sm">
                    Country of Origin: India
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <FaShieldAlt className="text-green-500" />
                  <span className="text-gray-600 text-sm">Secure Payments</span>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <FaShippingFast className="text-green-500" />
                  <span className="text-gray-600 text-sm">
                    In stock, Ready to Ship
                  </span>
                </div> 

                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => handleAddToCart(false)} // Add to cart only
                    className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleAddToCart(true)} // Add to cart and open drawer
                    className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg"
                  >
                    Buy Now
                  </button>
                </div><br/>
                <h3>Please call us on 9010189891 for bulk quantity order</h3>
              </div>
            </div>

            <ProductDescriptionPoints description={product.description} />
          </>
        ) : (
          <p>Product not found.</p>
        )}

        {/* Snackbar */}
        {snackbarVisible && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
            Added to cart
          </div>
        )}

        {/* Image Modal */}
        {showModal && (
          <ImageModal
            imageUrl={selectedImage}
            alt={product.title}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;