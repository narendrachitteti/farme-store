import React, { useState, useEffect } from "react";
import { homeBanner, homeBanner2, homeBanner3, homeBanner4, homeBanner5, homeBanner6 } from "../assets"; // Import all assets
import Container from "./Container";

const images = [homeBanner, homeBanner2, homeBanner3, homeBanner4, homeBanner5, homeBanner6];

const HomeBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically cycle through images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  // Function to go to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Container className="relative py-1 overflow-hidden">
      {/* Carousel Image */}
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt={`Banner ${currentImageIndex + 1}`}
          className="w-full max-h-[500px] object-cover rounded-md transition-opacity duration-700 ease-in-out"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-black/10" />
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        onClick={goToPreviousImage}
      >
        &#10094; {/* Left arrow */}
      </button>
      <button
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        onClick={goToNextImage}
      >
        &#10095; {/* Right arrow */}
      </button>

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentImageIndex ? "bg-white" : "bg-gray-400"
            } hover:bg-white transition`}
          ></button>
        ))}
      </div>
    </Container>
  );
};

export default HomeBanner;
