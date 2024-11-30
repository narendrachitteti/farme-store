import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BrandSection = () => {
  const [brands, setBrands] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("https://farm-e-store-backend.vercel.app/api/brand/get-brand");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  // Double the brands array for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Shop by Brands</h2>
          <Link to="/all-brands" className="text-blue-500 hover:underline">
            View All
          </Link>
        </div>

        <div 
          className={`
            relative overflow-hidden
            ${isMobile ? 'flex space-x-4 overflow-x-auto scrollbar-hide' : ''}
          `}
        >
          <div 
            className={`
              flex space-x-4
              ${!isMobile ? 'animate-scroll hover:pause' : ''}
              ${isPaused ? 'pause' : ''}
            `}
            onMouseEnter={() => !isMobile && setIsPaused(true)}
            onMouseLeave={() => !isMobile && setIsPaused(false)}
            style={{
              animation: !isMobile ? 'scroll 20s linear infinite' : 'none'
            }}
          >
            {(isMobile ? brands : duplicatedBrands).map((brand, index) => (
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
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          display: flex;
          width: fit-content;
        }
        
        .pause {
          animation-play-state: paused !important;
        }
        
        @media (max-width: 767px) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default BrandSection;