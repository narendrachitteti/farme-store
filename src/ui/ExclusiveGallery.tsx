import React from 'react';
// Import your local images
import image1 from '../assets/exclusive.webp';
import image2 from '../assets/exclusive2.webp';
import image3 from '../assets/exclusive3.webp';
import image4 from '../assets/exclusive4.webp';

const ExclusiveGallery = () => {
  const images = [
    { id: 1, src: image1, alt: "Exclusive Item 1" },
    { id: 2, src: image2, alt: "Exclusive Item 2" },
    { id: 3, src: image3, alt: "Exclusive Item 3" },
    { id: 4, src: image4, alt: "Exclusive Item 4" }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Heading Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-4 mt-2">Exclusive</h2>
        <div className="w-full h-0.5 bg-gray-200"></div>
      </div>
      
      {/* Image Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="w-full aspect-square">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        ))}
      </div>
      <br/>
    </div>
  );
};

export default ExclusiveGallery;
