
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getData } from "../lib";
import {
  FaWhatsapp,
  FaShieldAlt,
  FaFlag,
  FaShippingFast,
  FaChevronRight,
  FaHome
} from "react-icons/fa";
import { useCart } from "../contexts/CartContext";

const ImageMagnifier = ({ imageUrl, alt, width = 400, height = 400, magnifierSize = 150, zoomLevel = 2.5 }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  
  const imageContainerRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;

    const elementRect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - elementRect.left;
    const y = e.clientY - elementRect.top;

    if (x < 0 || x > elementRect.width || y < 0 || y > elementRect.height) {
      setShowMagnifier(false);
      return;
    }

    setMagnifierPosition({
      x: x - magnifierSize / 2,
      y: y - magnifierSize / 2,
    });

    setShowMagnifier(true);
  };

  return (
    <div 
      ref={imageContainerRef}
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowMagnifier(false)}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="object-contain rounded-lg cursor-zoom-in"
        style={{ width, height }}
      />
      
      {showMagnifier && (
        <div
          className="absolute pointer-events-none border border-gray-200 rounded-full overflow-hidden shadow-lg"
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            left: `${magnifierPosition.x}px`,
            top: `${magnifierPosition.y}px`,
          }}
        >
          <img
            src={imageUrl}
            alt={alt}
            className="absolute"
            style={{
              width: `${width * zoomLevel}px`,
              height: `${height * zoomLevel}px`,
              left: `${-magnifierPosition.x * zoomLevel + magnifierSize / 2}px`,
              top: `${-magnifierPosition.y * zoomLevel + magnifierSize / 2}px`,
            }}
          />
        </div>
      )}
    </div>
  );
};

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

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const endpoint = `https://farm-e-store-backend.vercel.app/api/product/get-id-product/${productId}`;
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

  const handleAddToCart = () => {
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
    }
  };

  const variants = [
    { size: "250 ml", price: 299, originalPrice: 371, discount: 19 },
    { size: "500 ml", price: 420, originalPrice: 719, discount: 42 },
    { size: "1 ltr", price: 740, originalPrice: 1292, discount: 43 },
    { size: "2 ltr (pack of 1 ltr)", price: 1476, originalPrice: 2584, discount: 43 },
    { size: "1250 ml (pack of 500 ml)", price: 1220, originalPrice: 1855, discount: 34 },
    { size: "100 ml", price: 119, originalPrice: 173, discount: 31 },
  ];

  const handleVariantChange = (variant) => setSelectedVariant(variant);
  
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
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
                <ImageMagnifier
                  imageUrl={selectedImage || product.imageUrl}
                  alt={product.title}
                  width={400}
                  height={400}
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

                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    Variants
                  </h4>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => handleVariantChange(variant)}
                        className={`border rounded-md px-3 py-2 ${
                          selectedVariant?.size === variant.size
                            ? "border-green-500 bg-green-100"
                            : "border-gray-300"
                        } text-sm flex flex-col items-center`}
                      >
                        <span>{variant.size}</span>
                        <span className="text-orange-500">
                          {variant.discount}% OFF
                        </span>
                        <span className="font-semibold">₹{variant.price}</span>
                      </button>
                    ))}
                  </div>
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
                    onClick={handleAddToCart}
                    className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>
                  <button className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg">
                    Buy Now
                  </button>
                </div>
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
      </div>
    </div>
  );
};

export default ProductDetailsPage;