import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CropsSection = () => {
  const [crops, setCrops] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch crops data from the API
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://farm-e-store-backend.vercel.app/api/crop/get-crops"
        );
        const data = await response.json();
        setCrops(data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  // Double the crops array for seamless infinite scroll
  const duplicatedCrops = [...crops, ...crops];

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Shop by Crops</h2>
          <Link to="/all-crops" className="text-blue-500 hover:underline">
            View All
          </Link>
        </div>

        {/* Show loading message while data is being fetched */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg font-medium">Loading crops...</p>
          </div>
        ) : (
          <div
            className={`
              relative overflow-hidden
              ${isMobile ? "flex space-x-4 overflow-x-auto scrollbar-hide" : ""}
            `}
          >
            <div
              className={`
                flex space-x-4
                ${!isMobile ? "animate-scroll hover:pause" : ""}
                ${isPaused ? "pause" : ""}
              `}
              onMouseEnter={() => !isMobile && setIsPaused(true)}
              onMouseLeave={() => !isMobile && setIsPaused(false)}
              style={{
                animation: !isMobile ? "scroll 20s linear infinite" : "none",
              }}
            >
              {(isMobile ? crops : duplicatedCrops).map((crop, index) => (
                <Link
                  key={`${crop._id}-${index}`}
                  to={`/products/crop/${crop._id}`} // Pass crop ID dynamically to product page
                  className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md border border-gray-200 p-4 flex items-center justify-center"
                >
                  <img
                    src={crop.imageUrl}
                    alt={crop.title}
                    className="w-full h-full object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
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

export default CropsSection;
