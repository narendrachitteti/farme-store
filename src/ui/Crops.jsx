import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../Helper/Helper";

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

  // Fetch crops data from the API and sort alphabetically
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/crop/get-crops`);
        const data = await response.json();

        // Sort crops alphabetically based on title
        const sortedCrops = data.sort((a, b) => a.title.localeCompare(b.title));
        setCrops(sortedCrops);
      } catch (error) {
        console.error("Error fetching crops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  // Duplicate the crops array for seamless infinite scroll
  const duplicatedCrops = [...crops, ...crops];

  return (
    <section className="py-2 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
            Shop by Crops
          </h2>
          <Link to="/all-crops" className="text-blue-500 hover:underline">
            View All
          </Link>
        </div>

        {/* Show spinner loader while data is being fetched */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="loader-spinner"></div>&nbsp;
            <p className="text-gray-500 text-sm font-medium">Loading crops...</p>
          </div>
        ) : (
          <>
            {/* Mobile View: Show only 2 cards */}
            {isMobile ? (
              <div className="grid grid-cols-2 gap-4">
                {crops.slice(0, 2).map((crop) => (
                  <Link
                    key={crop._id}
                    to={`/products/crop/${crop._id}`}
                    className="bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col items-center justify-center"
                  >
                    <img
                      src={crop.imageUrl}
                      alt={crop.title}
                      className="w-full h-24 object-contain mb-2"
                    />
                    <p className="text-sm font-medium text-gray-700 text-center mt-2">
                      {crop.title}
                    </p>
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
                  {duplicatedCrops.map((crop, index) => (
                    <Link
                      key={`${crop._id}-${index}`}
                      to={`/products/crop/${crop._id}`}
                      className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md border border-gray-200 p-4 flex flex-col items-center justify-center"
                    >
                      <img
                        src={crop.imageUrl}
                        alt={crop.title}
                        className="w-full h-full object-contain mb-2"
                      />
                      <p className="text-sm font-medium text-gray-700 text-center mt-2">
                        {crop.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
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

        /* Spinner Loader */
        .loader-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #4a90e2;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default CropsSection;
