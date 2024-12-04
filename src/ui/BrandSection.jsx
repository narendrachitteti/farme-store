import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BASE_URL from "../Helper/Helper";

const BrandSection = () => {
  const [brands, setBrands] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/brand/get-brand`);
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">Shop by Brands</h2>
          <Link to="/all-brands" className="text-blue-500 hover:underline">
            View All
          </Link>
        </div>

        {/* Mobile View: Show only 2 cards */}
        {isMobile ? (
          <div className="grid grid-cols-2 gap-4">
            {brands.slice(0, 2).map((brand) => (
              <Link
                key={brand._id}
                to={`/products/brand/${brand._id}`}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex items-center justify-center"
              >
                <img
                  src={brand.imageUrl}
                  alt={brand.title}
                  className="w-full h-24 object-contain"
                />
              </Link>
            ))}
          </div>
        ) : (
          // Laptop/Desktop View: Horizontal Auto-Scroller
          <div className="relative overflow-hidden">
            <div
              className={`flex space-x-4 animate-scroll ${
                isPaused ? "pause" : ""
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                animation: "scroll 20s linear infinite",
              }}
            >
              {duplicatedBrands.map((brand, index) => (
                <Link
                  key={`${brand._id}-${index}`}
                  to={`/products/brand/${brand._id}`}
                  className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md border border-gray-200 p-4 flex items-center justify-center"
                >
                  <img
                    src={brand.imageUrl}
                    alt={brand.title}
                    className="w-full h-full object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Keyframes for infinite scrolling */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Scrolling container */
        .animate-scroll {
          display: flex;
          width: fit-content;
        }

        /* Pause animation on hover */
        .pause {
          animation-play-state: paused !important;
        }

        @media (max-width: 767px) {
          /* Disable scrolling animation for mobile view */
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default BrandSection;
