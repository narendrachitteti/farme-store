import { useState, useEffect } from 'react';
import { homeBanner } from '../assets';
import { homeBanner2 } from '../assets';
import { homeBanner3 } from '../assets';

import Container from './Container';
import LinkButton from './LinkButton';

const images = [homeBanner, homeBanner2, homeBanner3];

const HomeBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="relative py-1 overflow-hidden">
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt="homeBanner"
          className="w-full h-full object-cover rounded-md transition-opacity duration-700 ease-in-out"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-black/10" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center px-10">
      </div>
    </Container>
  );
};

export default HomeBanner;
